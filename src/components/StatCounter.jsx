import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';

export const StatCounter = ({ value, prefix = '', suffix = '', label, subtext, icon: Icon, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Extract number from string if provided like '4850000' or '520'
  const numericValue = typeof value === 'number' ? value : parseFloat(value.toString().replace(/[^0-9.]/g, ''));
  
  const spring = useSpring(0, { mass: 0.8, stiffness: 60, damping: 14 });
  const display = useTransform(spring, (current) => {
    if (numericValue >= 100000) {
      return Math.round(current).toLocaleString('en-IN');
    }
    return Math.round(current);
  });

  const [renderedValue, setRenderedValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      spring.set(numericValue);
    }
  }, [isInView, numericValue, spring]);

  useEffect(() => {
    const unsubscribe = display.on('change', (latest) => {
      setRenderedValue(latest);
    });
    return () => unsubscribe();
  }, [display]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#D5B46A]/35 shadow-warm hover:shadow-warm-lg transition-all duration-300 relative group overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#D5B46A]/15 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
      
      <div className="flex items-center justify-between mb-4">
        {Icon && (
          <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] border border-[#D5B46A]/30 flex items-center justify-center text-[#C7794A] group-hover:scale-110 group-hover:bg-[#173B35] group-hover:text-[#D5B46A] transition-all duration-300 shadow-2xs">
            <Icon className="w-6 h-6" />
          </div>
        )}
        <span className="text-[10px] font-bold text-[#C7794A] uppercase tracking-wider bg-[#C7794A]/10 px-2.5 py-1 rounded-full border border-[#C7794A]/20">
          Verified
        </span>
      </div>

      <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#173B35] tracking-tight flex items-baseline">
        <span>{prefix}</span>
        <span className="tabular-nums">{renderedValue}</span>
        <span>{suffix}</span>
      </div>

      <div className="text-sm font-bold text-[#263B36] mt-1.5">
        {label}
      </div>

      {subtext && (
        <div className="text-xs text-[#263B36]/65 mt-0.5">
          {subtext}
        </div>
      )}
    </motion.div>
  );
};
