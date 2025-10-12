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

  // Add to cart mutation
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', userId] });
    },
  });

  // Update quantity mutation
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', userId] });
    },
  });

  // Remove from cart mutation
  const removeFromCart = useMutation({
    mutationFn: async (productId: string) => {
      if (!userId) throw new Error('User not authenticated');
      return apiRequest(`/api/cart/${userId}/${productId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', userId] });
    },
  });

  // Clear cart mutation
  const clearCart = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error('User not authenticated');
      return apiRequest(`/api/cart/${userId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
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
