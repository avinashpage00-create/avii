import { UserProfile } from '../types';

export const INITIAL_PROFILES: UserProfile[] = [
  {
    id: 'p1',
    name: 'Ananya Sharma',
    age: 23,
    gender: 'female',
    city: 'Mumbai',
    state: 'Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Architect by day, Bollywood trivia queen by night. Love sipping cutting chai at Marine Drive and discovering hidden indie cafes in Bandra.',
    profession: 'Architect & Interior Designer',
    education: 'Sir J.J. College of Architecture',
    height: "5'5\"",
    languages: ['Hindi', 'English', 'Marathi'],
    hobbies: ['Bollywood', 'Chai Lover', 'Cafe Hopping', 'Photography', 'Art & Design', 'Music'],
    relationshipMode: 'dating',
    foodPreference: 'Vegetarian',
    drinking: 'Socially',
    smoking: 'Never',
    zodiac: 'Libra',
    prompts: [
      {
        question: 'My ideal first date in Mumbai',
        answer: 'Late evening sunset stroll at Carter Road followed by hot pav bhaji and deep talks about our 90s nostalgia.'
      },
      {
        question: 'A non-negotiable for me',
        answer: 'You must respect my love for ginger cardamom chai and not compare it to green tea!'
      }
    ],
    isVerified: true,
    distanceKm: 4,
    isOnline: true,
    lastActive: 'Just now',
    likesMe: true
  },
  {
    id: 'p2',
    name: 'Kavya Nair',
    age: 24,
    gender: 'female',
    city: 'Bengaluru',
    state: 'Karnataka',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Product designer at a tech startup. Weekend indie guitarist, South Indian filter coffee fanatic, and Western Ghats trekker. Looking for genuine friendship and good conversations.',
    profession: 'UI/UX Product Designer',
    education: 'NID Bengaluru',
    height: "5'6\"",
    languages: ['English', 'Hindi', 'Malayalam', 'Kannada'],
    hobbies: ['Guitar & Music', 'Coffee', 'Trekking', 'Tech & Startups', 'Photography'],
    relationshipMode: 'dating',
    foodPreference: 'Eggetarian',
    drinking: 'Socially',
    smoking: 'Never',
    zodiac: 'Aries',
    prompts: [
      {
        question: 'Together we could...',
        answer: 'Go on an unplanned weekend morning drive to Nandi Hills at 5 AM for sunrise filter coffee.'
      },
      {
        question: 'My greatest superpower',
        answer: 'I can curate the perfect Spotify road-trip playlist in less than two minutes.'
      }
    ],
    isVerified: true,
    distanceKm: 6,
    isOnline: true,
    lastActive: 'Online now',
    likesMe: true
  },
  {
    id: 'p3',
    name: 'Rhea Sen',
    age: 24,
    gender: 'female',
    city: 'Delhi NCR',
    state: 'Delhi',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Literature grad & creative strategist. Old Delhi foodie, lover of ghazals, books, and indie flea markets. Believer in old-school romance with modern mutual respect.',
    profession: 'Creative Content Lead',
    education: 'Delhi University (St. Stephen\'s)',
    height: "5'4\"",
    languages: ['Hindi', 'English', 'Bengali', 'Urdu'],
    hobbies: ['Books & Poetry', 'Street Food', 'Standup Comedy', 'Travel & Roadtrips'],
    relationshipMode: 'serious',
    foodPreference: 'Non-Veg',
    drinking: 'Socially',
    smoking: 'Never',
    zodiac: 'Cancer',
    prompts: [
      {
        question: 'Green flags I value most',
        answer: 'Being kind to service staff, listening without waiting to speak, and appreciating handwritten letters.'
      },
      {
        question: 'Favorite weekend vibe',
        answer: 'Browsing second-hand books in Daryaganj, hot kachoris, and long conversations about life.'
      }
    ],
    isVerified: true,
    distanceKm: 12,
    isOnline: false,
    lastActive: '30m ago',
    likesMe: true
  },
  {
    id: 'p4',
    name: 'Aarushi Patel',
    age: 23,
    gender: 'female',
    city: 'Ahmedabad',
    state: 'Gujarat',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Fashion entrepreneur & Garba enthusiast. Love fitness, badminton, and lively cafe banter. Here for genuine friendship & seeing where the spark leads.',
    profession: 'Fashion Brand Founder',
    education: 'NIFT Gandhinagar',
    height: "5'6\"",
    languages: ['Gujarati', 'Hindi', 'English'],
    hobbies: ['Garba & Dance', 'Gym & Fitness', 'Travel & Roadtrips', 'Coffee', 'Cooking'],
    relationshipMode: 'dating',
    foodPreference: 'Vegetarian',
    drinking: 'Never',
    smoking: 'Never',
    zodiac: 'Leo',
    prompts: [
      {
        question: 'I guarantee we will get along if...',
        answer: 'You have a healthy playful spirit and can dance your heart out during Navratri.'
      }
    ],
    isVerified: true,
    distanceKm: 18,
    isOnline: true,
    lastActive: 'Online now',
    likesMe: true
  },
  {
    id: 'p5',
    name: 'Pooja Verma',
    age: 22,
    gender: 'female',
    city: 'Pune',
    state: 'Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Masters student in Psychology at SPPU. New in Pune! Looking to make loyal friends (Yaari) to explore Koregaon Park cafes, live gigs, and study together.',
    profession: 'Psychology Researcher',
    education: 'Pune University (SPPU)',
    height: "5'3\"",
    languages: ['Hindi', 'English'],
    hobbies: ['Standup Comedy', 'Coffee', 'Live Music', 'Books & Poetry', 'Trekking'],
    relationshipMode: 'friendship',
    foodPreference: 'Eggetarian',
    drinking: 'Never',
    smoking: 'Never',
    zodiac: 'Virgo',
    prompts: [
      {
        question: 'Looking for a friend to...',
        answer: 'Go to open-mic comedy nights at Balewadi High Street and discover peaceful study cafes together!'
      }
    ],
    isVerified: true,
    distanceKm: 5,
    isOnline: true,
    lastActive: 'Active 10m ago',
    likesMe: true
  },
  {
    id: 'p6',
    name: 'Ishita Singhania',
    age: 25,
    gender: 'female',
    city: 'Jaipur',
    state: 'Rajasthan',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Jewellery designer & heritage art curator in the Pink City. Passionate about classical Kathak, organic cooking, and rich cultural traditions. Ready for a meaningful life partnership.',
    profession: 'Jewellery Designer & Heritage Curator',
    education: 'Pearl Academy Jaipur',
    height: "5'5\"",
    languages: ['Hindi', 'English', 'Rajasthani'],
    hobbies: ['Art & Design', 'Garba & Dance', 'Cooking', 'Travel & Roadtrips', 'Photography'],
    relationshipMode: 'serious',
    foodPreference: 'Vegetarian',
    drinking: 'Never',
    smoking: 'Never',
    zodiac: 'Taurus',
    prompts: [
      {
        question: 'What I look for in my Humsafar',
        answer: 'Mutual emotional depth, shared family values, good humor, and someone who appreciates deep conversations under starlit rooftop forts.'
      }
    ],
    isVerified: true,
    distanceKm: 22,
    isOnline: false,
    lastActive: '1 hour ago',
    likesMe: false
  },
  {
    id: 'p7',
    name: 'Dr. Meera Iyer',
    age: 26,
    gender: 'female',
    city: 'Chennai',
    state: 'Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Pediatric resident doctor. Bharatanatyam dancer since age 6. Love Carnatic fusion, beach walks at Besant Nagar, and spontaneous filter coffee runs.',
    profession: 'Resident Doctor (Pediatrics)',
    education: 'Madras Medical College',
    height: "5'6\"",
    languages: ['Tamil', 'English', 'Hindi'],
    hobbies: ['Garba & Dance', 'Coffee', 'Books & Poetry', 'Travel & Roadtrips'],
    relationshipMode: 'serious',
    foodPreference: 'Vegetarian',
    drinking: 'Never',
    smoking: 'Never',
    zodiac: 'Pisces',
    prompts: [
      {
        question: 'A boundary I respect',
        answer: 'Balancing demanding hospital shifts with dedicated quality time when we are together.'
      }
    ],
    isVerified: true,
    distanceKm: 25,
    isOnline: true,
    lastActive: 'Online now',
    likesMe: true
  },
  {
    id: 'p8',
    name: 'Roshni Deshmukh',
    age: 24,
    gender: 'female',
    city: 'Mumbai',
    state: 'Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Cinematographer & film photographer. Working on indie short films. Looking for creative souls and fun hangout buddies to explore South Bombay at midnight.',
    profession: 'Cinematographer',
    education: 'Whistling Woods International',
    height: "5'5\"",
    languages: ['Marathi', 'Hindi', 'English'],
    hobbies: ['Photography', 'Chai Lover', 'Music', 'Street Food'],
    relationshipMode: 'friendship',
    foodPreference: 'Non-Veg',
    drinking: 'Socially',
    smoking: 'Never',
    zodiac: 'Scorpio',
    prompts: [
      {
        question: 'Teach me something about...',
        answer: 'Your favorite street food corner or the one song you listen to whenever you want to feel inspired.'
      }
    ],
    isVerified: true,
    distanceKm: 8,
    isOnline: true,
    lastActive: 'Online now',
    likesMe: false
  },
  {
    id: 'p9',
    name: 'Simran Kaur',
    age: 23,
    gender: 'female',
    city: 'Chandigarh',
    state: 'Punjab',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Fashion designer & Punjabi music lover. Sukhna Lake sunset enthusiast. Energetic, warm-hearted, and loves someone with great dressing sense!',
    profession: 'Apparel Designer',
    education: 'NIFT Mohali',
    height: "5'7\"",
    languages: ['Punjabi', 'Hindi', 'English'],
    hobbies: ['Bollywood', 'Gym & Fitness', 'Travel & Roadtrips', 'Cooking'],
    relationshipMode: 'dating',
    foodPreference: 'Vegetarian',
    drinking: 'Never',
    smoking: 'Never',
    zodiac: 'Gemini',
    prompts: [
      {
        question: 'The key to my heart is...',
        answer: 'Good humor, singing Diljit songs on a highway drive, and authentic hot Amritsari kulcha.'
      }
    ],
    isVerified: true,
    distanceKm: 30,
    isOnline: false,
    lastActive: '2h ago',
    likesMe: true
  },
  {
    id: 'p10',
    name: 'Debashree Roy',
    age: 25,
    gender: 'female',
    city: 'Kolkata',
    state: 'West Bengal',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Data scientist and classical vocalist. College Street lover, tea stall adda philosopher. Seeking someone who enjoys thoughtful conversations and mishti doi.',
    profession: 'Lead Data Scientist',
    education: 'ISI Kolkata',
    height: "5'5\"",
    languages: ['Bengali', 'English', 'Hindi'],
    hobbies: ['Books & Poetry', 'Chai Lover', 'Guitar & Music', 'Tech & Startups'],
    relationshipMode: 'dating',
    foodPreference: 'Non-Veg',
    drinking: 'Socially',
    smoking: 'Never',
    zodiac: 'Aquarius',
    prompts: [
      {
        question: 'First date dream',
        answer: 'Coffee at Indian Coffee House, debating book adaptations, and taking a sunset ferry ride on the Hooghly.'
      }
    ],
    isVerified: true,
    distanceKm: 42,
    isOnline: true,
    lastActive: 'Online now',
    likesMe: true
  },
  {
    id: 'p11',
    name: 'Sanya Mirza',
    age: 24,
    gender: 'female',
    city: 'Hyderabad',
    state: 'Telangana',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Cloud architecture consultant. Badminton player, authentic Hyderabadi biryani aficionado, and rooftop cafe regular in Jubilee Hills.',
    profession: 'Cloud Solutions Consultant',
    education: 'BITS Pilani Hyderabad',
    height: "5'6\"",
    languages: ['Telugu', 'Hindi', 'English', 'Urdu'],
    hobbies: ['Tech & Startups', 'Street Food', 'Gym & Fitness', 'Travel & Roadtrips'],
    relationshipMode: 'dating',
    foodPreference: 'Non-Veg',
    drinking: 'Never',
    smoking: 'Never',
    zodiac: 'Sagittarius',
    prompts: [
      {
        question: 'Best Sunday routine',
        answer: 'Morning badminton match followed by irani chai, osmania biscuits, and a relaxing drive around Durgam Cheruvu.'
      }
    ],
    isVerified: true,
    distanceKm: 14,
    isOnline: true,
    lastActive: 'Online now',
    likesMe: true
  },
  {
    id: 'p12',
    name: 'Tara Fernandes',
    age: 23,
    gender: 'female',
    city: 'Goa',
    state: 'Goa',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Marine biologist & certified scuba diver. Acoustic indie vocalist, sunset chaser, and lover of beach shacks and sustainable travel.',
    profession: 'Marine Biologist & Scuba Divemaster',
    education: 'Goa University',
    height: "5'7\"",
    languages: ['Konkani', 'English', 'Hindi', 'Portuguese'],
    hobbies: ['Guitar & Music', 'Trekking', 'Travel & Roadtrips', 'Photography'],
    relationshipMode: 'dating',
    foodPreference: 'Non-Veg',
    drinking: 'Socially',
    smoking: 'Never',
    zodiac: 'Pisces',
    prompts: [
      {
        question: 'My favorite spot in Goa',
        answer: 'A secluded cliff in South Goa watching dolphins play at sunset while strumming an acoustic ukulele.'
      }
    ],
    isVerified: true,
    distanceKm: 35,
    isOnline: true,
    lastActive: 'Online now',
    likesMe: true
  }
];

export const INDIAN_CITIES = [
  'All Cities',
  'Mumbai',
  'Delhi NCR',
  'Bengaluru',
  'Pune',
  'Hyderabad',
  'Kolkata',
  'Chennai',
  'Ahmedabad',
  'Jaipur',
  'Chandigarh',
  'Lucknow',
  'Indore',
  'Kochi',
  'Goa'
];

export const POPULAR_INTERESTS = [
  'Bollywood',
  'Cricket',
  'Chai Lover',
  'Coffee',
  'Street Food',
  'Trekking',
  'Gym & Fitness',
  'Guitar & Music',
  'Tech & Startups',
  'Books & Poetry',
  'Standup Comedy',
  'Photography',
  'Travel & Roadtrips',
  'Garba & Dance',
  'Cooking'
];
