import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';

interface TelegramUser {
  id: string;
  telegram_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
}

interface TelegramContextType {
  user: TelegramUser | null;
  isLoading: boolean;
  telegramData: any;
}

const TelegramContext = createContext<TelegramContextType>({
  user: null,
  isLoading: true,
  telegramData: null,
});

export const useTelegram = () => useContext(TelegramContext);

interface TelegramProviderProps {
  children: ReactNode;
}

export function TelegramProvider({ children }: TelegramProviderProps) {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [telegramData, setTelegramData] = useState<any>(null);

  useEffect(() => {
    const initTelegram = async () => {
      try {
        // Try to get Telegram launch params
        const { initData } = retrieveLaunchParams();
        
        if (initData?.user) {
          const telegramUser = initData.user;
          setTelegramData(telegramUser);
          
          console.log('🔵 TELEGRAM USER DATA:', {
            source: 'Telegram Mini App',
            telegram_id: telegramUser.id,
            username: telegramUser.username,
            first_name: telegramUser.firstName,
            last_name: telegramUser.lastName,
          });
          
          // Authenticate with backend
          const response = await fetch('/api/auth/telegram', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              telegram_id: telegramUser.id,
              username: telegramUser.username,
              first_name: telegramUser.firstName,
              last_name: telegramUser.lastName,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log('✅ AUTH SUCCESS (Telegram):', {
              user_id: data.user.id,
              telegram_id: data.user.telegram_id,
              is_new_user: data.is_new,
              username: data.user.username,
            });
            setUser(data.user);
          }
        } else {
          console.log('❌ Not running in Telegram mini app');
        }
      } catch (error) {
        console.error('🔴 Telegram init error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initTelegram();
  }, []);

  return (
    <TelegramContext.Provider value={{ user, isLoading, telegramData }}>
      {children}
    </TelegramContext.Provider>
  );
}
