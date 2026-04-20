import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";

const buyers = [
  { name: "Jessica M.", location: "Austin, TX", time: "2 minutes ago" },
  { name: "Darnell R.", location: "Atlanta, GA", time: "5 minutes ago" },
  { name: "Sophie L.", location: "London, UK", time: "8 minutes ago" },
  { name: "Marcus T.", location: "Toronto, CA", time: "11 minutes ago" },
  { name: "Priya K.", location: "Houston, TX", time: "14 minutes ago" },
  { name: "Tyler B.", location: "Phoenix, AZ", time: "17 minutes ago" },
  { name: "Amara O.", location: "Chicago, IL", time: "22 minutes ago" },
  { name: "Liam W.", location: "Melbourne, AU", time: "25 minutes ago" },
  { name: "Fatima H.", location: "Dubai, UAE", time: "31 minutes ago" },
  { name: "Carlos M.", location: "Miami, FL", time: "35 minutes ago" },
  { name: "Hannah P.", location: "Seattle, WA", time: "40 minutes ago" },
  { name: "David K.", location: "New York, NY", time: "45 minutes ago" },
];

export default function PurchasePopup() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const showNext = useCallback(() => {
    if (dismissed) return;
    setCurrent((prev) => (prev + 1) % buyers.length);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 5000);
  }, [dismissed]);

  useEffect(() => {
    // Show first popup after 4s
    const initial = setTimeout(() => {
      showNext();
    }, 4000);

    // Then cycle every 18s
    const interval = setInterval(() => {
      showNext();
    }, 18000);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, [showNext]);

  const buyer = buyers[current];

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          key={current}
          initial={{ opacity: 0, x: -80, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-3 sm:bottom-6 left-3 sm:left-6 z-[9999] w-[calc(100vw-1.5rem)] max-w-[300px]"
        >
          <div className="relative bg-[#0d1524] border border-blue-500/30 rounded-2xl p-4 shadow-[0_8px_32px_rgba(37,99,235,0.25)] backdrop-blur-xl flex items-start gap-3">
            {/* Dismiss button */}
            <button
              onClick={() => setVisible(false)}
              className="absolute top-2 right-2 text-white/30 hover:text-white/70 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Icon */}
            <div className="shrink-0 w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.4)]">
              <ShoppingBag className="w-5 h-5 text-blue-400" />
            </div>

            {/* Content */}
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold leading-snug">
                {buyer.name} <span className="text-blue-400">just purchased</span>
              </p>
              <p className="text-white/60 text-xs mt-0.5 truncate">
                Content Flow Hub – Digital Vault
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-white/40 text-xs">{buyer.location}</span>
                <span className="text-white/20 text-xs">·</span>
                <span className="text-white/40 text-xs">{buyer.time}</span>
              </div>
            </div>

            {/* Live indicator */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] text-white/30">live</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
