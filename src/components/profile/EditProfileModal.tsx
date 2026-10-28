import React, { useState } from 'react';
import { X, Save, Sparkles, MapPin, Briefcase, Heart } from 'lucide-react';
import { CurrentUser, RelationshipMode } from '../../types';
import { INDIAN_CITIES, POPULAR_INTERESTS } from '../../data/mockProfiles';

interface EditProfileModalProps {
  currentUser: CurrentUser;
  onSave: (updated: CurrentUser) => void;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  currentUser,
  onSave,
  onClose
}) => {
  const [name, setName] = useState(currentUser.name);
  const [city, setCity] = useState(currentUser.city);
  const [profession, setProfession] = useState(currentUser.profession);
  const [bio, setBio] = useState(currentUser.bio);
  const [relationshipMode, setRelationshipMode] = useState<RelationshipMode>(currentUser.relationshipMode);
  const [foodPreference, setFoodPreference] = useState(currentUser.foodPreference);
  const [hobbies, setHobbies] = useState<string[]>(currentUser.hobbies);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar);

  const toggleHobby = (hobby: string) => {
    if (hobbies.includes(hobby)) {
      setHobbies(hobbies.filter(h => h !== hobby));
    } else {
      if (hobbies.length < 7) {
        setHobbies([...hobbies, hobby]);
      }
    }
  };

  const handleSave = () => {
    const updated: CurrentUser = {
      ...currentUser,
      name,
      city,
      profession,
      bio,
      relationshipMode,
      foodPreference,
      hobbies,
      avatar: avatarUrl
    };
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-white border border-pink-100 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white flex items-center justify-between">
          <h3 className="font-extrabold text-base tracking-tight">Edit Your Profile</h3>
          <button onClick={onClose} className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {/* Avatar URL / Quick sample */}
          <div>
            <label className="font-bold text-gray-700 block mb-1">Profile Photo URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={avatarUrl}
                onChange={e => setAvatarUrl(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-pink-500 focus:outline-none"
              />
              <img
                src={avatarUrl}
                alt="Preview"
                className="w-9 h-9 rounded-xl object-cover border border-pink-200"
              />
            </div>
          </div>

          {/* Name & City */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">City in India</label>
              <select
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-pink-500 focus:outline-none bg-white"
              >
                {INDIAN_CITIES.filter(c => c !== 'All Cities').map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Profession */}
          <div>
            <label className="font-bold text-gray-700 block mb-1">Profession / Work</label>
            <input
              type="text"
              value={profession}
              onChange={e => setProfession(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-pink-500 focus:outline-none"
            />
          </div>

          {/* Relationship Mode */}
          <div>
            <label className="font-bold text-gray-700 block mb-1">Connection Mode</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRelationshipMode('dating')}
                className={`py-2 px-1 rounded-xl text-center font-bold border transition-all ${
                  relationshipMode === 'dating'
                    ? 'border-pink-500 bg-pink-50 text-pink-700'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                💖 Dating
              </button>
              <button
                type="button"
                onClick={() => setRelationshipMode('friendship')}
                className={`py-2 px-1 rounded-xl text-center font-bold border transition-all ${
                  relationshipMode === 'friendship'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                🤝 Yaari
              </button>
              <button
                type="button"
                onClick={() => setRelationshipMode('serious')}
                className={`py-2 px-1 rounded-xl text-center font-bold border transition-all ${
                  relationshipMode === 'serious'
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                💍 Serious
              </button>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="font-bold text-gray-700 block mb-1">Bio (Tell others about yourself)</label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-pink-500 focus:outline-none resize-none"
            />
          </div>

          {/* Food Preference */}
          <div>
            <label className="font-bold text-gray-700 block mb-1">Diet / Food Preference</label>
            <div className="flex flex-wrap gap-2">
              {(['Vegetarian', 'Non-Veg', 'Eggetarian', 'Jain', 'Vegan'] as const).map(diet => (
                <button
                  key={diet}
                  type="button"
                  onClick={() => setFoodPreference(diet)}
                  className={`px-3 py-1.5 rounded-xl font-medium border transition-all ${
                    foodPreference === diet
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>

          {/* Hobbies Selection */}
          <div>
            <label className="font-bold text-gray-700 block mb-1">
              Passions & Interests (Select up to 7)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_INTERESTS.map(hobby => {
                const isSelected = hobbies.includes(hobby);
                return (
                  <button
                    key={hobby}
                    type="button"
                    onClick={() => toggleHobby(hobby)}
                    className={`px-2.5 py-1 rounded-xl border text-[11px] font-medium transition-all ${
                      isSelected
                        ? 'border-pink-500 bg-pink-500 text-white font-bold'
                        : 'border-gray-200 text-gray-600 hover:border-pink-200'
                    }`}
                  >
                    {hobby}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-xs shadow-md shadow-pink-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};
