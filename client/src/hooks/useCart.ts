import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useTelegram } from '@/contexts/TelegramContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  images: string[];
  quantity: number;
  product_id: string;
}

export function useCart() {
  const { user } = useTelegram();
  const userId = user?.id;

  // Fetch cart items
  const { data: cartItems = [], isLoading } = useQuery<CartItem[]>({
    queryKey: ['/api/cart', userId],
    queryFn: async () => {
      const response = await fetch(`/api/cart/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch cart');
      return response.json();
    },
    enabled: !!userId,
  });

  // Add to cart mutation with optimistic update
  const addToCart = useMutation({
    mutationFn: async (productId: string) => {
      if (!userId) throw new Error('User not authenticated');
      return apiRequest('/api/cart', {
        method: 'POST',
        body: JSON.stringify({
          user_id: userId,
          product_id: productId,
          quantity: 1,
        }),
      });
    },
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({ queryKey: ['/api/cart', userId] });
      const previousCart = queryClient.getQueryData<CartItem[]>(['/api/cart', userId]);
      
      queryClient.setQueryData<CartItem[]>(['/api/cart', userId], (old = []) => {
        const existingItem = old.find(item => item.id === productId);
        if (existingItem) {
          return old.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        
        const newItem: CartItem = {
          id: productId,
          product_id: productId,
          name: '',
          price: 0,
          images: [],
          quantity: 1,
        };
        return [...old, newItem];
      });
      
      return { previousCart };
    },
    onError: (_err, _productId, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['/api/cart', userId], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', userId] });
    },
  });

  // Update quantity mutation with optimistic update
  const updateQuantity = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      if (!userId) throw new Error('User not authenticated');
      return apiRequest('/api/cart', {
        method: 'PUT',
        body: JSON.stringify({
          user_id: userId,
          product_id: productId,
          quantity,
        }),
      });
    },
    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ['/api/cart', userId] });
      const previousCart = queryClient.getQueryData<CartItem[]>(['/api/cart', userId]);
      
      queryClient.setQueryData<CartItem[]>(['/api/cart', userId], (old = []) => {
        return old.map(item =>
          item.id === productId ? { ...item, quantity } : item
        );
      });
      
      return { previousCart };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['/api/cart', userId], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', userId] });
    },
  });

  // Remove from cart mutation with optimistic update
  const removeFromCart = useMutation({
    mutationFn: async (productId: string) => {
      if (!userId) throw new Error('User not authenticated');
      return apiRequest(`/api/cart/${userId}/${productId}`, {
        method: 'DELETE',
      });
    },
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({ queryKey: ['/api/cart', userId] });
      const previousCart = queryClient.getQueryData<CartItem[]>(['/api/cart', userId]);
      
      queryClient.setQueryData<CartItem[]>(['/api/cart', userId], (old = []) => {
        return old.filter(item => item.id !== productId);
      });
      
      return { previousCart };
    },
    onError: (_err, _productId, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['/api/cart', userId], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', userId] });
    },
  });

  // Clear cart mutation with optimistic update
  const clearCart = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error('User not authenticated');
      return apiRequest(`/api/cart/${userId}`, {
        method: 'DELETE',
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['/api/cart', userId] });
      const previousCart = queryClient.getQueryData<CartItem[]>(['/api/cart', userId]);
      
      queryClient.setQueryData<CartItem[]>(['/api/cart', userId], []);
      
      return { previousCart };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['/api/cart', userId], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', userId] });
    },
  });

  return {
    cartItems,
    isLoading,
    addToCart: addToCart.mutate,
    updateQuantity: updateQuantity.mutate,
    removeFromCart: removeFromCart.mutate,
    clearCart: clearCart.mutate,
    isAddingToCart: addToCart.isPending,
    isUpdating: updateQuantity.isPending,
    isRemoving: removeFromCart.isPending,
  };
}
