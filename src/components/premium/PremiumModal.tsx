import React, { useState } from 'react';
import { 
  Crown, Check, Zap, Eye, RotateCcw, Heart, Sparkles, 
  X, ShieldCheck, ArrowRight, CreditCard, Smartphone
} from 'lucide-react';
import { CurrentUser, SubscriptionTier, UserProfile } from '../../types';
import { playSound } from '../../utils/audio';

interface PremiumModalProps {
  currentUser: CurrentUser;
  likedMeProfiles: UserProfile[];
  onUpgrade: (tier: SubscriptionTier) => void;
  onInstantMatchFromLikes: (profile: UserProfile) => void;
  onClose: () => void;
  initialTab?: 'plans' | 'likes';
}

export const PremiumModal: React.FC<PremiumModalProps> = ({
  currentUser,
  likedMeProfiles,
  onUpgrade,
  onInstantMatchFromLikes,
  onClose,
  initialTab = 'plans'
}) => {
  const [tab, setTab] = useState<'plans' | 'likes'>(initialTab);
  const [selectedPlan, setSelectedPlan] = useState<'gold' | 'vip'>('gold');
  const [paymentStep, setPaymentStep] = useState<'select' | 'upi' | 'processing' | 'success'>('select');
  const [upiId, setUpiId] = useState('user@okaxis');

  const handleSimulatePayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
      playSound('match');
      onUpgrade(selectedPlan);
      setTimeout(() => {
        setTab('likes');
        setPaymentStep('select');
      }, 1500);
    }, 2000);
  };

  const isSubscribed = currentUser.subscription !== 'free';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-amber-500/30 text-white shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Header */}
        <div className="p-4 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-200">
              <Crown className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight">DILMILENGE Gold & VIP</h3>
              <p className="text-[11px] text-amber-100 font-medium">Unlock 10x More Matches Across India</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher: Plans vs Who Liked Me */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 text-xs px-2 pt-2">
          <button
            onClick={() => setTab('plans')}
            className={`flex-1 py-2.5 font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              tab === 'plans'
                ? 'border-amber-400 text-amber-300 bg-slate-900 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>VIP Plans</span>
          </button>
          <button
            onClick={() => setTab('likes')}
            className={`flex-1 py-2.5 font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              tab === 'likes'
                ? 'border-pink-500 text-pink-300 bg-slate-900 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-pink-400" />
            <span>Who Liked Me ({likedMeProfiles.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {tab === 'plans' && (
            <>
              {/* Features List */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <Eye className="w-4 h-4 text-pink-400 shrink-0" />
                  <span><strong>See Who Liked You</strong>: Reveal profiles and match instantly without guessing</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Unlimited Rewinds</strong>: Undo accidental left passes anytime</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <Zap className="w-4 h-4 text-purple-400 shrink-0" />
                  <span><strong>Monthly Profile Boost</strong>: Be the top profile in Mumbai/Delhi for 30 mins</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                  <span><strong>5 Free Super Likes Weekly</strong>: Stand out with high priority</span>
                </div>
              </div>

              {/* Plan Choice Cards */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* Gold Plan */}
                <div
                  onClick={() => setSelectedPlan('gold')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedPlan === 'gold'
                      ? 'border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                      : 'border-slate-800 bg-slate-800/40 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-amber-300 text-sm">DilSe Gold</span>
                    <Crown className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-xl font-black text-white">₹299<span className="text-xs font-normal text-slate-400">/mo</span></div>
                  <p className="text-[10px] text-slate-300 mt-1">Unlimited likes, rewinds & see likes</p>
                </div>

                {/* VIP Plan */}
                <div
                  onClick={() => setSelectedPlan('vip')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all relative ${
                    selectedPlan === 'vip'
                      ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/10'
                      : 'border-slate-800 bg-slate-800/40 hover:border-slate-700'
                  }`}
                >
                  <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded-md bg-gradient-to-r from-pink-500 to-purple-600 text-[9px] font-extrabold text-white">
                    BEST VALUE
                  </span>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-purple-300 text-sm">DilSe VIP</span>
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-xl font-black text-white">₹599<span className="text-xs font-normal text-slate-400">/mo</span></div>
                  <p className="text-[10px] text-slate-300 mt-1">Everything + 5 Super Likes & Boosts</p>
                </div>
              </div>

              {/* Payment Flow or Upgrade Trigger */}
              {paymentStep === 'select' && (
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => setPaymentStep('upi')}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white font-extrabold text-sm shadow-xl shadow-rose-500/20 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Upgrade to {selectedPlan === 'gold' ? 'Gold (₹299)' : 'VIP (₹599)'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span>UPI • GPay • PhonePe • Paytm</span>
                    <span>•</span>
                    <span>Cancel anytime</span>
                  </div>
                </div>
              )}

              {paymentStep === 'upi' && (
                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-emerald-400" />
                      <span>Instant UPI Payment</span>
                    </span>
                    <span className="text-amber-400 font-extrabold">
                      {selectedPlan === 'gold' ? '₹299' : '₹599'}
                    </span>
                  </div>

                  <input
                    type="text"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="Enter UPI ID (e.g. yourname@okaxis)"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => setPaymentStep('select')}
                      className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSimulatePayment}
                      className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
                    >
                      Pay via UPI & Activate
                    </button>
                  </div>
                </div>
              )}

              {paymentStep === 'processing' && (
                <div className="py-6 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full border-4 border-amber-400 border-t-transparent animate-spin mx-auto" />
                  <p className="text-xs font-bold text-amber-300">
                    Connecting to UPI gateway... Please approve payment.
                  </p>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="py-6 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="font-extrabold text-base text-white">Payment Successful!</h4>
                  <p className="text-xs text-slate-300">You are now a DilSe VIP member.</p>
                </div>
              )}
            </>
          )}

          {tab === 'likes' && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-xs">
                <p className="font-bold text-pink-300 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
                  <span>{likedMeProfiles.length} Singles in India swiped right on you!</span>
                </p>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  {isSubscribed
                    ? 'Tap on any profile to match instantly and start chatting.'
                    : 'Upgrade to Gold or VIP to unblur and match directly.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {likedMeProfiles.map(profile => (
                  <div
                    key={profile.id}
                    className="relative rounded-2xl overflow-hidden aspect-3/4 bg-slate-800 border border-slate-700/60 shadow-md group"
                  >
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        isSubscribed ? 'blur-none' : 'blur-md brightness-75 scale-105'
                      }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    <div className="absolute bottom-2 left-2 right-2 text-white">
                      <h4 className="text-xs font-bold truncate">
                        {isSubscribed ? `${profile.name}, ${profile.age}` : 'Secret Admirer'}
                      </h4>
                      <p className="text-[10px] text-slate-300 truncate">
                        {profile.city} • {profile.distanceKm} km
                      </p>

                      {isSubscribed ? (
                        <button
                          onClick={() => onInstantMatchFromLikes(profile)}
                          className="w-full mt-2 py-1 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white text-[11px] font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1"
                        >
                          <Heart className="w-3 h-3 fill-white" />
                          <span>Match Now</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setTab('plans')}
                          className="w-full mt-2 py-1 rounded-xl bg-amber-400 text-slate-950 text-[10px] font-extrabold shadow-xs active:scale-95 transition-all"
                        >
                          Unblur with Gold
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
