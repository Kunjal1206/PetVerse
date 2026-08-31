import React, { useState, useRef, useEffect } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { Bell, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationDropdown = () => {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl text-charcoal-700 hover:bg-cream-200 hover:text-brand-800 transition-colors focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-cream-300 py-3 z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 pb-3 border-b border-cream-200">
              <div className="flex items-center gap-2">
                <span className="font-display font-semibold text-charcoal-900 text-sm">Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-brand-100 text-brand-700 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-cream-100">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-charcoal-400 text-xs">
                  No notifications yet.
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3.5 hover:bg-cream-50 transition-colors flex items-start justify-between gap-3 ${
                      !n.read ? 'bg-brand-50/40' : ''
                    }`}
                  >
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-charcoal-900">{n.title}</p>
                      <p className="text-xs text-charcoal-600 mt-0.5 leading-relaxed">{n.message}</p>
                      <p className="text-[10px] text-charcoal-400 mt-1">
                        {new Date(n.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {!n.read && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        className="p-1 text-brand-600 hover:bg-brand-100 rounded-lg transition-colors shrink-0"
                        title="Mark as read"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
