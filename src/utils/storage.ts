import { CurrentUser, UserProfile, MatchItem, ChatMessage, SubscriptionTier } from '../types';
import { INITIAL_PROFILES } from '../data/mockProfiles';

const STORAGE_KEYS = {
  USER: 'dilse_user_v1',
  LIKED_IDS: 'dilse_liked_ids_v1',
  PASSED_IDS: 'dilse_passed_ids_v1',
  SUPERLIKED_IDS: 'dilse_superliked_ids_v1',
  MATCHES: 'dilse_matches_v1',
  MESSAGES: 'dilse_messages_v1',
  BLOCKED_IDS: 'dilse_blocked_ids_v1',
  REPORTS: 'dilse_reports_v1',
  CUSTOM_PROFILES: 'dilse_custom_profiles_v1'
};

const DEFAULT_USER: CurrentUser = {
  id: 'current_user_me',
  name: 'Aryan Kapoor',
  phone: '+91 98765 43210',
  email: 'aryan.kapoor@example.com',
  age: 24,
  dob: '2001-08-15',
  gender: 'male',
  seeking: 'female',
  city: 'Mumbai',
  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  photos: [
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80'
  ],
  bio: 'Software engineer who loves filter coffee, indie rock, and long drives around Marine Drive. Looking for meaningful conversations and genuine vibes.',
  profession: 'Senior Frontend Engineer',
  languages: ['Hindi', 'English', 'Punjabi'],
  hobbies: ['Guitar', 'Chai Lover', 'Cricket', 'Travel & Roadtrips', 'Tech & Startups'],
  relationshipMode: 'dating',
  foodPreference: 'Eggetarian',
  drinking: 'Socially',
  smoking: 'Never',
  prompts: [
    {
      question: 'My ideal Sunday in Mumbai',
      answer: 'Morning run at Marine Drive, breakfast kheema pav / poha, and making music on the balcony.'
    }
  ],
  isVerified: true,
  subscription: 'free',
  superLikesRemaining: 3,
  rewindsRemaining: 5,
  isAgeVerified: true
};

export const getStoredUser = (): CurrentUser => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_USER;
};

export const saveUser = (user: CurrentUser): void => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getLikedIds = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LIKED_IDS) || '[]');
  } catch {
    return [];
  }
};

export const getPassedIds = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PASSED_IDS) || '[]');
  } catch {
    return [];
  }
};

export const getBlockedIds = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.BLOCKED_IDS) || '[]');
  } catch {
    return [];
  }
};

export const getAllProfiles = (): UserProfile[] => {
  try {
    const custom = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_PROFILES) || '[]');
    return [...INITIAL_PROFILES, ...custom];
  } catch {
    return INITIAL_PROFILES;
  }
};

export const getInitialMatches = (): MatchItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MATCHES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  // Initialize default 2 exciting matches for instant demo experience
  const p1 = INITIAL_PROFILES[0]; // Ananya Sharma
  const p2 = INITIAL_PROFILES[1]; // Kabir Mehta (or Rhea Sen for opposite gender)
  const defaultMatches: MatchItem[] = [
    {
      id: 'm1',
      profile: p1,
      matchedAt: Date.now() - 3600000 * 2,
      lastMessage: {
        id: 'msg_init_1',
        senderId: p1.id,
        text: 'Hey! Loved your taste in music. Marine Drive chai date sounds awesome ☕✨',
        timestamp: Date.now() - 3600000,
        read: false
      },
      unreadCount: 1,
      mode: 'dating'
    },
    {
      id: 'm2',
      profile: INITIAL_PROFILES[2], // Rhea Sen
      matchedAt: Date.now() - 3600000 * 8,
      lastMessage: {
        id: 'msg_init_2',
        senderId: 'current_user_me',
        text: 'Hi Rhea! Daryaganj book market is truly unmatched.',
        timestamp: Date.now() - 3600000 * 5,
        read: true
      },
      unreadCount: 0,
      mode: 'serious'
    }
  ];
  localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(defaultMatches));
  return defaultMatches;
};

export const getMatches = (): MatchItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MATCHES);
    if (raw) {
      const matches: MatchItem[] = JSON.parse(raw);
      const blocked = getBlockedIds();
      return matches.filter(m => !blocked.includes(m.profile.id));
    }
  } catch {
    // fallback
  }
  return getInitialMatches();
};

export const saveMatches = (matches: MatchItem[]): void => {
  localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matches));
};

export const recordSwipeAction = (
  profile: UserProfile,
  action: 'like' | 'pass' | 'superlike'
): { isMatch: boolean; newMatch?: MatchItem } => {
  if (action === 'pass') {
    const passed = getPassedIds();
    if (!passed.includes(profile.id)) {
      passed.push(profile.id);
      localStorage.setItem(STORAGE_KEYS.PASSED_IDS, JSON.stringify(passed));
    }
    return { isMatch: false };
  }

  // Like or Superlike
  const liked = getLikedIds();
  if (!liked.includes(profile.id)) {
    liked.push(profile.id);
    localStorage.setItem(STORAGE_KEYS.LIKED_IDS, JSON.stringify(liked));
  }

  // Determine if it's a mutual match (profiles flagged with likesMe: true or superlike)
  const isMutual = profile.likesMe === true || action === 'superlike';
  if (isMutual) {
    const currentMatches = getMatches();
    const existingIndex = currentMatches.findIndex(m => m.profile.id === profile.id);
    if (existingIndex === -1) {
      const newMatch: MatchItem = {
        id: 'match_' + Date.now(),
        profile,
        matchedAt: Date.now(),
        unreadCount: 1,
        mode: profile.relationshipMode,
        lastMessage: {
          id: 'welcome_' + Date.now(),
          senderId: profile.id,
          text: `It's a Match! Namaste 🙏 Excited to connect on DilSe.`,
          timestamp: Date.now(),
          read: false
        }
      };
      currentMatches.unshift(newMatch);
      saveMatches(currentMatches);
      return { isMatch: true, newMatch };
    }
  }
  return { isMatch: false };
};

export const rewindLastSwipe = (): string | null => {
  const passed = getPassedIds();
  if (passed.length > 0) {
    const popped = passed.pop();
    localStorage.setItem(STORAGE_KEYS.PASSED_IDS, JSON.stringify(passed));
    return popped || null;
  }
  return null;
};

export const getConversationMessages = (matchId: string): ChatMessage[] => {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '{}');
    if (all[matchId]) {
      return all[matchId];
    }
  } catch (e) {
    console.error(e);
  }

  // Default seed messages for initial matches
  if (matchId === 'm1') {
    return [
      {
        id: 'm1_1',
        senderId: 'current_user_me',
        text: 'Hey Ananya! Loved your profile. That sunset picture at Marine Drive is gorgeous!',
        timestamp: Date.now() - 3600000 * 3,
        read: true
      },
      {
        id: 'm1_2',
        senderId: 'p1',
        text: 'Thank you Aryan! Marine Drive with cutting chai is honestly my therapy. Have you lived in Mumbai long?',
        timestamp: Date.now() - 3600000 * 2,
        read: true
      },
      {
        id: 'm1_3',
        senderId: 'current_user_me',
        text: 'Born and raised here! I also know the best cafe for sourdough and cold brew in Bandra.',
        timestamp: Date.now() - 3600000 * 1.5,
        read: true
      },
      {
        id: 'm1_4',
        senderId: 'p1',
        text: 'Hey! Loved your taste in music. Marine Drive chai date sounds awesome ☕✨',
        timestamp: Date.now() - 3600000,
        read: false
      }
    ];
  }
  if (matchId === 'm2') {
    return [
      {
        id: 'm2_1',
        senderId: 'p3',
        text: 'Namaste Aryan! Are you fond of Hindi poetry or Urdu ghazals by any chance?',
        timestamp: Date.now() - 3600000 * 6,
        read: true
      },
      {
        id: 'm2_2',
        senderId: 'current_user_me',
        text: 'Hi Rhea! Daryaganj book market is truly unmatched. Love listening to Jagjit Singh on rainy evenings!',
        timestamp: Date.now() - 3600000 * 5,
        read: true
      }
    ];
  }

  return [];
};

export const sendNewMessage = (matchId: string, message: ChatMessage): void => {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '{}');
    const list = all[matchId] || getConversationMessages(matchId);
    list.push(message);
    all[matchId] = list;
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(all));

    // Update match's last message
    const matches = getMatches();
    const matchIndex = matches.findIndex(m => m.id === matchId);
    if (matchIndex !== -1) {
      matches[matchIndex].lastMessage = message;
      saveMatches(matches);
    }
  } catch (e) {
    console.error(e);
  }
};

export const blockUserProfile = (profileId: string): void => {
  const blocked = getBlockedIds();
  if (!blocked.includes(profileId)) {
    blocked.push(profileId);
    localStorage.setItem(STORAGE_KEYS.BLOCKED_IDS, JSON.stringify(blocked));
  }
  // Remove from matches
  const matches = getMatches().filter(m => m.profile.id !== profileId);
  saveMatches(matches);
};

export const unmatchUserProfile = (matchId: string): void => {
  const matches = getMatches().filter(m => m.id !== matchId);
  saveMatches(matches);
};

export const reportUserProfile = (profileId: string, reason: string, details: string): void => {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS) || '[]');
    raw.push({
      profileId,
      reason,
      details,
      timestamp: Date.now()
    });
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(raw));
  } catch (e) {
    console.error(e);
  }
  // Auto block after reporting for safety
  blockUserProfile(profileId);
};

export const resetAppDemoData = (): void => {
  localStorage.clear();
};
