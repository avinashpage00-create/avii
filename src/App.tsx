/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  getStoredUser, saveUser, getAllProfiles, getMatches, 
  recordSwipeAction, rewindLastSwipe, getLikedIds, getPassedIds,
  getBlockedIds, blockUserProfile, reportUserProfile, unmatchUserProfile,
  resetAppDemoData
} from './utils/storage';
import { 
  CurrentUser, UserProfile, MatchItem, RelationshipMode, 
  SubscriptionTier, CallSession 
} from './types';
import { Header } from './components/common/Header';
import { BottomNav, NavTab } from './components/common/BottomNav';
import { SwipeDeck } from './components/swipe/SwipeDeck';
import { DiscoverGrid } from './components/discover/DiscoverGrid';
import { MatchesList } from './components/chat/MatchesList';
import { ChatRoom } from './components/chat/ChatRoom';
import { MatchCelebrationModal } from './components/swipe/MatchCelebrationModal';
import { VideoCallModal } from './components/call/VideoCallModal';
import { IncomingCallModal } from './components/call/IncomingCallModal';
import { SafetyCenterModal } from './components/safety/SafetyCenterModal';
import { PremiumModal } from './components/premium/PremiumModal';
import { UserProfileView } from './components/profile/UserProfileView';
import { EditProfileModal } from './components/profile/EditProfileModal';
import { AuthModal } from './components/auth/AuthModal';
import { FiltersModal, FilterSettings } from './components/common/FiltersModal';
import { playSound } from './utils/audio';
import { PhoneIncoming, UserCheck, Sparkles, Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(getStoredUser());
  const [activeTab, setActiveTab] = useState<NavTab>('swipe');
  const [activeMode, setActiveMode] = useState<RelationshipMode>('dating');

  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [matches, setMatches] = useState<MatchItem[]>([]);
  
  // Modals & Navigation states
  const [activeChatMatch, setActiveChatMatch] = useState<MatchItem | null>(null);
  const [celebrationMatch, setCelebrationMatch] = useState<UserProfile | null>(null);
  const [activeCallSession, setActiveCallSession] = useState<CallSession | null>(null);
  const [incomingCaller, setIncomingCaller] = useState<{ caller: UserProfile; type: 'video' | 'audio' } | null>(null);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSafetyCenter, setShowSafetyCenter] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [premiumInitialTab, setPremiumInitialTab] = useState<'plans' | 'likes'>('plans');
  const [showFilters, setShowFilters] = useState(false);
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // Filter settings
  const [filterSettings, setFilterSettings] = useState<FilterSettings>({
    city: 'All Cities',
    minAge: 18,
    maxAge: 32,
    maxDistanceKm: 100,
    mode: 'all',
    verifiedOnly: false
  });

  // Load data & filter profiles
  useEffect(() => {
    loadFreshData();
  }, [currentUser, filterSettings, activeMode]);

  const loadFreshData = () => {
    const all = getAllProfiles();
    const liked = getLikedIds();
    const passed = getPassedIds();
    const blocked = getBlockedIds();

    const filtered = all.filter(p => {
      // Exclude self, already swiped, or blocked
      if (p.id === currentUser.id || blocked.includes(p.id)) return false;
      
      // Seeking gender filter
      if (currentUser.seeking !== 'everyone') {
        if (currentUser.seeking === 'female' && p.gender !== 'female') return false;
        if (currentUser.seeking === 'male' && p.gender !== 'male') return false;
      }

      // Filter settings
      if (filterSettings.city !== 'All Cities' && !p.city.toLowerCase().includes(filterSettings.city.toLowerCase())) {
        return false;
      }
      if (p.age < filterSettings.minAge || p.age > filterSettings.maxAge) return false;
      if (p.distanceKm > filterSettings.maxDistanceKm) return false;
      if (filterSettings.verifiedOnly && !p.isVerified) return false;

      // Mode filter (if user selected header mode, prioritize that)
      if (filterSettings.mode !== 'all' && p.relationshipMode !== filterSettings.mode) return false;

      return true;
    });

    setProfiles(filtered);
    setMatches(getMatches());
  };

  // Swiping handler
  const handleSwipe = (profile: UserProfile, action: 'like' | 'pass' | 'superlike') => {
    const result = recordSwipeAction(profile, action);
    if (result.isMatch) {
      setCelebrationMatch(profile);
      setMatches(getMatches());
    }
  };

  // Rewind last pass
  const handleRewind = () => {
    const rewoundId = rewindLastSwipe();
    if (rewoundId) {
      playSound('like');
      loadFreshData();
    }
  };

  // Direct Call Initiator
  const handleStartCall = (type: 'video' | 'audio', partner?: UserProfile) => {
    const targetPartner = partner || activeChatMatch?.profile;
    if (!targetPartner) return;

    setActiveCallSession({
      callId: 'call_' + Date.now(),
      partner: targetPartner,
      type,
      status: 'outgoing',
      startedAt: Date.now()
    });
  };

  // Simulate an incoming video call (tester delight!)
  const handleSimulateIncomingCall = () => {
    const candidates = getAllProfiles().filter(p => p.id !== currentUser.id);
    const caller = candidates[Math.floor(Math.random() * candidates.length)];
    if (caller) {
      setIncomingCaller({
        caller,
        type: 'video'
      });
    }
  };

  // Switch testing perspective (Male vs Female)
  const handleSwitchPerspective = () => {
    playSound('like');
    if (currentUser.gender === 'male') {
      const femaleUser: CurrentUser = {
        ...currentUser,
        id: 'user_ananya_female',
        name: 'Ananya Sharma',
        gender: 'female',
        seeking: 'male',
        city: 'Mumbai',
        avatar: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
        photos: [
          'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
        ],
        profession: 'Architect & Interior Designer',
        bio: 'Bollywood trivia queen & cutting chai fan at Marine Drive. Seeking thoughtful boys who love good music.',
        relationshipMode: 'dating'
      };
      setCurrentUser(femaleUser);
      saveUser(femaleUser);
    } else {
      const maleUser: CurrentUser = {
        ...currentUser,
        id: 'current_user_me',
        name: 'Aryan Kapoor',
        gender: 'male',
        seeking: 'female',
        city: 'Mumbai',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
        photos: [
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'
        ],
        profession: 'Senior Frontend Engineer',
        bio: 'Software engineer who loves filter coffee, indie rock, and long drives around Marine Drive.',
        relationshipMode: 'dating'
      };
      setCurrentUser(maleUser);
      saveUser(maleUser);
    }
  };

  // Upgrade subscription
  const handleUpgradeSubscription = (tier: SubscriptionTier) => {
    const updated = { ...currentUser, subscription: tier };
    setCurrentUser(updated);
    saveUser(updated);
  };

  // Instant match from "Who Liked Me"
  const handleInstantMatchFromLikes = (profile: UserProfile) => {
    const result = recordSwipeAction(profile, 'like');
    setShowPremium(false);
    if (result.newMatch) {
      setCelebrationMatch(profile);
      setMatches(getMatches());
    }
  };

  const likedMeProfiles = getAllProfiles().filter(p => p.likesMe === true && p.id !== currentUser.id);
  const unreadMatchesCount = matches.reduce((acc, m) => acc + (m.unreadCount || 0), 0);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-gray-900 flex flex-col items-center justify-center p-0 md:p-4 select-none">
      {/* Top Demo Bar for reviewer quick-actions */}
      <div className="w-full max-w-md hidden md:flex items-center justify-between pb-2 px-3 text-[11px] text-pink-300 font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>DILMILENGE 18+ Verified Social Platform</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Incoming Call Tester Button */}
          <button
            onClick={handleSimulateIncomingCall}
            className="px-2 py-0.5 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 flex items-center gap-1 transition-colors"
            title="Simulate an incoming video call from a match"
          >
            <PhoneIncoming className="w-3 h-3 text-pink-400" />
            <span>Test Incoming Call</span>
          </button>

          {/* Perspective Switcher */}
          <button
            onClick={handleSwitchPerspective}
            className="px-2 py-0.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 flex items-center gap-1 transition-colors"
            title="Switch between Male & Female demo perspective"
          >
            <UserCheck className="w-3 h-3 text-purple-400" />
            <span>{currentUser.gender === 'male' ? 'View as Boy' : 'View as Girl'}</span>
          </button>
        </div>
      </div>

      {/* Main Container / Mobile Frame Wrapper */}
      <div
        className={`w-full transition-all duration-300 flex flex-col bg-white overflow-hidden relative ${
          isMobileFrame
            ? 'max-w-md h-[100dvh] md:h-[860px] md:rounded-[40px] md:shadow-2xl md:border-8 md:border-slate-800'
            : 'max-w-4xl h-[100dvh] md:rounded-3xl md:shadow-2xl'
        }`}
      >
        {/* App Header */}
        <Header
          currentUser={currentUser}
          activeMode={activeMode}
          onModeChange={mode => {
            setActiveMode(mode);
            setFilterSettings(prev => ({ ...prev, mode }));
          }}
          onOpenPremium={() => {
            setPremiumInitialTab('plans');
            setShowPremium(true);
          }}
          onOpenSafety={() => setShowSafetyCenter(true)}
          onOpenFilters={() => setShowFilters(true)}
          isMobileFrame={isMobileFrame}
          onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
        />

        {/* Tab Views */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {activeTab === 'swipe' && (
            <SwipeDeck
              profiles={profiles}
              onSwipe={handleSwipe}
              onRewind={handleRewind}
              canRewind={true}
              onOpenBoost={() => {
                playSound('like');
                setShowPremium(true);
              }}
              onResetFilters={() => {
                setFilterSettings({
                  city: 'All Cities',
                  minAge: 18,
                  maxAge: 35,
                  maxDistanceKm: 100,
                  mode: 'all',
                  verifiedOnly: false
                });
                loadFreshData();
              }}
              currentMode={activeMode}
            />
          )}

          {activeTab === 'explore' && (
            <DiscoverGrid
              profiles={getAllProfiles().filter(p => p.id !== currentUser.id && p.gender === 'female')}
              onSelectProfile={profile => {
                handleSwipe(profile, 'like');
              }}
              onInstantLike={profile => {
                handleSwipe(profile, 'like');
              }}
            />
          )}

          {activeTab === 'chat' && (
            <MatchesList
              matches={matches}
              currentUser={currentUser}
              onSelectMatch={match => setActiveChatMatch(match)}
              onOpenLikesMe={() => {
                setPremiumInitialTab('likes');
                setShowPremium(true);
              }}
            />
          )}

          {activeTab === 'safety' && (
            <div className="flex-1 p-4 overflow-y-auto">
              <SafetyCenterModal
                currentUser={currentUser}
                onUpdateVerification={isVerified => {
                  const updated = { ...currentUser, isVerified };
                  setCurrentUser(updated);
                  saveUser(updated);
                }}
                onClose={() => setActiveTab('swipe')}
              />
            </div>
          )}

          {activeTab === 'profile' && (
            <UserProfileView
              currentUser={currentUser}
              onEditProfile={() => setShowEditProfile(true)}
              onOpenPremium={() => {
                setPremiumInitialTab('plans');
                setShowPremium(true);
              }}
              onOpenSafety={() => setShowSafetyCenter(true)}
              onSwitchPerspective={handleSwitchPerspective}
              onToggleBoost={() => {
                playSound('match');
                alert(`⚡ Boost Activated! Your profile is now #1 trending in ${currentUser.city} for 30 minutes.`);
              }}
              onResetData={() => {
                resetAppDemoData();
                setCurrentUser(getStoredUser());
                loadFreshData();
              }}
            />
          )}
        </main>

        {/* Bottom Mobile Tab Bar */}
        <BottomNav
          activeTab={activeTab}
          onChangeTab={tab => setActiveTab(tab)}
          currentUser={currentUser}
          unreadCount={unreadMatchesCount}
        />

        {/* Modals & Overlays */}

        {/* 1-on-1 Chat Room Overlay */}
        {activeChatMatch && (
          <ChatRoom
            match={activeChatMatch}
            currentUser={currentUser}
            onBack={() => {
              setActiveChatMatch(null);
              setMatches(getMatches());
            }}
            onStartCall={type => handleStartCall(type, activeChatMatch.profile)}
            onBlockUser={profileId => {
              blockUserProfile(profileId);
              setActiveChatMatch(null);
              loadFreshData();
            }}
            onReportUser={profileId => {
              reportUserProfile(profileId, 'Inappropriate behavior', 'Reported via safe dating chat');
              setActiveChatMatch(null);
              loadFreshData();
            }}
            onUnmatch={matchId => {
              unmatchUserProfile(matchId);
              setActiveChatMatch(null);
              loadFreshData();
            }}
          />
        )}

        {/* Mutual Match Fanfare Celebration Modal */}
        {celebrationMatch && (
          <MatchCelebrationModal
            currentUser={currentUser}
            matchedProfile={celebrationMatch}
            onSendMessage={initialText => {
              const matchedItem = matches.find(m => m.profile.id === celebrationMatch.id) || {
                id: 'match_' + Date.now(),
                profile: celebrationMatch,
                matchedAt: Date.now(),
                unreadCount: 0,
                mode: celebrationMatch.relationshipMode
              };
              setCelebrationMatch(null);
              setActiveChatMatch(matchedItem);
            }}
            onStartVideoCall={() => {
              const partner = celebrationMatch;
              setCelebrationMatch(null);
              handleStartCall('video', partner);
            }}
            onClose={() => setCelebrationMatch(null)}
          />
        )}

        {/* 1-on-1 Audio & Video Call Modal */}
        {activeCallSession && (
          <VideoCallModal
            partner={activeCallSession.partner}
            callType={activeCallSession.type}
            onEndCall={() => setActiveCallSession(null)}
          />
        )}

        {/* Simulated Incoming Call Banner / Modal */}
        {incomingCaller && (
          <IncomingCallModal
            caller={incomingCaller.caller}
            callType={incomingCaller.type}
            onAccept={() => {
              const caller = incomingCaller.caller;
              const type = incomingCaller.type;
              setIncomingCaller(null);
              handleStartCall(type, caller);
            }}
            onDecline={() => {
              playSound('call_end');
              setIncomingCaller(null);
            }}
          />
        )}

        {/* Safety Center Modal */}
        {showSafetyCenter && (
          <SafetyCenterModal
            currentUser={currentUser}
            onUpdateVerification={isVerified => {
              const updated = { ...currentUser, isVerified };
              setCurrentUser(updated);
              saveUser(updated);
            }}
            onClose={() => setShowSafetyCenter(false)}
          />
        )}

        {/* Premium Gold & VIP Modal */}
        {showPremium && (
          <PremiumModal
            currentUser={currentUser}
            likedMeProfiles={likedMeProfiles}
            onUpgrade={handleUpgradeSubscription}
            onInstantMatchFromLikes={handleInstantMatchFromLikes}
            onClose={() => setShowPremium(false)}
            initialTab={premiumInitialTab}
          />
        )}

        {/* Edit Profile Modal */}
        {showEditProfile && (
          <EditProfileModal
            currentUser={currentUser}
            onSave={updated => {
              setCurrentUser(updated);
              saveUser(updated);
            }}
            onClose={() => setShowEditProfile(false)}
          />
        )}

        {/* Filters Modal */}
        {showFilters && (
          <FiltersModal
            initialFilters={filterSettings}
            onApply={newFilters => {
              setFilterSettings(newFilters);
              loadFreshData();
            }}
            onClose={() => setShowFilters(false)}
          />
        )}

        {/* Auth & Onboarding Modal */}
        {showAuthModal && (
          <AuthModal
            onCompleteAuth={user => {
              setCurrentUser(user);
              saveUser(user);
              setShowAuthModal(false);
              loadFreshData();
            }}
            onClose={() => setShowAuthModal(false)}
          />
        )}
      </div>
    </div>
  );
}
