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
        let telegramUser: { id: number; username?: string; firstName?: string; lastName?: string } | null = null;

        // Initialize Telegram WebApp
        if (window.Telegram?.WebApp) {
          console.log('🔵 Telegram WebApp detected, initializing...');
          window.Telegram.WebApp.ready();
          window.Telegram.WebApp.expand();
          
          // Enable closing confirmation
          window.Telegram.WebApp.enableClosingConfirmation();
          
          console.log('🔍 Checking Telegram WebApp data:', {
            platform: window.Telegram.WebApp.platform,
            version: window.Telegram.WebApp.version,
            initDataUnsafe: window.Telegram.WebApp.initDataUnsafe,
          });
        }

        // Method 1: Try standard Telegram WebApp API
        if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
          const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
          telegramUser = {
            id: tgUser.id,
            username: tgUser.username,
            firstName: tgUser.first_name,
            lastName: tgUser.last_name,
          };
          console.log('✅ Got Telegram user from WebApp.initDataUnsafe');
        } 
        // Method 2: Try retrieveLaunchParams as fallback
        else {
          try {
            const launchParams = retrieveLaunchParams();
            console.log('🔍 Launch params:', launchParams);
            
            if (launchParams?.initData) {
              const userData = (launchParams.initData as any)?.user;
              if (userData) {
                telegramUser = {
                  id: userData.id,
                  username: userData.username,
                  firstName: userData.firstName || userData.first_name,
                  lastName: userData.lastName || userData.last_name,
                };
                console.log('✅ Got Telegram user from retrieveLaunchParams');
              }
            }
          } catch (launchParamsError) {
            console.warn('⚠️ retrieveLaunchParams failed:', launchParamsError);
          }
        }
        
        if (telegramUser) {
          setTelegramData(telegramUser);
          
          console.log('🔵 TELEGRAM USER AUTHENTICATED:', {
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
            console.log('✅ Backend authentication successful');
            setUser(data.user);
          } else {
            console.error('❌ Backend authentication failed:', await response.text());
          }
        } else {
          console.warn('⚠️ No Telegram user data found. App may be opened outside Telegram.');
        }
      } catch (error) {
        console.error('🔴 Telegram initialization error:', error);
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
