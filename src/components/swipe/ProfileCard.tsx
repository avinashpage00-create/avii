import React, { useState } from 'react';
import { 
  BadgeCheck, MapPin, Briefcase, GraduationCap, Sparkles, 
  ChevronDown, ChevronUp, Globe2, Utensils, HeartHandshake,
  MessageCircle, Video, Info
} from 'lucide-react';
import { UserProfile } from '../../types';

interface ProfileCardProps {
  profile: UserProfile;
  onLike: () => void;
  onPass: () => void;
  onSuperLike: () => void;
  onOpenDirectChat?: () => void;
  isExpandedInitial?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onLike,
  onPass,
  onSuperLike,
  onOpenDirectChat,
  isExpandedInitial = false
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(isExpandedInitial);

  const photos = profile.photos && profile.photos.length > 0 ? profile.photos : [profile.avatar];

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex < photos.length - 1) {
      setPhotoIndex(photoIndex + 1);
    } else {
      setPhotoIndex(0);
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex > 0) {
      setPhotoIndex(photoIndex - 1);
    } else {
      setPhotoIndex(photos.length - 1);
    }
  };

  const getModeBadge = () => {
    switch (profile.relationshipMode) {
      case 'dating':
        return { label: 'Dating & Pyaar', emoji: '💖', bg: 'bg-pink-500/90 text-white' };
      case 'friendship':
        return { label: 'Yaari & Friends', emoji: '🤝', bg: 'bg-purple-600/90 text-white' };
      case 'serious':
        return { label: 'Shaadi & Long-Term', emoji: '💍', bg: 'bg-amber-600/90 text-white' };
    }
  };

  const modeBadge = getModeBadge();

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden bg-slate-900 shadow-2xl flex flex-col select-none border border-pink-100/30">
      {/* Background Image / Photo Carousel */}
      <div className="relative w-full h-full flex-1 overflow-hidden bg-slate-950">
        <img
          src={photos[photoIndex]}
          alt={profile.name}
          className="w-full h-full object-cover object-center filter contrast-[1.03] saturate-[1.06] transition-all duration-300"
          draggable={false}
        />

        {/* Stories-style photo progress indicators */}
        {photos.length > 1 && (
          <div className="absolute top-3 left-3 right-3 z-20 flex gap-1.5">
            {photos.map((_, idx) => (
              <div
                key={idx}
                className="h-1 flex-1 rounded-full bg-white/40 overflow-hidden backdrop-blur-xs"
              >
                <div
                  className={`h-full transition-all duration-300 ${
                    idx === photoIndex ? 'bg-white' : idx < photoIndex ? 'bg-white/80' : 'bg-transparent'
                  }`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Left/Right Photo Tap Zones */}
        <div className="absolute inset-0 flex z-10">
          <div
            className="w-1/2 h-4/5 cursor-pointer"
            onClick={handlePrevPhoto}
            title="Previous photo"
          />
          <div
            className="w-1/2 h-4/5 cursor-pointer"
            onClick={handleNextPhoto}
            title="Next photo"
          />
        </div>

        {/* Mode Tag & Verification Pill */}
        <div className="absolute top-6 left-4 z-20 flex flex-wrap items-center gap-1.5">
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md backdrop-blur-md flex items-center gap-1 ${modeBadge.bg}`}>
            <span>{modeBadge.emoji}</span>
            <span>{modeBadge.label}</span>
          </span>

          {profile.isOnline && (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/90 text-white shadow-md backdrop-blur-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Online</span>
            </span>
          )}
        </div>

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

        {/* Profile Basic Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-20 text-white pointer-events-auto">
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
                  {profile.name}, {profile.age}
                </h2>
                {profile.isVerified && (
                  <span title="DILMILENGE 18+ Selfie Verified" className="text-sky-400 drop-shadow-sm">
                    <BadgeCheck className="w-6 h-6 fill-sky-400 text-white" />
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 mt-1 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" />
                  {profile.city} • {profile.distanceKm} km away
                </span>
                {profile.profession && (
                  <span className="flex items-center gap-1 truncate max-w-[160px]">
                    <Briefcase className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    {profile.profession}
                  </span>
                )}
              </div>
            </div>

            {/* Toggle Full Bio Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="p-2 rounded-2xl bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all active:scale-95 shrink-0 border border-white/10"
              title={isExpanded ? 'Hide Bio' : 'View Full Profile & Prompts'}
            >
              {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
            </button>
          </div>

          {/* Quick Bio snippet when collapsed */}
          {!isExpanded && profile.bio && (
            <p className="text-xs sm:text-sm text-slate-200 mt-2 line-clamp-2 leading-relaxed font-normal drop-shadow-xs">
              {profile.bio}
            </p>
          )}

          {/* Hobbies chips */}
          {!isExpanded && profile.hobbies && profile.hobbies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {profile.hobbies.slice(0, 4).map((hobby, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-xs"
                >
                  {hobby}
                </span>
              ))}
              {profile.hobbies.length > 4 && (
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-white/15 backdrop-blur-md text-white/80 border border-white/10">
                  +{profile.hobbies.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Expanded Details Drawer */}
      {isExpanded && (
        <div className="bg-slate-900 border-t border-slate-800 p-5 max-h-[55%] overflow-y-auto text-white z-20 space-y-4">
          {/* Full Bio */}
          <div>
            <h4 className="text-xs font-semibold text-pink-400 uppercase tracking-wider mb-1">
              About Me
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed">{profile.bio}</p>
          </div>

          {/* Prompts with Indian flavor */}
          {profile.prompts && profile.prompts.length > 0 && (
            <div className="space-y-2.5">
              {profile.prompts.map((prompt, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-pink-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{prompt.question}</span>
                  </div>
                  <p className="text-sm font-medium text-white mt-1.5 leading-relaxed">
                    "{prompt.answer}"
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Basics & Lifestyle */}
          <div>
            <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
              Lifestyle & Basics
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              {profile.foodPreference && (
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/60">
                  <Utensils className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Diet: {profile.foodPreference}</span>
                </div>
              )}
              {profile.drinking && (
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/60">
                  <span>🥂 Drinks: {profile.drinking}</span>
                </div>
              )}
              {profile.smoking && (
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/60">
                  <span>🚭 Smokes: {profile.smoking}</span>
                </div>
              )}
              {profile.zodiac && (
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/60">
                  <span>♈ Zodiac: {profile.zodiac}</span>
                </div>
              )}
              {profile.height && (
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/60">
                  <span>📏 Height: {profile.height}</span>
                </div>
              )}
              {profile.languages && (
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/60">
                  <Globe2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{profile.languages.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          {/* All Hobbies */}
          <div>
            <h4 className="text-xs font-semibold text-pink-400 uppercase tracking-wider mb-2">
              Passions & Interests
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {profile.hobbies.map((hobby, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium px-2.5 py-1 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-200 border border-pink-500/30"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
