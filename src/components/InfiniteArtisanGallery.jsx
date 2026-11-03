import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Pause, 
  Play, 
  Heart,
  Eye
} from 'lucide-react';

export const GALLERY_ITEMS = [
  {
    id: 'gallery-pottery',
    artisanName: 'Rameshwar Prajapati',
    craftCategory: 'Pottery & Clay Sculpting',
    location: 'Gorakhpur, Uttar Pradesh',
    badge: 'GI Registered #GI-182',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
    tagline: 'Centuries-old terracotta wheel and wood kiln craftsmanship',
    link: '/artisan/artisan-2'
  },
  {
    id: 'gallery-handloom',
    artisanName: 'Lakshmi Devi',
    craftCategory: 'Handloom & Zari Weaving',
    location: 'Chanderi, Madhya Pradesh',
    badge: 'Master Weaver Certified',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
    tagline: 'Royal pit-loom silk sarees with pure silver electroplated zari',
    link: '/artisan/artisan-1'
  },
  {
    id: 'gallery-embroidery',
    artisanName: 'Fatima Begum',
    craftCategory: 'Heritage Chikankari & Zardozi',
    location: 'Lucknow, Uttar Pradesh',
    badge: 'Women SHG Leader',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    tagline: 'Intricate 32-stitch needle shadow work and gold wire embroidery',
    link: '/artisan/artisan-3'
  },
  {
    id: 'gallery-woodcraft',
    artisanName: 'Kishanlal Suthar',
    craftCategory: 'Channapatna Wooden Toys',
    location: 'Channapatna, Karnataka',
    badge: 'GI Tag #GI-19',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    tagline: 'Non-toxic natural vegetable dye wooden lacquerware lathe toys',
    link: '/artisan/artisan-4'
  },
  {
    id: 'gallery-jewellery',
    artisanName: 'Sunita Meena',
    craftCategory: 'Handmade Jewellery & Meenakari',
    location: 'Jaipur, Rajasthan',
    badge: 'Jewellers Guild Accredited',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    tagline: 'Miniature fire-enameling and Kundan gemstone setting on silver',
    link: '/artisan/artisan-5'
  },
  {
    id: 'gallery-workshop',
    artisanName: 'Subhash Chitrakar',
    craftCategory: 'Traditional Pattachitra Workshop',
    location: 'Raghurajpur Village, Odisha',
    badge: 'Living Heritage Custodian',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    tagline: 'Palm-leaf scroll engraving using stone minerals and conch pigments',
    link: '/artisan/artisan-6'
  },
  {
    id: 'gallery-pashmina',
    artisanName: 'Mohammad Rafiq',
    craftCategory: 'Kani Shawl & Pashmina Weaving',
    location: 'Srinagar, Jammu & Kashmir',
    badge: 'Crafts Council Gold Honoree',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    tagline: 'High-altitude Changthangi cashmere woven with wooden eyed needles',
    link: '/artisan/artisan-7'
  },
  {
    id: 'gallery-rogan',
    artisanName: 'Kankuben Vankar',
    craftCategory: 'Rogan Painting & Kala Cotton',
    location: 'Nirona, Kutch, Gujarat',
    badge: 'Rare Heritage Art Form',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    tagline: 'Castor oil paste drawn with a stylus into intricate raised textiles',
    link: '/artisan/artisan-8'
  }
];

export const InfiniteArtisanGallery = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items twice to ensure a seamless -50% loop with zero jumps or blank spots
  const marqueeItems = [...GALLERY_ITEMS, ...GALLERY_ITEMS];

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-transparent via-[#F5EFE4]/60 to-transparent">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#D5B46A]/40 text-[#C7794A] text-xs font-bold mb-2 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="uppercase tracking-widest text-[10px]">Living Heritage Showcase</span>
              <span className="text-[#D5B46A]">•</span>
              <span className="text-[#173B35]">Continuous Craft Stream</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B35] leading-tight">
              India’s Traditional Mastercrafts
            </h2>
            <p className="text-xs sm:text-sm text-[#263B36]/80 max-w-2xl mt-1">
              Explore authentic pottery, handloom, embroidery, lacquer woodcraft, and handmade jewellery directly from rural Indian artisan clusters.
            </p>
          </div>

          {/* Quick Interaction Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#D5B46A]/40 text-[#173B35] text-xs font-bold hover:bg-[#FAF6F0] transition-colors shadow-2xs"
              title={isPaused ? "Resume auto-scrolling" : "Pause auto-scrolling"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#C7794A]" /> : <Pause className="w-3.5 h-3.5 text-[#C7794A]" />}
              <span>{isPaused ? 'Resume Scroll' : 'Pause Scroll'}</span>
            </button>

            <Link
              to="/explore"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C7794A] hover:bg-[#B56738] text-white text-xs font-bold transition-all shadow-xs"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Marquee Track Container */}
      <div 
        className="relative w-full overflow-hidden group pause-on-hover py-4"
        style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
      >
        {/* Left Edge Gradient Vignette */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F5EFE4] to-transparent z-10 pointer-events-none" />

        {/* Right Edge Gradient Vignette */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F5EFE4] to-transparent z-10 pointer-events-none" />

        {/* Moving Marquee Track */}
        <div 
          className="animate-marquee-infinite flex gap-6 sm:gap-8 px-4"
          style={isPaused ? { animationPlayState: 'paused' } : undefined}
        >
          {marqueeItems.map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              to={item.link}
              className="group/card relative w-[310px] sm:w-[380px] h-[260px] sm:h-[310px] rounded-3xl overflow-hidden shrink-0 shadow-warm hover:shadow-warm-lg border border-[#D5B46A]/35 transition-all duration-300 block focus:outline-hidden focus:ring-2 focus:ring-[#C7794A]"
            >
              {/* Background Image with Hover Zoom */}
              <img
                src={item.image}
                alt={`${item.artisanName} - ${item.craftCategory}`}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover/card:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Layered Gradient Scrim for optimal readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2622] via-[#173B35]/40 to-black/20 group-hover/card:via-[#173B35]/30 transition-all duration-300" />

              {/* Top Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#173B35]/90 text-[#FAF6F0] backdrop-blur-md border border-[#D5B46A]/30 shadow-xs truncate max-w-[190px]">
                  {item.craftCategory}
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FAF6F0]/95 text-[#173B35] backdrop-blur-md shadow-xs shrink-0">
                  <ShieldCheck className="w-3 h-3 text-[#C7794A]" />
                  {item.badge}
                </span>
              </div>

              {/* Bottom Information Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1.5 text-white">
                <div className="flex items-center gap-1 text-[11px] text-[#D5B46A] font-medium drop-shadow-xs">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{item.location}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight drop-shadow-md text-white group-hover/card:text-[#D5B46A] transition-colors">
                  {item.artisanName}
                </h3>

                <p className="text-[11px] text-[#FAF6F0]/85 line-clamp-2 leading-relaxed font-normal">
                  {item.tagline}
                </p>

                {/* View Details Pill */}
                <div className="pt-2 flex items-center justify-between border-t border-white/15">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#D5B46A] flex items-center gap-1">
                    <span>Explore Profile</span>
                    <ArrowRight className="w-3 h-3 group-hover/card:translate-x-1 transition-transform" />
                  </span>

                  <span className="text-[10px] font-medium text-[#FAF6F0]/70 flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Marquee Caption Indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex items-center justify-between text-[11px] text-[#263B36]/65">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Continuous auto-scroll active (Hover over any card to pause & inspect)</span>
        </span>
        <span className="hidden sm:inline font-mono">
          8 Living Craft Traditions • 100% Direct Verification
        </span>
      </div>

    </section>
  );
};
