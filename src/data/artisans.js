export const CRAFT_CATEGORIES = [
  'All',
  'Handloom',
  'Pottery',
  'Embroidery',
  'Woodcraft',
  'Handmade Jewellery',
  'Traditional Crafts'
];

export const ARTISANS_DATA = [
  {
    id: 'artisan-1',
    name: 'Lakshmi Devi',
    age: 44,
    location: 'Chanderi, Madhya Pradesh',
    state: 'Madhya Pradesh',
    craft: 'Chanderi Silk & Zari Weaving',
    category: 'Handloom',
    experience: '26 years',
    familyHeritage: '4th Generation Weaver',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    craftImage: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Master weaver preserving royal GI-tagged Chanderi silk with gold zari motifs on traditional pit looms.',
    fullStory: 'Lakshmi Devi has spent over two decades mastering the delicate rhythm of the hand-operated pit loom in Chanderi. Traditionally, weavers like Lakshmi depend on local moneylenders and sahukars who charge over 36% annual interest for raw silk yarn advances, taking up to 70% of the saree\'s final retail margin. Through KarigarConnect\'s zero-middlemen micro-loan, Lakshmi aims to procure pure Mulberry silk warp and silver electroplated zari in bulk, doubling her household income and training 4 younger village girls.',
    fundingGoal: 40000,
    amountRaised: 33500,
    backersCount: 29,
    loanTermMonths: 6,
    monthlyRepayment: 6667,
    interestRate: 0,
    repaymentStatus: 'On Schedule (2 of 6 paid)',
    repaymentProgressPercent: 33,
    verified: true,
    verificationBadge: 'GI Registered & Master Craftsperson Certified',
    smartContractAddress: '0x71C...49bE',
    useOfFunds: [
      { item: 'Bulk Pure Mulberry Silk Yarn (Grade A)', percentage: 55, amount: 22000 },
      { item: 'High-Purity Tested Silver Zari Bobbins', percentage: 25, amount: 10000 },
      { item: 'Pit-Loom Reed & Harness Repair', percentage: 10, amount: 4000 },
      { item: 'Direct Exhibition & Packaging Kit', percentage: 10, amount: 4000 }
    ],
    repaymentTerms: {
      schedule: 'Monthly flexible installments over 6 months',
      gracePeriod: '15-day harvest grace window',
      collateral: 'Zero collateral — Community peer-staked',
      middlemanSavings: 'Artisan retains 92% of market value (vs 28% previously)'
    },
    communityImpact: 'Mentors 6 apprentice women; supports education of 2 teenage daughters in college.',
    rating: 4.9,
    reviewsCount: 38
  },
  {
    id: 'artisan-2',
    name: 'Rameshwar Prajapati',
    age: 51,
    location: 'Gorakhpur, Uttar Pradesh',
    state: 'Uttar Pradesh',
    craft: 'GI-Tagged Terracotta Clay Sculptures',
    category: 'Pottery',
    experience: '32 years',
    familyHeritage: '5th Generation Potter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    craftImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Sculpting ornate terracotta temple bells, horses, and clay cookware with centuries-old pit-kiln techniques.',
    fullStory: 'Rameshwar comes from Aurangabad village near Gorakhpur, the cradle of terracotta artistry where figures are handcrafted without molds. For generations, traditional potters faced severe seasonal dampness and smoke inhalation from rudimentary wood kilns. Rameshwar is raising a micro-loan to install a smokeless electric potter\'s wheel and energy-efficient kilns, allowing him to work year-round and create high-strength decorative sculptures for architectural interiors.',
    fundingGoal: 25000,
    amountRaised: 22000,
    backersCount: 22,
    loanTermMonths: 4,
    monthlyRepayment: 6250,
    interestRate: 0,
    repaymentStatus: 'On Schedule (1 of 4 paid)',
    repaymentProgressPercent: 25,
    verified: true,
    verificationBadge: 'GI Tag Holder #GI-182',
    smartContractAddress: '0x88A...12eC',
    useOfFunds: [
      { item: 'Variable-Speed Electric Wheel', percentage: 50, amount: 12500 },
      { item: 'Refractory Bricks for Energy Kiln', percentage: 30, amount: 7500 },
      { item: 'Fine River Bed Alluvial Clay Stock', percentage: 20, amount: 5000 }
    ],
    repaymentTerms: {
      schedule: 'Quarterly cycle aligned with Diwali & harvest peaks',
      gracePeriod: '30-day monsoon dry window',
      collateral: 'Zero collateral',
      middlemanSavings: 'Eliminates 5 intermediate wholesale brokers'
    },
    communityImpact: 'Eliminated firewood smoke emissions; trains 12 youth in mold-free clay sculpting.',
    rating: 4.85,
    reviewsCount: 26
  },
  {
    id: 'artisan-3',
    name: 'Fatima Begum',
    age: 39,
    location: 'Lucknow, Uttar Pradesh',
    state: 'Uttar Pradesh',
    craft: 'Heritage Chikankari & Zardozi Shadow Work',
    category: 'Embroidery',
    experience: '19 years',
    familyHeritage: '3rd Generation Embroiderer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    craftImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Leading a rural women\'s cluster practicing intricate 32-stitch Chikankari embroidery and authentic Zardozi.',
    fullStory: 'In the outskirts of Lucknow, Fatima has gathered 14 home-based women artisans who previously received meager daily wages (less than ₹120/day) from garment middlemen. With KarigarConnect, Fatima\'s self-help group receives upfront capital to purchase pure voile, organza, and metallic coils (salma-sitara) in bulk. This enables her cluster to produce customized designer bridal dupattas and kurtas, paying each artisan fair living wages of ₹600/day directly to their UPI-enabled accounts.',
    fundingGoal: 50000,
    amountRaised: 41500,
    backersCount: 37,
    loanTermMonths: 6,
    monthlyRepayment: 8333,
    interestRate: 0,
    repaymentStatus: 'On Schedule (3 of 6 paid)',
    repaymentProgressPercent: 50,
    verified: true,
    verificationBadge: 'NRLM Women SHG Verified Leader',
    smartContractAddress: '0x39F...91dD',
    useOfFunds: [
      { item: 'Bulk Organza & Mulmul Fabric Yards', percentage: 45, amount: 22500 },
      { item: 'Authentic Salma, Sitara & Metallic Wire', percentage: 30, amount: 15000 },
      { item: 'Ergonomic Adda (Embroidery Stretcher Frames)', percentage: 15, amount: 7500 },
      { item: 'Quality Control & Eco-Friendly Wash', percentage: 10, amount: 5000 }
    ],
    repaymentTerms: {
      schedule: 'Bi-monthly milestone repayments',
      gracePeriod: '15-day order completion buffer',
      collateral: 'Zero collateral',
      middlemanSavings: 'Artisans now earn 4.5x higher per garment'
    },
    communityImpact: 'Directly employs 14 rural mothers, funding sanitary health and school fees.',
    rating: 4.95,
    reviewsCount: 52
  },
  {
    id: 'artisan-4',
    name: 'Kishanlal Suthar',
    age: 47,
    location: 'Channapatna, Karnataka',
    state: 'Karnataka',
    craft: 'Channapatna Wooden Toys & Natural Lacquerware',
    category: 'Woodcraft',
    experience: '28 years',
    familyHeritage: '4th Generation Toymaker',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    craftImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545670723-196ed0954986?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Crafting non-toxic, child-safe heirloom wooden toys using seasoned Wrightia tinctoria wood and natural dyes.',
    fullStory: 'Kishanlal practices the legendary GI-registered craft of "Gombegala Ooru" (Toy Town Channapatna). His toys use zero plastic, synthetic varnish, or lead paints — only ivory-wood turned on lathe and polished using dried screw pine leaves and turmeric/indigo natural resins. Influx of cheap imported plastic toys previously threatened his family workshop. With micro-capital from urban supporters, Kishanlal is building a specialized set of Montessori educational toys for conscious urban parents.',
    fundingGoal: 30000,
    amountRaised: 28200,
    backersCount: 26,
    loanTermMonths: 5,
    monthlyRepayment: 6000,
    interestRate: 0,
    repaymentStatus: 'Near Completion (4 of 5 paid)',
    repaymentProgressPercent: 80,
    verified: true,
    verificationBadge: 'GI Tag #GI-19 Certified Artisan',
    smartContractAddress: '0x94B...55aA',
    useOfFunds: [
      { item: 'Seasoned Ivory-wood (Aale Mara) Billets', percentage: 50, amount: 15000 },
      { item: 'Precision High-Efficiency Turning Lathe', percentage: 30, amount: 9000 },
      { item: 'Organic Lacquer Pellets & Natural Pigments', percentage: 20, amount: 6000 }
    ],
    repaymentTerms: {
      schedule: '5 equal monthly repayments',
      gracePeriod: '10-day settlement buffer',
      collateral: 'Zero collateral',
      middlemanSavings: 'Eliminates 3 distributors'
    },
    communityImpact: 'Preserves 200-year-old toy craft; trains 4 school leavers in woodturning.',
    rating: 4.92,
    reviewsCount: 44
  },
  {
    id: 'artisan-5',
    name: 'Sunita & Manvendra Meena',
    age: 36,
    location: 'Jaipur, Rajasthan',
    state: 'Rajasthan',
    craft: 'Jaipur Meenakari & Kundan Fine Jewellery',
    category: 'Handmade Jewellery',
    experience: '16 years',
    familyHeritage: '3rd Generation Enameler',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    craftImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Miniature fire-enameling on silver and brass, creating kaleidoscopic jewellery inspired by Rajput palaces.',
    fullStory: 'Sunita and her husband Manvendra are master Meenakars from the historic lanes of Johari Bazaar in Jaipur. The art requires fusing pulverized colored mineral glass onto meticulously grooved metal surfaces inside intense kilns. Commercial jewellery retailers often took custom pieces on 90-day consignment without advance payment, forcing the couple to take debt for raw silver. KarigarConnect empowers Sunita to sell directly to patrons and sustain independent studio production.',
    fundingGoal: 35000,
    amountRaised: 21500,
    backersCount: 18,
    loanTermMonths: 6,
    monthlyRepayment: 5833,
    interestRate: 0,
    repaymentStatus: 'Active (1 of 6 paid)',
    repaymentProgressPercent: 16,
    verified: true,
    verificationBadge: 'Jaipur Jewellers Guild Accredited',
    smartContractAddress: '0x18D...33bC',
    useOfFunds: [
      { item: '925 Sterling Silver Grain & Sheet Stocks', percentage: 55, amount: 19250 },
      { item: 'Enameling Mineral Glass Powders & Engravers', percentage: 25, amount: 8750 },
      { item: 'Micro-Blowtorch & Controlled Muffle Kiln', percentage: 20, amount: 7000 }
    ],
    repaymentTerms: {
      schedule: 'Monthly installment with festive wedding season buffer',
      gracePeriod: '15-day settlement window',
      collateral: 'Zero collateral',
      middlemanSavings: 'Direct customer orders with 40% higher realization'
    },
    communityImpact: 'Host free weekend enameling workshops for local girls.',
    rating: 4.88,
    reviewsCount: 31
  },
  {
    id: 'artisan-6',
    name: 'Subhash Chitrakar',
    age: 49,
    location: 'Raghurajpur Heritage Village, Odisha',
    state: 'Odisha',
    craft: 'Traditional Pattachitra & Palm Leaf Engraving',
    category: 'Traditional Crafts',
    experience: '30 years',
    familyHeritage: '6th Generation Patua Painter',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    craftImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Intricate storytelling scrolls created with handmade canvas, tamarind paste, and stone/conch-shell minerals.',
    fullStory: 'Subhash resides in Raghurajpur, India\'s famous heritage crafts village where every home is an open-air art studio. Using dried palm leaves stitched together and natural pigments derived from crushed sea-shells, hingula stone, and haritala, Subhash draws microscopic mythological narratives. KarigarConnect\'s funding enables him to preserve ancient manuscripts and conduct workshops for heritage tourists.',
    fundingGoal: 20000,
    amountRaised: 18500,
    backersCount: 17,
    loanTermMonths: 3,
    monthlyRepayment: 6667,
    interestRate: 0,
    repaymentStatus: 'Near Completion (2 of 3 paid)',
    repaymentProgressPercent: 66,
    verified: true,
    verificationBadge: 'Odisha State Lalit Kala Akademi Honoree',
    smartContractAddress: '0x45E...88fF',
    useOfFunds: [
      { item: 'Aged Tala Palm Fronds & Stitching Fibers', percentage: 40, amount: 8000 },
      { item: 'Natural Stone Pigments & Conch-shell Gum', percentage: 35, amount: 7000 },
      { item: 'Archival Framing & Moisture Barrier Packaging', percentage: 25, amount: 5000 }
    ],
    repaymentTerms: {
      schedule: '3 equal monthly installments',
      gracePeriod: '10 days',
      collateral: 'Zero collateral',
      middlemanSavings: 'Removes city art gallery 50% commission cuts'
    },
    communityImpact: 'Maintains village heritage library with 100+ palm-leaf folios.',
    rating: 4.96,
    reviewsCount: 39
  },
  {
    id: 'artisan-7',
    name: 'Mohammad Rafiq',
    age: 58,
    location: 'Srinagar, Jammu & Kashmir',
    state: 'Jammu & Kashmir',
    craft: 'Authentic Kani & Pashmina Needle Shawls',
    category: 'Handloom',
    experience: '40 years',
    familyHeritage: '5th Generation Shawl Weaver',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    craftImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Translating coded Talim scripts into master Kani shawls using tiny wooden bobbins and high-altitude Pashmina.',
    fullStory: 'A single authentic Kani Pashmina shawl takes Mohammad Rafiq up to 10 months of painstaking work, following rhythmic vocal codes ("Talim") that specify every yarn color transition. In recent decades, industrial power-loom fakes flooded the market, reducing weaver compensation. KarigarConnect provides Rafiq with direct ethical financing to procure raw hand-spun Changthangi goat fiber and timestamp each shawl on the blockchain for indisputable origin provenance.',
    fundingGoal: 65000,
    amountRaised: 52000,
    backersCount: 44,
    loanTermMonths: 8,
    monthlyRepayment: 8125,
    interestRate: 0,
    repaymentStatus: 'Active (3 of 8 paid)',
    repaymentProgressPercent: 37,
    verified: true,
    verificationBadge: 'Crafts Council of India Gold Medalist',
    smartContractAddress: '0x62C...90aD',
    useOfFunds: [
      { item: 'Certified Ladakh Changthangi Pashmina Raw Yarn', percentage: 60, amount: 39000 },
      { item: 'Traditional Wooden Eyed-Needles & Loom Upkeep', percentage: 20, amount: 13000 },
      { item: 'Cryptographic Authenticity NFC Tags & Provenance', percentage: 20, amount: 13000 }
    ],
    repaymentTerms: {
      schedule: '8 flexible monthly milestones tied to craft delivery',
      gracePeriod: '30-day winter cold wave buffer',
      collateral: 'Zero collateral',
      middlemanSavings: 'Eliminates 4 tiers of tourist showroom middlemen'
    },
    communityImpact: 'Keeps rare Kani weaving alive in downtown Srinagar; mentors 5 youth.',
    rating: 4.98,
    reviewsCount: 61
  },
  {
    id: 'artisan-8',
    name: 'Kankuben Vankar',
    age: 42,
    location: 'Nirona, Kutch, Gujarat',
    state: 'Gujarat',
    craft: 'Rogan Painting & Extra-Weft Kala Cotton',
    category: 'Traditional Crafts',
    experience: '22 years',
    familyHeritage: '3rd Generation Rogan Artist',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
    craftImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Practicing the centuries-old art of heated castor-oil paste painting using a 6-inch metal stylus.',
    fullStory: 'Rogan art was on the verge of extinction, preserved by barely a few families in Kutch. Kankuben takes thick colored castor oil paste in her palm, draws fine thread-like strands in the air with a blunt metal stylus, and guides it onto natural rainfed Kala cotton fabric without ever touching the fabric directly. KarigarConnect empowers Kankuben to purchase cold-pressed castor seeds and rainfed indigenous cotton in bulk, ensuring craft survival.',
    fundingGoal: 28000,
    amountRaised: 24500,
    backersCount: 23,
    loanTermMonths: 4,
    monthlyRepayment: 7000,
    interestRate: 0,
    repaymentStatus: 'Active (2 of 4 paid)',
    repaymentProgressPercent: 50,
    verified: true,
    verificationBadge: 'Kutch Mahila Vikas Sangathan Certified',
    smartContractAddress: '0x21B...77eE',
    useOfFunds: [
      { item: 'Cold-Pressed Castor Oil & Natural Earth Pigments', percentage: 40, amount: 11200 },
      { item: 'Organic Rainfed Kala Cotton Handspun Fabric', percentage: 40, amount: 11200 },
      { item: 'Custom Stylus Tools & Exhibition Display Mats', percentage: 20, amount: 5600 }
    ],
    repaymentTerms: {
      schedule: '4 equal monthly repayments',
      gracePeriod: '15-day desert monsoon window',
      collateral: 'Zero collateral',
      middlemanSavings: 'Artisans sell directly to global textile collectors'
    },
    communityImpact: 'Broke village patriarchal taboos by training 18 young women in Rogan craft.',
    rating: 4.93,
    reviewsCount: 35
  }
];

export const PLATFORM_STATS = {
  totalDisbursed: '₹48,50,000',
  repaymentRate: '99.2%',
  activeArtisans: '520+',
  statesCovered: '14',
  middlemenCommissionCut: '0%',
  urbanSupporters: '3,840+',
  smartContractsExecuted: '1,420'
};
