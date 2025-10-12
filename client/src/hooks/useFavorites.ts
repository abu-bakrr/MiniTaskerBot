import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useTelegram } from '@/contexts/TelegramContext';

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  images: string[];
  description?: string;
  category_id?: string;
}

export function useFavorites() {
  const { user } = useTelegram();
  const userId = user?.id;

  // Fetch favorites
  const { data: favoriteItems = [], isLoading } = useQuery<FavoriteItem[]>({
    queryKey: ['/api/favorites', userId],
    queryFn: async () => {
      const response = await fetch(`/api/favorites/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch favorites');
      return response.json();
    },
    enabled: !!userId,
  });

  // Add to favorites mutation
  const addToFavorites = useMutation({
    mutationFn: async (productId: string) => {
      if (!userId) throw new Error('User not authenticated');
      return apiRequest('/api/favorites', {
        method: 'POST',
        body: JSON.stringify({
          user_id: userId,
          product_id: productId,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/favorites', userId] });
    },
  });

  // Remove from favorites mutation
  const removeFromFavorites = useMutation({
    mutationFn: async (productId: string) => {
      if (!userId) throw new Error('User not authenticated');
      return apiRequest(`/api/favorites/${userId}/${productId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/favorites', userId] });
    },
  });

  // Toggle favorite (add or remove)
  const toggleFavorite = (productId: string) => {
    const isFavorite = favoriteItems.some(item => item.id === productId);
    if (isFavorite) {
      removeFromFavorites.mutate(productId);
    } else {
      addToFavorites.mutate(productId);
    }
  };

  return {
    favoriteItems,
    isLoading,
    addToFavorites: addToFavorites.mutate,
    removeFromFavorites: removeFromFavorites.mutate,
    toggleFavorite,
    favoriteIds: favoriteItems.map(item => item.id),
    isAddingToFavorites: addToFavorites.isPending,
    isRemoving: removeFromFavorites.isPending,
  };
}
