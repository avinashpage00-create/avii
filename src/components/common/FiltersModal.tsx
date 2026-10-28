import React, { useState } from 'react';
import { X, SlidersHorizontal, Check, ShieldCheck, MapPin } from 'lucide-react';
import { RelationshipMode } from '../../types';
import { INDIAN_CITIES } from '../../data/mockProfiles';

export interface FilterSettings {
  city: string;
  minAge: number;
  maxAge: number;
  maxDistanceKm: number;
  mode: RelationshipMode | 'all';
  verifiedOnly: boolean;
}

interface FiltersModalProps {
  initialFilters: FilterSettings;
  onApply: (filters: FilterSettings) => void;
  onClose: () => void;
}

export const FiltersModal: React.FC<FiltersModalProps> = ({
  initialFilters,
  onApply,
  onClose
}) => {
  const [city, setCity] = useState(initialFilters.city);
  const [minAge, setMinAge] = useState(initialFilters.minAge);
  const [maxAge, setMaxAge] = useState(initialFilters.maxAge);
  const [maxDistanceKm, setMaxDistanceKm] = useState(initialFilters.maxDistanceKm);
  const [mode, setMode] = useState<RelationshipMode | 'all'>(initialFilters.mode);
  const [verifiedOnly, setVerifiedOnly] = useState(initialFilters.verifiedOnly);

  const handleApply = () => {
    onApply({
      city,
      minAge,
      maxAge,
      maxDistanceKm,
      mode,
      verifiedOnly
    });
    onClose();
  };

  const handleReset = () => {
    setCity('All Cities');
    setMinAge(18);
    setMaxAge(35);
    setMaxDistanceKm(50);
    setMode('all');
    setVerifiedOnly(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-white border border-pink-100 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            <h3 className="font-extrabold text-sm tracking-tight">Discovery Preferences</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {/* City */}
          <div>
            <label className="font-bold text-gray-700 flex items-center gap-1 mb-1">
              <MapPin className="w-3.5 h-3.5 text-pink-500" />
              <span>Location / City in India</span>
            </label>
            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-pink-500 focus:outline-none bg-white font-medium"
            >
              {INDIAN_CITIES.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Relationship Mode */}
          <div>
            <label className="font-bold text-gray-700 block mb-1">Intent / Mode</label>
            <div className="grid grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => setMode('all')}
                className={`py-1.5 rounded-xl text-center font-bold text-[11px] border ${
                  mode === 'all' ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-gray-200 text-gray-600'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setMode('dating')}
                className={`py-1.5 rounded-xl text-center font-bold text-[11px] border ${
                  mode === 'dating' ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-gray-200 text-gray-600'
                }`}
              >
                💖 Date
              </button>
              <button
                type="button"
                onClick={() => setMode('friendship')}
                className={`py-1.5 rounded-xl text-center font-bold text-[11px] border ${
                  mode === 'friendship' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600'
                }`}
              >
                🤝 Yaari
              </button>
              <button
                type="button"
                onClick={() => setMode('serious')}
                className={`py-1.5 rounded-xl text-center font-bold text-[11px] border ${
                  mode === 'serious' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 text-gray-600'
                }`}
              >
                💍 Shaadi
              </button>
            </div>
          </div>

          {/* Age Range Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-gray-700">Age Range (18+ Verified)</label>
              <span className="font-bold text-pink-600">{minAge} - {maxAge} yrs</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={18}
                max={30}
                value={minAge}
                onChange={e => setMinAge(Number(e.target.value))}
                className="w-full accent-pink-600 cursor-pointer"
              />
              <input
                type="range"
                min={25}
                max={45}
                value={maxAge}
                onChange={e => setMaxAge(Number(e.target.value))}
                className="w-full accent-pink-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Maximum Distance */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-gray-700">Maximum Distance</label>
              <span className="font-bold text-purple-600">{maxDistanceKm} km</span>
            </div>
            <input
              type="range"
              min={5}
              max={150}
              step={5}
              value={maxDistanceKm}
              onChange={e => setMaxDistanceKm(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          {/* Verified Profiles Only */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-sky-50 border border-sky-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
              <div>
                <span className="font-bold text-sky-900 block">Verified Profiles Only</span>
                <span className="text-[10px] text-sky-700">Show singles with live selfie shield</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`w-9 h-5 rounded-full transition-colors relative ${
                verifiedOnly ? 'bg-sky-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.75 transition-transform ${
                  verifiedOnly ? 'left-4.5' : 'left-0.75'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100 bg-gray-50 flex gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl border border-gray-300 text-gray-600 font-bold text-xs hover:bg-gray-100"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-xs shadow-md shadow-pink-500/20 active:scale-95 transition-all"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
