import { useState, useMemo } from 'react';
import { GlassCard } from './GlassCard';
import { Modal } from './Modal';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import {
  User,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Bell,
  Shield,
  Globe,
  Moon,
  LogOut,
  ChevronRight,
  Award,
  Clock,
  CheckCircle,
  Sun,
} from 'lucide-react';
import { districts } from '../data/districts';
import { constituencies } from '../data/constituencies';

interface ProfileScreenProps {
  darkMode?: boolean;
  onDarkModeChange?: (mode: boolean) => void;
}

export function ProfileScreen({ darkMode = true, onDarkModeChange }: ProfileScreenProps = {}) {
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [showActiveSessions, setShowActiveSessions] = useState(false);
  const [showAadhaarLink, setShowAadhaarLink] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [language, setLanguage] = useState('English');
  const [notificationSettings, setNotificationSettings] = useState({
    alerts: true,
    bills: true,
    updates: true,
    schemes: false,
  });
  const [personalInfo, setPersonalInfo] = useState({
    name: 'karthick',
    phone: '+91 98765 43210',
    email: 'karthick@future.tn.gov.in',
    address: 'Anna Nagar, Chennai - 600040, Tamil Nadu',
    dob: '15 August 1995',
    gender: 'Male',
    district: 'Chennai',
    constituency: 'Anna Nagar',
  });
  const [editingInfo, setEditingInfo] = useState({
    name: 'karthick',
    phone: '+91 98765 43210',
    email: 'karthick@future.tn.gov.in',
    address: 'Anna Nagar, Chennai - 600040, Tamil Nadu',
    dob: '15 August 1995',
    gender: 'Male',
    district: 'Chennai',
    constituency: 'Anna Nagar',
  });
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [aadhaarOtp, setAadhaarOtp] = useState('');
  const [aadhaarStep, setAadhaarStep] = useState<'input' | 'otp'>('input');

  const profileStats = [
    { icon: CheckCircle, label: 'Services Used', value: '24', color: 'text-green-400' },
    { icon: Clock, label: 'Pending', value: '3', color: 'text-yellow-400' },
    { icon: Award, label: 'Trust Score', value: '95/100', color: 'text-purple-400' },
  ];

  const handleDarkModeToggle = () => {
    const newMode = !darkMode;
    onDarkModeChange?.(newMode);
  };

  const menuItems = [
    { icon: User, label: 'Personal Info', labelTa: 'தனிப்பட்ட தகவல்', action: () => setShowPersonalInfo(true) },
    { icon: CreditCard, label: 'Aadhaar Linked', labelTa: 'ஆதார் இணைப்பு', verified: true, action: () => setShowAadhaarLink(true) },
    { icon: Bell, label: 'Notifications', labelTa: 'அறிவிப்புகள்', badge: '5', action: () => setShowNotifications(true) },
    { icon: Shield, label: 'Security & Privacy', labelTa: 'பாதுகாப்பு', action: () => setShowSecurity(true) },
    { icon: Globe, label: 'Language', labelTa: 'மொழி', value: language, action: () => setShowLanguage(true) },
    { icon: darkMode ? Moon : Sun, label: 'Dark Mode', labelTa: 'இருண்ட பயன்முறை', toggle: true, action: handleDarkModeToggle },
  ];

  const handleLogout = () => {
    toast.success('Logout Successful 🚪', {
      description: 'Thank you for using TN Digital services! வணக்கம்',
      duration: 3000,
    });
  };

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <GlassCard className="relative overflow-hidden">
          <div 
            className={darkMode ? 'absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-purple-600/20' : 'absolute inset-0'}
            style={!darkMode ? { backgroundColor: '#eff6ff' } : {}}
          />
          <div className="relative z-10 flex items-center gap-4">
            <div 
              className={darkMode ? 'w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center' : 'w-20 h-20 rounded-full flex items-center justify-center'}
              style={!darkMode ? { backgroundColor: '#3b82f6' } : {}}
            >
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-white mb-1">karthick</h2>
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Phone className="w-3 h-3" />
                <span style={{ fontSize: '12px' }}>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <MapPin className="w-3 h-3" />
                <span style={{ fontSize: '12px' }}>Chennai, Tamil Nadu</span>
              </div>
              <div className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded-full inline-block" style={{ fontSize: '11px' }}>
                Future TN Citizen
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
        {profileStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard>
                <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <div className={`mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-gray-400" style={{ fontSize: '11px' }}>
                  {stat.label}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <h3 className="text-white mb-3">Account Settings</h3>
        <div className="space-y-3">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
              >
                <GlassCard className="cursor-pointer" onClick={item.action}>
                  <div className="flex items-center gap-3">
                    <div 
                      className={darkMode ? 'w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center' : 'w-10 h-10 rounded-lg flex items-center justify-center'}
                      style={!darkMode ? { backgroundColor: '#eff6ff' } : {}}
                    >
                      <Icon className={darkMode ? 'w-5 h-5 text-purple-400' : 'w-5 h-5 text-blue-600'} />
                    </div>
                    <div className="flex-1">
                      <div className="text-white mb-1">{item.label}</div>
                      <div className="text-gray-400" style={{ fontSize: '11px' }}>
                        {item.labelTa}
                      </div>
                    </div>
                    {item.verified && (
                      <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full" style={{ fontSize: '11px' }}>
                        Verified
                      </div>
                    )}
                    {item.badge && (
                      <div className="bg-red-500 text-white px-2 py-1 rounded-full" style={{ fontSize: '11px' }}>
                        {item.badge}
                      </div>
                    )}
                    {item.value && (
                      <span className="text-gray-400" style={{ fontSize: '12px' }}>
                        {item.value}
                      </span>
                    )}
                    {item.toggle ? (
                      <div className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${darkMode ? 'bg-purple-600' : 'bg-sky-500'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${darkMode ? 'ml-auto' : 'ml-0'}`} />
                      </div>
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <GlassCard className="cursor-pointer" onClick={handleLogout}>
          <div className="flex items-center gap-3 text-red-400">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
            <span className="text-gray-400" style={{ fontSize: '12px' }}>
              வெளியேறு
            </span>
          </div>
        </GlassCard>
      </motion.div>

      {/* Personal Info Modal */}
      <Modal isOpen={showPersonalInfo} onClose={() => setShowPersonalInfo(false)} title="Personal Information" darkMode={darkMode}>
        <div className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Full Name</label>
              <input
                type="text"
                value={editingInfo.name}
                onChange={(e) => setEditingInfo({ ...editingInfo, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Phone Number</label>
              <input
                type="text"
                value={editingInfo.phone}
                onChange={(e) => setEditingInfo({ ...editingInfo, phone: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Email Address</label>
              <input
                type="email"
                value={editingInfo.email}
                onChange={(e) => setEditingInfo({ ...editingInfo, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Address</label>
              <textarea
                value={editingInfo.address}
                onChange={(e) => setEditingInfo({ ...editingInfo, address: e.target.value })}
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500 resize-none"
              />
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Date of Birth</label>
              <input
                type="text"
                value={editingInfo.dob}
                onChange={(e) => setEditingInfo({ ...editingInfo, dob: e.target.value })}
                placeholder="DD Month YYYY"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Gender</label>
              <select
                value={editingInfo.gender}
                onChange={(e) => setEditingInfo({ ...editingInfo, gender: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>District</label>
              <select
                value={editingInfo.district}
                onChange={(e) => setEditingInfo({ ...editingInfo, district: e.target.value, constituency: '' })}
                className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
                style={{ backgroundColor: '#0a0a1a' }}
              >
                <option value="" style={{ backgroundColor: '#0a0a1a' }}>Select District</option>
                {districts.map(d => (
                  <option key={d.id} value={d.name} style={{ backgroundColor: '#0a0a1a' }}>{d.name} — {d.nameTa}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Constituency</label>
              <select
                value={editingInfo.constituency}
                onChange={(e) => setEditingInfo({ ...editingInfo, constituency: e.target.value })}
                className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
                style={{ backgroundColor: '#0a0a1a' }}
                disabled={!editingInfo.district}
              >
                <option value="" style={{ backgroundColor: '#0a0a1a' }}>Select Constituency</option>
                {constituencies
                  .filter(c => c.district === editingInfo.district)
                  .map(c => (
                    <option key={c.id} value={c.name} style={{ backgroundColor: '#0a0a1a' }}>{c.name}</option>
                  ))
                }
              </select>
              {!editingInfo.district && (
                <p className="text-gray-500 mt-1" style={{ fontSize: '11px' }}>Select a district first</p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => {
                setEditingInfo(personalInfo);
                setShowPersonalInfo(false);
              }}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                setPersonalInfo(editingInfo);
                setShowPersonalInfo(false);
                toast.success('Profile Updated ✅', {
                  description: 'Your personal information has been saved',
                  duration: 3000,
                });
              }}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg px-4 py-3 text-white hover:shadow-lg transition-shadow"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Notifications Modal */}
      <Modal isOpen={showNotifications} onClose={() => setShowNotifications(false)} title="Notification Settings" darkMode={darkMode}>
        <div className="space-y-4">
          <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
            <p className="text-white mb-2" style={{ fontSize: '12px' }}>Manage your notification preferences</p>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>You have 5 unread notifications</p>
          </div>

          <div className="space-y-3">
            {[
              { key: 'alerts', label: 'Emergency Alerts', desc: 'Critical updates and warnings' },
              { key: 'bills', label: 'Bill Reminders', desc: 'Payment due notifications' },
              { key: 'updates', label: 'Service Updates', desc: 'New features and improvements' },
              { key: 'schemes', label: 'Scheme Notifications', desc: 'New government schemes' },
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex-1">
                  <div className="text-white mb-1">{setting.label}</div>
                  <div className="text-gray-400" style={{ fontSize: '11px' }}>{setting.desc}</div>
                </div>
                <div
                  onClick={() =>
                    setNotificationSettings({
                      ...notificationSettings,
                      [setting.key]: !notificationSettings[setting.key as keyof typeof notificationSettings],
                    })
                  }
                  className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors cursor-pointer ${
                    notificationSettings[setting.key as keyof typeof notificationSettings]
                      ? (darkMode ? 'bg-purple-600' : 'bg-sky-500')
                      : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      notificationSettings[setting.key as keyof typeof notificationSettings] ? 'ml-auto' : 'ml-0'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowNotifications(false)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg px-4 py-3 text-white hover:shadow-lg transition-shadow"
          >
            Save Preferences
          </button>
        </div>
      </Modal>

      {/* Security & Privacy Modal */}
      <Modal isOpen={showSecurity} onClose={() => setShowSecurity(false)} title="Security & Privacy" darkMode={darkMode}>
        <div className="space-y-4">
          <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-400 mb-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Account is Secure</span>
            </div>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>
              Last login: Today at 10:30 AM from Chennai
            </p>
          </div>

          <div className="space-y-3">
            <GlassCard className="cursor-pointer hover:bg-white/10 transition-colors" onClick={() => setShowChangePassword(true)}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white mb-1">Change Password</div>
                  <div className="text-gray-400" style={{ fontSize: '11px' }}>Update your password</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </GlassCard>

            <GlassCard className="cursor-pointer hover:bg-white/10 transition-colors" onClick={() => setShowTwoFactor(true)}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white mb-1">Two-Factor Authentication</div>
                  <div className="text-gray-400" style={{ fontSize: '11px' }}>Add extra security</div>
                </div>
                <div
                  className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                    twoFactorEnabled
                      ? (darkMode ? 'bg-purple-600' : 'bg-sky-500')
                      : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${twoFactorEnabled ? 'ml-auto' : 'ml-0'}`} />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="cursor-pointer hover:bg-white/10 transition-colors" onClick={() => setShowActiveSessions(true)}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white mb-1">Active Sessions</div>
                  <div className="text-gray-400" style={{ fontSize: '11px' }}>Manage logged-in devices</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </GlassCard>

            <GlassCard
              className="cursor-pointer hover:bg-white/10 transition-colors"
              onClick={() => toast.info('Privacy Policy 📄', {
                description: 'Your data is encrypted • GDPR compliant • No third-party sharing',
                duration: 4000,
              })}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white mb-1">Privacy Policy</div>
                  <div className="text-gray-400" style={{ fontSize: '11px' }}>Read our privacy policy</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </GlassCard>
          </div>
        </div>
      </Modal>

      {/* Language Modal */}
      <Modal isOpen={showLanguage} onClose={() => setShowLanguage(false)} title="Select Language" darkMode={darkMode}>
        <div className="space-y-4">
          <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
            <p className="text-white mb-1" style={{ fontSize: '12px' }}>Choose your preferred language</p>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்</p>
          </div>

          <div className="space-y-2">
            {[
              { code: 'English', name: 'English', native: 'English' },
              { code: 'Tamil', name: 'Tamil', native: 'தமிழ்' },
            ].map((lang) => (
              <label
                key={lang.code}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  language === lang.code ? 'bg-purple-600/20 border-purple-500' : 'bg-white/5 border-white/10'
                }`}
              >
                <input
                  type="radio"
                  name="language"
                  value={lang.code}
                  checked={language === lang.code}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <div className="text-white">{lang.name}</div>
                  <div className="text-gray-400" style={{ fontSize: '11px' }}>{lang.native}</div>
                </div>
              </label>
            ))}
          </div>

          <button
            onClick={() => {
              setShowLanguage(false);
              toast.success('Language Updated ✅', {
                description: `Preferred language set to ${language}`,
                duration: 3000,
              });
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg px-4 py-3 text-white hover:shadow-lg transition-shadow"
          >
            Save Language
          </button>
        </div>
      </Modal>

      {/* Change Password Modal */}
      <Modal isOpen={showChangePassword} onClose={() => setShowChangePassword(false)} title="Change Password" darkMode={darkMode}>
        <div className="space-y-4">
          <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
            <p className="text-white mb-1" style={{ fontSize: '12px' }}>Update your password</p>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>Choose a strong password with 8+ characters</p>
          </div>

          <div>
            <label className="text-white mb-2 block">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-white mb-2 block">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-white mb-2 block">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setShowChangePassword(false)}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowChangePassword(false);
                toast.success('Password Changed ✅', {
                  description: 'Your password has been updated successfully',
                  duration: 3000,
                });
              }}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg px-4 py-3 text-white hover:shadow-lg transition-shadow"
            >
              Change Password
            </button>
          </div>
        </div>
      </Modal>

      {/* Two-Factor Authentication Modal */}
      <Modal isOpen={showTwoFactor} onClose={() => setShowTwoFactor(false)} title="Two-Factor Authentication" darkMode={darkMode}>
        <div className="space-y-4">
          <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
            <p className="text-white mb-1" style={{ fontSize: '12px' }}>Add extra security to your account</p>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>
              {twoFactorEnabled ? '2FA is currently enabled' : 'Protect your account with 2FA'}
            </p>
          </div>

          {!twoFactorEnabled ? (
            <>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center">
                    <span className="text-purple-400">1</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-white mb-1" style={{ fontSize: '12px' }}>Install Authenticator App</div>
                    <div className="text-gray-400" style={{ fontSize: '11px' }}>Google Authenticator or Authy</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center">
                    <span className="text-purple-400">2</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-white mb-1" style={{ fontSize: '12px' }}>Scan QR Code</div>
                    <div className="text-gray-400" style={{ fontSize: '11px' }}>Link your account to the app</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center">
                    <span className="text-purple-400">3</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-white mb-1" style={{ fontSize: '12px' }}>Enter Verification Code</div>
                    <div className="text-gray-400" style={{ fontSize: '11px' }}>From your authenticator app</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setTwoFactorEnabled(true);
                  setShowTwoFactor(false);
                  toast.success('2FA Enabled ✅', {
                    description: 'Two-factor authentication is now active',
                    duration: 3000,
                  });
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg px-4 py-3 text-white hover:shadow-lg transition-shadow"
              >
                Enable 2FA
              </button>
            </>
          ) : (
            <>
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">2FA is Active</span>
                </div>
                <p className="text-gray-400" style={{ fontSize: '11px' }}>
                  Your account is protected with two-factor authentication
                </p>
              </div>

              <button
                onClick={() => {
                  setTwoFactorEnabled(false);
                  setShowTwoFactor(false);
                  toast.warning('2FA Disabled ⚠️', {
                    description: 'Your account security has been reduced',
                    duration: 3000,
                  });
                }}
                className="w-full bg-red-600 rounded-lg px-4 py-3 text-white hover:shadow-lg transition-shadow"
              >
                Disable 2FA
              </button>
            </>
          )}
        </div>
      </Modal>

      {/* Active Sessions Modal */}
      <Modal isOpen={showActiveSessions} onClose={() => setShowActiveSessions(false)} title="Active Sessions" darkMode={darkMode}>
        <div className="space-y-4">
          <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
            <p className="text-white mb-1" style={{ fontSize: '12px' }}>Manage your logged-in devices</p>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>You can log out from other devices remotely</p>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-white mb-1">iPhone 13 Pro</div>
                    <div className="text-gray-400" style={{ fontSize: '11px' }}>Chennai, Tamil Nadu</div>
                  </div>
                </div>
                <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full" style={{ fontSize: '11px' }}>
                  Current
                </div>
              </div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>
                Last active: Now • IP: 103.21.*.***
              </div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white mb-1">Chrome on Windows</div>
                    <div className="text-gray-400" style={{ fontSize: '11px' }}>Chennai, Tamil Nadu</div>
                  </div>
                </div>
                <button className="text-red-400 hover:text-red-300 transition-colors" style={{ fontSize: '11px' }}>
                  Logout
                </button>
              </div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>
                Last active: 2 hours ago • IP: 103.21.*.***
              </div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white mb-1">Safari on MacBook</div>
                    <div className="text-gray-400" style={{ fontSize: '11px' }}>Mumbai, Maharashtra</div>
                  </div>
                </div>
                <button className="text-red-400 hover:text-red-300 transition-colors" style={{ fontSize: '11px' }}>
                  Logout
                </button>
              </div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>
                Last active: Yesterday • IP: 117.*.*.***
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setShowActiveSessions(false);
              toast.success('Sessions Logged Out 🚪', {
                description: 'All other devices have been logged out',
                duration: 3000,
              });
            }}
            className="w-full bg-red-600 rounded-lg px-4 py-3 text-white hover:shadow-lg transition-shadow"
          >
            Logout All Other Devices
          </button>
        </div>
      </Modal>

      {/* Aadhaar Link Modal */}
      <Modal isOpen={showAadhaarLink} onClose={() => setShowAadhaarLink(false)} title="Link Aadhaar" darkMode={darkMode}>
        <div className="space-y-4">
          <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
            <p className="text-white mb-1" style={{ fontSize: '12px' }}>Link your Aadhaar to your account</p>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>Enter your Aadhaar number to link</p>
          </div>

          {aadhaarStep === 'input' ? (
            <div className="space-y-3">
              <div>
                <label className="text-white mb-2 block">Aadhaar Number</label>
                <input
                  type="text"
                  placeholder="Enter 12-digit Aadhaar number"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500"
                />
              </div>
              <button
                onClick={() => {
                  if (aadhaarNumber.length === 12) {
                    setAadhaarStep('otp');
                    toast.success('OTP Sent 📱', {
                      description: 'Please check your registered mobile number',
                      duration: 3000,
                    });
                  } else {
                    toast.error('Invalid Aadhaar Number ❌', {
                      description: 'Please enter a valid 12-digit Aadhaar number',
                      duration: 3000,
                    });
                  }
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg px-4 py-3 text-white hover:shadow-lg transition-shadow"
              >
                Send OTP
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="text-white mb-2 block">Enter OTP</label>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={aadhaarOtp}
                  onChange={(e) => setAadhaarOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setAadhaarStep('input');
                    setAadhaarOtp('');
                  }}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (aadhaarOtp.length === 6) {
                      toast.success('Aadhaar Linked ✅', {
                        description: 'Your Aadhaar number has been linked successfully',
                        duration: 3000,
                      });
                      setShowAadhaarLink(false);
                      setAadhaarStep('input');
                      setAadhaarNumber('');
                      setAadhaarOtp('');
                    } else {
                      toast.error('Invalid OTP ❌', {
                        description: 'Please enter a valid 6-digit OTP',
                        duration: 3000,
                      });
                    }
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg px-4 py-3 text-white hover:shadow-lg transition-shadow"
                >
                  Verify OTP
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}