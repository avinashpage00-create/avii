import React from 'react';
import { Flame, Compass, MessageCircleHeart, Shield, User } from 'lucide-react';
import { CurrentUser } from '../../types';

export type NavTab = 'swipe' | 'explore' | 'chat' | 'safety' | 'profile';

interface BottomNavProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  currentUser: CurrentUser;
  unreadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  currentUser,
  unreadCount = 0
}) => {
  const tabs = [
    {
      id: 'swipe' as NavTab,
      label: 'Discover',
      icon: Flame,
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'explore' as NavTab,
      label: 'Explore',
      icon: Compass,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'chat' as NavTab,
      label: 'Matches',
      icon: MessageCircleHeart,
      color: 'from-pink-600 to-purple-600',
      badge: unreadCount > 0 ? unreadCount : undefined
    },
    {
      id: 'safety' as NavTab,
      label: 'Safety',
      icon: Shield,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'profile' as NavTab,
      label: 'Profile',
      icon: User,
      color: 'from-violet-500 to-pink-500',
      avatar: currentUser.avatar
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-pink-100 py-1.5 px-3 max-w-md mx-auto shadow-lg shadow-pink-950/5">
      <div className="flex items-center justify-around">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className="flex flex-col items-center justify-center flex-1 py-1 px-1 relative transition-all group active:scale-90"
            >
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                  isActive
                    ? `bg-gradient-to-tr ${tab.color} text-white shadow-md shadow-pink-500/25 -translate-y-1`
                    : 'text-gray-400 group-hover:text-pink-600 group-hover:bg-pink-50/50'
                }`}
              >
                {tab.avatar && !isActive ? (
                  <img
                    src={tab.avatar}
                    alt={tab.label}
                    className="w-6 h-6 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <Icon className="w-5 h-5 transition-transform" />
                )}

                {tab.badge && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] font-medium tracking-tight mt-0.5 transition-colors ${
                  isActive ? 'text-pink-600 font-semibold' : 'text-gray-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
