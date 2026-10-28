import React, { useState } from 'react';
import { Search, MapPin, Heart, Sparkles, ShieldCheck, Filter, Users, Coffee, Flame } from 'lucide-react';
import { UserProfile, RelationshipMode } from '../../types';
import { INDIAN_CITIES, POPULAR_INTERESTS } from '../../data/mockProfiles';

interface DiscoverGridProps {
  profiles: UserProfile[];
  onSelectProfile: (profile: UserProfile) => void;
  onInstantLike: (profile: UserProfile) => void;
}

export const DiscoverGrid: React.FC<DiscoverGridProps> = ({
  profiles,
  onSelectProfile,
  onInstantLike
}) => {
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<RelationshipMode | 'all'>('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const curatedVibes = [
    { label: 'Chai Lovers ☕', filterInterest: 'Chai Lover' },
    { label: 'Bollywood 🎬', filterInterest: 'Bollywood' },
    { label: 'Fitness & Gym 🏋️‍♂️', filterInterest: 'Gym & Fitness' },
    { label: 'Trekkers ⛰️', filterInterest: 'Trekking' },
    { label: 'Street Food 🥟', filterInterest: 'Street Food' },
    { label: 'Tech & Startups 💻', filterInterest: 'Tech & Startups' }
  ];

  const filtered = profiles.filter(p => {
    const matchesCity = selectedCity === 'All Cities' || p.city.toLowerCase().includes(selectedCity.toLowerCase());
    const matchesMode = selectedMode === 'all' || p.relationshipMode === selectedMode;
    const matchesVerified = !verifiedOnly || p.isVerified;
    const matchesInterest = !selectedInterest || p.hobbies.some(h => h.toLowerCase().includes(selectedInterest.toLowerCase()));
    const matchesKeyword = !searchKeyword ||
      p.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      p.city.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      p.bio.toLowerCase().includes(searchKeyword.toLowerCase());

    return matchesCity && matchesMode && matchesVerified && matchesInterest && matchesKeyword;
  });

  return (
    <div className="flex-1 flex flex-col max-w-md mx-auto w-full pb-20">
      {/* Top Search & Filter Bar */}
      <div className="p-4 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, hobby, or profession..."
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-2xl bg-gray-100 border border-transparent focus:border-pink-300 focus:bg-white focus:outline-none transition-all placeholder:text-gray-400"
          />
        </div>

        {/* City Filter Horizontal Chips */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-1.5 px-0.5">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-pink-500" />
              <span>Filter by Indian City</span>
            </span>
            {selectedCity !== 'All Cities' && (
              <button
                onClick={() => setSelectedCity('All Cities')}
                className="text-pink-600 font-semibold text-[11px]"
              >
                Reset City
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {INDIAN_CITIES.map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`text-xs px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
                  selectedCity === city
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-pink-200'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Curated Vibe Cards */}
        <div>
          <span className="text-xs font-semibold text-gray-500 mb-1.5 block px-0.5">
            Explore by Vibes & Hobbies
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {curatedVibes.map((vibe, idx) => {
              const isSelected = selectedInterest === vibe.filterInterest;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedInterest(isSelected ? null : vibe.filterInterest)}
                  className={`text-xs px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-purple-50 text-purple-700 border border-purple-100 hover:bg-purple-100'
                  }`}
                >
                  {vibe.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Toggles: Relationship Mode & Verified Only */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => setSelectedMode('all')}
              className={`px-2.5 py-1 rounded-lg ${
                selectedMode === 'all' ? 'bg-pink-100 text-pink-700 font-bold' : 'text-gray-500'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedMode('dating')}
              className={`px-2.5 py-1 rounded-lg ${
                selectedMode === 'dating' ? 'bg-pink-100 text-pink-700 font-bold' : 'text-gray-500'
              }`}
            >
              💖 Dating
            </button>
            <button
              onClick={() => setSelectedMode('friendship')}
              className={`px-2.5 py-1 rounded-lg ${
                selectedMode === 'friendship' ? 'bg-purple-100 text-purple-700 font-bold' : 'text-gray-500'
              }`}
            >
              🤝 Yaari
            </button>
            <button
              onClick={() => setSelectedMode('serious')}
              className={`px-2.5 py-1 rounded-lg ${
                selectedMode === 'serious' ? 'bg-amber-100 text-amber-800 font-bold' : 'text-gray-500'
              }`}
            >
              💍 Serious
            </button>
          </div>

          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 font-medium transition-colors ${
              verifiedOnly
                ? 'bg-sky-100 text-sky-800 font-bold border border-sky-200'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Verified</span>
          </button>
        </div>
      </div>

      {/* Grid of Profile Cards */}
      <div className="px-4 flex-1">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-3 font-medium">
          <span>Showing {filtered.length} singles</span>
          {selectedCity !== 'All Cities' && <span>in {selectedCity}</span>}
        </div>

        {filtered.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            <p className="text-sm font-semibold text-gray-600">No profiles found</p>
            <p className="text-xs text-gray-400 mt-1">Try resetting city or hobby filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map(profile => (
              <div
                key={profile.id}
                onClick={() => onSelectProfile(profile)}
                className="relative rounded-2xl overflow-hidden shadow-md group cursor-pointer bg-slate-900 aspect-3/4"
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Gradient for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Top badges */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/50 backdrop-blur-xs text-white">
                    {profile.relationshipMode === 'dating' ? '💖 Date' : profile.relationshipMode === 'friendship' ? '🤝 Yaari' : '💍 Shaadi'}
                  </span>
                  {profile.isOnline && (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white shadow-xs" />
                  )}
                </div>

                {/* Bottom Profile Details */}
                <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                  <div className="flex items-center gap-1">
                    <h4 className="text-sm font-extrabold truncate">
                      {profile.name}, {profile.age}
                    </h4>
                    {profile.isVerified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    )}
                  </div>

                  <p className="text-[11px] text-slate-300 truncate flex items-center gap-0.5 mt-0.5">
                    <MapPin className="w-3 h-3 text-pink-400 shrink-0" />
                    <span>{profile.city}</span>
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/10">
                    <span className="text-[10px] text-slate-400 truncate max-w-[85px]">
                      {profile.profession ? profile.profession.split(' ')[0] : 'Single'}
                    </span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onInstantLike(profile);
                      }}
                      className="p-1.5 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 text-white shadow-xs hover:scale-110 active:scale-90 transition-transform"
                      title="Send Like"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
