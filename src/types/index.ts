export type Gender = 'male' | 'female' | 'non-binary';
export type SeekingGender = 'male' | 'female' | 'everyone';
export type RelationshipMode = 'dating' | 'friendship' | 'serious';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  city: string;
  state?: string;
  avatar: string;
  photos: string[];
  bio: string;
  profession: string;
  education?: string;
  height?: string;
  languages: string[];
  hobbies: string[];
  relationshipMode: RelationshipMode; // Dating (Pyaar), Friendship (Yaari), Serious (Humsafar)
  foodPreference: 'Vegetarian' | 'Non-Veg' | 'Eggetarian' | 'Jain' | 'Vegan';
  drinking: 'Never' | 'Socially' | 'Regularly';
  smoking: 'Never' | 'Occasionally' | 'Yes';
  zodiac?: string;
  prompts: {
    question: string;
    answer: string;
  }[];
  isVerified: boolean;
  distanceKm: number;
  isOnline: boolean;
  lastActive?: string;
  likesMe?: boolean; // For "See Who Liked You" feature
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'audio';
  audioDuration?: number; // in seconds
  timestamp: number;
  read: boolean;
}

export interface MatchItem {
  id: string;
  profile: UserProfile;
  matchedAt: number;
  lastMessage?: ChatMessage;
  unreadCount: number;
  mode: RelationshipMode;
}

export type SubscriptionTier = 'free' | 'gold' | 'vip';

export interface CurrentUser {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  age: number;
  dob: string;
  gender: Gender;
  seeking: SeekingGender;
  city: string;
  avatar: string;
  photos: string[];
  bio: string;
  profession: string;
  languages: string[];
  hobbies: string[];
  relationshipMode: RelationshipMode;
  foodPreference: 'Vegetarian' | 'Non-Veg' | 'Eggetarian' | 'Jain' | 'Vegan';
  drinking: 'Never' | 'Socially' | 'Regularly';
  smoking: 'Never' | 'Occasionally' | 'Yes';
  prompts: {
    question: string;
    answer: string;
  }[];
  isVerified: boolean;
  subscription: SubscriptionTier;
  boostActiveUntil?: number;
  superLikesRemaining: number;
  rewindsRemaining: number;
  isAgeVerified: boolean;
}

export interface CallSession {
  callId: string;
  partner: UserProfile;
  type: 'video' | 'audio';
  status: 'incoming' | 'outgoing' | 'connected' | 'ended';
  startedAt?: number;
  durationSeconds?: number;
}
