/**
 * MURUGAN IMPEX™ - Web Application Logic
 * Imported Dental Byproducts & Medical Supplies India
 * Features: Amazon-style E-Commerce, G-Window Quality Inspector, Pan-India Logistics & GST Invoice Generator
 */

(function () {
  'use strict';

  // ==========================================
  // 1. DENTAL BYPRODUCTS CATALOG DATABASE
  // ==========================================
  const DENTAL_PRODUCTS = [
    {
      id: 1,
      title: "Swiss-Bone® Synthetic Bioceramic Graft Granules & Collagen Membrane Kit",
      brand: "Swiss-Bone Medical AG",
      category: "Biomaterials",
      origin: "Switzerland",
      originFlag: "🇨🇭",
      cdscoNumber: "IMP/MD/2024/78210",
      boeNumber: "BOE-BOM-2026-99214",
      portOfEntry: "Mumbai Air Cargo (BOM)",
      batchLot: "CH-2024-8921",
      expiryDate: "September 2028",
      sterilization: "Gamma Radiation (R) 25 kGy",
      storageTemp: "15°C – 25°C Controlled Room Temp",
      hsnCode: "9021.29.00",
      gstRate: 18,
      price: 3850,
      mrp: 5500,
      discountPercent: 30,
      rating: 4.9,
      reviewsCount: 184,
      image: "assets/images/swiss-bone-graft.jpg",
      isPrime: true,
      inStock: true,
      tierBulk: "multi",
      description: "Phase-pure micro/macro-porous β-Tricalcium Phosphate (β-TCP) granules (0.25–1.0mm) paired with a bio-resorbable bovine-free pericardium collagen membrane (20x30mm). Ideal for dental implant socket preservation, sinus lift augmentations, and severe alveolar ridge periodontal regeneration across Indian clinical practices.",
      specs: [
        { label: "Biomaterial Composition", value: "99.9% Phase-Pure β-TCP (Ca3(PO4)2)" },
        { label: "Porosity & Pore Size", value: "65% Total Porosity, 100–500 µm Interconnected" },
        { label: "Membrane Dimensions", value: "20 mm x 30 mm (Thickness: 0.3 mm)" },
        { label: "Resorption Timeline", value: "Predictable 16–24 Weeks Replacement by New Bone" },
        { label: "Indian Regulatory Status", value: "CDSCO Class C Medical Device Registration" },
        { label: "Cold-Chain Handling", value: "Data Logger Monitored Air Dispatch" }
      ]
    },
    {
      id: 2,
      title: "TitanPrecision™ German Surgical Grade-V Titanium Implants & Multi-Unit Abutment System",
      brand: "Tuttlingen Precision Medical GmbH",
      category: "Implants",
      origin: "Germany",
      originFlag: "🇩🇪",
      cdscoNumber: "IMP/MD/2023/45192",
      boeNumber: "BOE-BOM-2026-44319",
      portOfEntry: "Mumbai Seaport & Air Cargo",
      batchLot: "DE-230914-V",
      expiryDate: "October 2029",
      sterilization: "Ethylene Oxide (EO) & Gamma Sterile",
      storageTemp: "Room Temperature (Dry)",
      hsnCode: "9021.29.00",
      gstRate: 18,
      price: 6490,
      mrp: 8990,
      discountPercent: 28,
      rating: 4.95,
      reviewsCount: 246,
      image: "assets/images/german-titanium-implants.jpg",
      isPrime: true,
      inStock: true,
      tierBulk: "multi",
      description: "Ultra-pure Ti-6Al-4V ELI (Grade V Medical Titanium) dental root-form implants featuring high-precision micro-etched SLA surface (Sand-blasted, Large-grit, Acid-etched). Engineered in Tuttlingen, Germany. Includes sterile blister packing with pre-mounted titanium healing cap and transfer abutment.",
      specs: [
        { label: "Material Grade", value: "Medical Grade 5 Titanium (Ti-6Al-4V ELI)" },
        { label: "Surface Treatment", value: "SLA (Ra = 1.8–2.2 µm Active Osseointegration)" },
        { label: "Internal Connection", value: "11° Morse Taper Conical Hex" },
        { label: "Available Diameters", value: "3.8mm, 4.1mm, 4.5mm, 5.0mm (Lengths 8–13mm)" },
        { label: "Indian Quality License", value: "CDSCO Class D High-Risk Medical Implant" },
        { label: "Fatigue Benchmark", value: "Exceeds 5,000,000 Cycles @ 250N Dynamic Load" }
      ]
    },
    {
      id: 3,
      title: "Kyoto Pro-Layer™ 98mm Multi-Layered High-Translucency Dental Zirconia Milling Discs",
      brand: "Kyoto Precision Ceramics",
      category: "CAD/CAM",
      origin: "Japan",
      originFlag: "🇯🇵",
      cdscoNumber: "IMP/MD/2024/11094",
      boeNumber: "BOE-DEL-2026-88123",
      portOfEntry: "Delhi Air Cargo Terminal (DEL)",
      batchLot: "JP-KY-9816",
      expiryDate: "December 2030",
      sterilization: "Cleanroom Class 10,000 Packaged",
      storageTemp: "Standard Ambient Dry",
      hsnCode: "9021.29.00",
      gstRate: 18,
      price: 8200,
      mrp: 11500,
      discountPercent: 29,
      rating: 4.88,
      reviewsCount: 162,
      image: "assets/images/kyoto-zirconia-discs.jpg",
      isPrime: true,
      inStock: true,
      tierBulk: "hospital",
      description: "Japanese ultra-translucent 5Y-PSZ / 4Y-PSZ multi-layer restorative zirconia disc (98mm x 16mm/20mm) with stepped shade graduation (A1, A2, A3, B1). Exceptional 1200 MPa flexural strength at the margin and 49% natural incisal translucency for dental CAD/CAM milling centers in India.",
      specs: [
        { label: "Disc Standard", value: "98 mm Open CAD/CAM Step Collar System" },
        { label: "Flexural Strength", value: "1,200 MPa (Cervical) to 850 MPa (Incisal)" },
        { label: "Translucency Range", value: "43% (Body) to 49% (Incisal Gradient)" },
        { label: "Sintering Temp", value: "1,530°C Holding Time: 2 Hours" },
        { label: "Compatible Mills", value: "Roland, VHF, Amann Girrbach, Imes-Icore" },
        { label: "CDSCO Registration", value: "Class B Dental Biomaterial Approved" }
      ]
    },
    {
      id: 4,
      title: "SwissFlex Gold-Ti™ Heat-Treated NiTi Rotary Endodontic Canal Shaping Files",
      brand: "Neuchâtel Endo Precision",
      category: "Endodontics",
      origin: "Switzerland",
      originFlag: "🇨🇭",
      cdscoNumber: "IMP/MD/2024/66381",
      boeNumber: "BOE-BOM-2026-33981",
      portOfEntry: "Mumbai Air Cargo (BOM)",
      batchLot: "SW-ENDO-70803",
      expiryDate: "August 2029",
      sterilization: "Sterile Blister Packaging • Autoclavable 134°C",
      storageTemp: "Room Temperature",
      hsnCode: "9018.49.00",
      gstRate: 12,
      price: 1950,
      mrp: 2800,
      discountPercent: 30,
      rating: 4.92,
      reviewsCount: 310,
      image: "assets/images/swiss-rotary-files.jpg",
      isPrime: true,
      inStock: true,
      tierBulk: "single",
      description: "Patented Swiss thermal CM-wire metallurgical conditioning yielding superior cyclic fatigue resistance and flexible memory. Safely navigates curved, narrow, or calcified root canals without ledge formation or instrument separation. 6-file sterile blister pack with millimeter laser depth gauges.",
      specs: [
        { label: "Alloy Technology", value: "Gold Heat-Treated Controlled-Memory NiTi" },
        { label: "File Length", value: "21mm & 25mm Assorted Pack (SX, S1, S2, F1, F2, F3)" },
        { label: "Speed & Torque", value: "300 RPM @ 2.5 N·cm recommended setting" },
        { label: "Fatigue Resistance", value: "350% higher than conventional austenite NiTi" },
        { label: "Cross-Section", value: "Convex Triangular for high cutting efficiency" },
        { label: "CDSCO Status", value: "Class B Endodontic Surgical Tool" }
      ]
    },
    {
      id: 5,
      title: "Bio-Fill Universal™ 7th-Gen Nanohybrid Restorative Composite & 10-MDP Bond System",
      brand: "Bavaria Dental Solutions",
      category: "Restorative",
      origin: "Germany",
      originFlag: "🇩🇪",
      cdscoNumber: "IMP/MD/2023/90124",
      boeNumber: "BOE-BOM-2026-11894",
      portOfEntry: "Mumbai Seaport Air Freight",
      batchLot: "EU-BF-2026-07738",
      expiryDate: "July 2028",
      sterilization: "Medical Cleanroom Packaged",
      storageTemp: "Cold Storage 4°C – 22°C",
      hsnCode: "3006.40.00",
      gstRate: 18,
      price: 4100,
      mrp: 5800,
      discountPercent: 29,
      rating: 4.85,
      reviewsCount: 142,
      image: "assets/images/biofill-composite-resin.jpg",
      isPrime: true,
      inStock: true,
      tierBulk: "multi",
      description: "Complete German light-cure restorative system consisting of 4x 4g nano-hybrid composite syringes (A1, A2, A3, B1) and 1x 5ml Universal 10-MDP self-etch bonding agent bottle. Zero marginal leakage, excellent chameleon polishability, and high compressive strength.",
      specs: [
        { label: "Filler Loading", value: "82% by weight (Sub-micron 20nm Silica-Zirconia)" },
        { label: "Monomer Chemistry", value: "Bis-GMA, UDMA with 10-MDP Acidic Functional Monomer" },
        { label: "Compressive Strength", value: "410 MPa (Ideal for Posterior Occlusal Forces)" },
        { label: "Depth of Cure", value: "2.5 mm in 20 seconds @ 1000 mW/cm² LED" },
        { label: "Bond Strength", value: "32 MPa to Dentin, 38 MPa to Enamel" },
        { label: "CDSCO License", value: "Class C Dental Restorative Biomaterial" }
      ]
    },
    {
      id: 6,
      title: "OrthoMaster Premier™ Self-Ligating Ceramic Aesthetic Brackets & Superelastic NiTi Wires",
      brand: "California Ortho Innovations",
      category: "Orthodontics",
      origin: "USA",
      originFlag: "🇺🇸",
      cdscoNumber: "IMP/MD/2024/33918",
      boeNumber: "BOE-DEL-2026-66432",
      portOfEntry: "Delhi Air Cargo Terminal (DEL)",
      batchLot: "US-CO-449182",
      expiryDate: "October 2029",
      sterilization: "Clean Medical Tray Packaging",
      storageTemp: "Standard Ambient",
      hsnCode: "9021.29.00",
      gstRate: 18,
      price: 5600,
      mrp: 7900,
      discountPercent: 29,
      rating: 4.91,
      reviewsCount: 178,
      image: "assets/images/ortho-brackets-kit.jpg",
      isPrime: true,
      inStock: true,
      tierBulk: "single",
      description: "Translucent polycrystalline alumina ceramic bracket kit (Roth/MBT .022 slot) with rhodium-coated low-friction locking clips. Comes with 10 upper & lower pre-formed superelastic NiTi thermal archwires (.014, .016, .018 ovoid). Stain-resistant aesthetics with minimal patient friction.",
      specs: [
        { label: "Bracket Material", value: "Medical Grade 99.9% Pure Polycrystalline Ceramic" },
        { label: "Prescription", value: "Roth / MBT .022 Slot System with Torque-in-Base" },
        { label: "Clip Mechanism", value: "Passive Self-Ligating Nickel-Titanium Spring Clip" },
        { label: "Base Design", value: "Compound Contoured Micro-Etched Mechanical Lock" },
        { label: "Included Archwires", value: "10 Pairs Superelastic NiTi Natural Ovoid Form" },
        { label: "CDSCO Import Tag", value: "Class B Orthodontic Appliance Registry" }
      ]
    },
    {
      id: 7,
      title: "CeraMatrix Bio-Ossified™ Porcine Demineralized Collagen Matrix GTR Barrier",
      brand: "Stockholm BioDental Research",
      category: "Biomaterials",
      origin: "Sweden",
      originFlag: "🇸🇪",
      cdscoNumber: "IMP/MD/2024/55120",
      boeNumber: "BOE-BOM-2026-22941",
      portOfEntry: "Mumbai Air Cargo (BOM)",
      batchLot: "SE-CM-2024-51",
      expiryDate: "November 2028",
      sterilization: "Validated Double Blister Sterile Gamma",
      storageTemp: "Controlled 15°C – 25°C",
      hsnCode: "9021.29.00",
      gstRate: 18,
      price: 4890,
      mrp: 6700,
      discountPercent: 27,
      rating: 4.87,
      reviewsCount: 119,
      image: "assets/images/swiss-bone-graft.jpg",
      isPrime: true,
      inStock: true,
      tierBulk: "multi",
      description: "Imported Scandinavian natural porcine pericardium collagen matrix (25x25mm). Specifically designed for guided bone regeneration (GBR) and guided tissue regeneration (GTR). Exceptional tear resistance when suturing and provides an optimal 24-week cell-occlusive barrier.",
      specs: [
        { label: "Matrix Origin", value: "Porcine Pericardium (Non-chemically cross-linked)" },
        { label: "Tensile Strength", value: "High Suture Retention > 4.5 N" },
        { label: "Hydration Time", value: "Instant rehydration in sterile saline (< 30 sec)" },
        { label: "Degradation Rate", value: "Slow enzymatic breakdown over 24 weeks" },
        { label: "Cold-Chain Standard", value: "Dispatched with validated temperature indicator" },
        { label: "CDSCO Clearance", value: "Class C Biological Device Approved" }
      ]
    },
    {
      id: 8,
      title: "ApexAir LED Optic™ Ceramic Bearing High-Speed Dental Handpiece & Titanium Turbine",
      brand: "Nagano Micro-Aero Dynamics",
      category: "Equipment",
      origin: "Japan",
      originFlag: "🇯🇵",
      cdscoNumber: "IMP/MD/2023/88921",
      boeNumber: "BOE-BOM-2026-77192",
      portOfEntry: "Mumbai Air Cargo (BOM)",
      batchLot: "JP-NM-450K",
      expiryDate: "Warranty: 2 Years Official",
      sterilization: "Thermo-disinfectable & Autoclavable 135°C",
      storageTemp: "Dry Storage",
      hsnCode: "9018.49.00",
      gstRate: 12,
      price: 12900,
      mrp: 17500,
      discountPercent: 26,
      rating: 4.96,
      reviewsCount: 88,
      image: "assets/images/german-titanium-implants.jpg",
      isPrime: true,
      inStock: true,
      tierBulk: "single",
      description: "450,000 RPM Japanese ceramic ball-bearing high-speed surgical dental handpiece with 25,000 lux daylight fiber-optic LED. Features 4-port anti-retraction water spray to eliminate cross-contamination aerosol and zero-heat titanium body construction.",
      specs: [
        { label: "Bearing Type", value: "Ultra-Quiet Japanese Silicon Nitride Ceramic" },
        { label: "Illumination", value: "Built-in Cellular Glass Optical Fiber (25,000 Lux)" },
        { label: "Head Geometry", value: "Standard Torque Head (21 Watts Cutting Power)" },
        { label: "Coupling Fit", value: "Standard 4-Hole Midwest / Quick-Disconnect" },
        { label: "Noise Level", value: "< 58 dB at full 450,000 RPM operation" },
        { label: "CDSCO Registry", value: "Class B Dental Powered Instrument" }
      ]
    },
    {
      id: 9,
      title: "SteriShield Pro™ Medical Grade Autoclave Pouches & Multi-Enzyme Cleaner Kit",
      brand: "Seoul MedTech Solutions",
      category: "Sterilization",
      origin: "South Korea",
      originFlag: "🇰🇷",
      cdscoNumber: "IMP/MD/2023/12084",
      boeNumber: "BOE-CCU-2026-55102",
      portOfEntry: "Kolkata Port & Air Cargo",
      batchLot: "KR-SM-8812",
      expiryDate: "June 2030",
      sterilization: "Pre-sterilization packaging media",
      storageTemp: "Dry Ambient",
      hsnCode: "3006.40.00",
      gstRate: 18,
      price: 1450,
      mrp: 2100,
      discountPercent: 31,
      rating: 4.82,
      reviewsCount: 220,
      image: "assets/images/biofill-composite-resin.jpg",
      isPrime: true,
      inStock: true,
      tierBulk: "multi",
      description: "Imported Korean heavy-duty 70gsm medical Kraft paper + tinted multi-layer barrier film sterilization rolls with internal & external Class 4 chemical indicators (Steam + EO gas). Includes 1 Liter concentrated quad-enzyme ultrasonic instrument cleaning fluid.",
      specs: [
        { label: "Paper Standard", value: "Medical Grade 70 GSM Bleached Kraft (EN 868-5)" },
        { label: "Indicator Inks", value: "Water-based Non-toxic Steam & Ethylene Oxide" },
        { label: "Enzyme Spectrum", value: "Protease, Amylase, Lipase & Cellulase Formula" },
        { label: "Shelf Life Post-Sterilization", value: "Up to 6 Months in sealed aseptic barrier" },
        { label: "Roll Dimensions", value: "200mm x 200m Continuous Medical Roll" },
        { label: "CDSCO Compliance", value: "Class A Hospital Disinfection Accessory" }
      ]
    }
  ];

  // ==========================================
  // 2. INDIAN POSTAL PINCODES & TRANSIT TIMES
  // ==========================================
  const INDIAN_PINCODES_DATABASE = {
    "400001": { city: "Mumbai South", state: "Maharashtra", tat: "Tomorrow by 10:00 AM", hub: "Mumbai Central Air Hub", coldChain: "Yes (Valid)", courier: "BlueDart Air Aviation" },
    "400053": { city: "Mumbai (Andheri West)", state: "Maharashtra", tat: "Tomorrow by 11:00 AM", hub: "BOM Airport Medical Hub", coldChain: "Yes (Valid)", courier: "BlueDart Air Aviation" },
    "110001": { city: "New Delhi (Connaught Place)", state: "Delhi NCR", tat: "Tomorrow by 11:30 AM", hub: "DEL IGI Cargo Terminal", coldChain: "Yes (Valid)", courier: "BlueDart Air Express" },
    "560001": { city: "Bengaluru (MG Road)", state: "Karnataka", tat: "Tomorrow by 12:30 PM", hub: "BLR Kempegowda Cargo", coldChain: "Yes (Valid)", courier: "BlueDart Medical Cargo" },
    "500001": { city: "Hyderabad (Abids)", state: "Telangana", tat: "Tomorrow by 01:00 PM", hub: "HYD Shamshabad Hub", coldChain: "Yes (Valid)", courier: "BlueDart Air Aviation" },
    "600001": { city: "Chennai (George Town)", state: "Tamil Nadu", tat: "Tomorrow by 02:00 PM", hub: "MAA Meenambakkam Cargo", coldChain: "Yes (Valid)", courier: "BlueDart Air Aviation" },
    "700001": { city: "Kolkata (BBD Bagh)", state: "West Bengal", tat: "Tomorrow by 03:00 PM", hub: "CCU Netaji Cargo Hub", coldChain: "Yes (Valid)", courier: "BlueDart Medical Aviation" },
    "411001": { city: "Pune (Camp)", state: "Maharashtra", tat: "Same-Day Evening / Tomorrow 10 AM", hub: "Pune Express Transit", coldChain: "Yes (Valid)", courier: "BlueDart Direct Van" },
    "380001": { city: "Ahmedabad", state: "Gujarat", tat: "Tomorrow by 01:30 PM", hub: "AMD Sardar Patel Cargo", coldChain: "Yes (Valid)", courier: "BlueDart Medical Cargo" },
    "226001": { city: "Lucknow", state: "Uttar Pradesh", tat: "48 Hours Air Express", hub: "LKO Chaudhary Charan Hub", coldChain: "Yes (Valid)", courier: "Delhivery Medical Cargo" },
    "302001": { city: "Jaipur", state: "Rajasthan", tat: "Tomorrow by 04:00 PM", hub: "JAI Sanganer Air Cargo", coldChain: "Yes (Valid)", courier: "BlueDart Air Express" },
    "160017": { city: "Chandigarh", state: "Punjab/Haryana", tat: "Tomorrow by 04:30 PM", hub: "IXC Air Terminal", coldChain: "Yes (Valid)", courier: "BlueDart Air Express" },
    "682001": { city: "Kochi", state: "Kerala", tat: "48 Hours Priority Air", hub: "COK International Hub", coldChain: "Yes (Valid)", courier: "BlueDart Medical Cargo" },
    "781001": { city: "Guwahati", state: "Assam / North East", tat: "48-72 Hours Air Cargo", hub: "GAU Lokpriya Cargo", coldChain: "Yes (Valid)", courier: "BlueDart Air Express" }
  };

  // ==========================================
  // 3. APPLICATION STATE
  // ==========================================
  const State = {
    products: DENTAL_PRODUCTS,
    filteredProducts: [...DENTAL_PRODUCTS],
    activeCategory: "all",
    searchQuery: "",
    selectedOrigins: new Set(),
    selectedCerts: new Set(),
    selectedTiers: new Set(),
    primeOnly: false,
    maxPrice: 15000,
    minRating: 0,
    currentSort: "featured",
    currentPincode: "400001",
    currentLocationName: "Mumbai 400001",
    cart: JSON.parse(localStorage.getItem("indodent_cart") || "[]"),
    activePromo: null,
    promoDiscount: 0,
    activeGWindowProduct: null,
    gWindowSelectedQty: 1,
    gWindowSelectedDiscount: 0
  };

  // ==========================================
  // 4. DOM ELEMENTS
  // ==========================================
  const Elements = {
    // Header & Navigation
    headerLocationDisplay: document.getElementById("headerLocationDisplay"),
    locationPickerBtn: document.getElementById("locationPickerBtn"),
    searchCategorySelect: document.getElementById("searchCategorySelect"),
    mainSearchInput: document.getElementById("mainSearchInput"),
    clearSearchBtn: document.getElementById("clearSearchBtn"),
    searchSubmitBtn: document.getElementById("searchSubmitBtn"),
    searchSuggestionsList: document.getElementById("searchSuggestionsList"),
    cartToggleBtn: document.getElementById("cartToggleBtn"),
    cartCountBadge: document.getElementById("cartCountBadge"),
    cartTotalHeader: document.getElementById("cartTotalHeader"),
    headerTrackOrdersBtn: document.getElementById("headerTrackOrdersBtn"),
    topTrackBtn: document.getElementById("topTrackBtn"),
    topB2bQuoteBtn: document.getElementById("topB2bQuoteBtn"),
    brandLogoHome: document.getElementById("brandLogoHome"),
    backToTopBtn: document.getElementById("backToTopBtn"),
    allMenuDrawerBtn: document.getElementById("allMenuDrawerBtn"),
    openGWindowGuide: document.getElementById("openGWindowGuide"),
    dealsFilterNav: document.getElementById("dealsFilterNav"),
    exploreAllProductsBtn: document.getElementById("exploreAllProductsBtn"),
    launchDemoGWindowBtn: document.getElementById("launchDemoGWindowBtn"),
    openPincodeLookupHeroBtn: document.getElementById("openPincodeLookupHeroBtn"),

    // Catalog & Sidebar
    productsGrid: document.getElementById("productsGrid"),
    resultsCount: document.getElementById("resultsCount"),
    activeFilterChips: document.getElementById("activeFilterChips"),
    sortSelect: document.getElementById("sortSelect"),
    resetFiltersBtn: document.getElementById("resetFiltersBtn"),
    filterPrimeOnly: document.getElementById("filterPrimeOnly"),
    priceRangeSlider: document.getElementById("priceRangeSlider"),
    priceDisplay: document.getElementById("priceDisplay"),
    pincodeCheckSidebarBtn: document.getElementById("pincodeCheckSidebarBtn"),

    // G-Window Modal
    gWindowModal: document.getElementById("gWindowModal"),
    closeGWindowBtn: document.getElementById("closeGWindowBtn"),
    gWindowViewport: document.getElementById("gWindowViewport"),
    gWindowMainImg: document.getElementById("gWindowMainImg"),
    gWindowCrosshair: document.getElementById("gWindowCrosshair"),
    gWindowOriginStamp: document.getElementById("gWindowOriginStamp"),
    gWindowCdscoNumber: document.getElementById("gWindowCdscoNumber"),
    gWindowBrand: document.getElementById("gWindowBrand"),
    gWindowProdName: document.getElementById("gWindowProdName"),
    gWindowStars: document.getElementById("gWindowStars"),
    gWindowRating: document.getElementById("gWindowRating"),
    gWindowReviewCount: document.getElementById("gWindowReviewCount"),
    gWindowPort: document.getElementById("gWindowPort"),
    gWindowBoe: document.getElementById("gWindowBoe"),
    gWindowOrigin: document.getElementById("gWindowOrigin"),
    gWindowStorage: document.getElementById("gWindowStorage"),
    gWindowExpiry: document.getElementById("gWindowExpiry"),
    gWindowSterilization: document.getElementById("gWindowSterilization"),
    gWindowDescription: document.getElementById("gWindowDescription"),
    gWindowSpecsTable: document.getElementById("gWindowSpecsTable"),
    gWindowFinalPrice: document.getElementById("gWindowFinalPrice"),
    gWindowMrp: document.getElementById("gWindowMrp"),
    gWindowDiscountBadge: document.getElementById("gWindowDiscountBadge"),
    gWindowGstSave: document.getElementById("gWindowGstSave"),
    tier1Price: document.getElementById("tier1Price"),
    tier5Price: document.getElementById("tier5Price"),
    tier20Price: document.getElementById("tier20Price"),
    gWindowAddToCartBtn: document.getElementById("gWindowAddToCartBtn"),
    gWindowBuyNowBtn: document.getElementById("gWindowBuyNowBtn"),
    gWindowDownloadCoaBtn: document.getElementById("gWindowDownloadCoaBtn"),

    // Cart Drawer
    cartDrawer: document.getElementById("cartDrawer"),
    cartDrawerBackdrop: document.getElementById("cartDrawerBackdrop"),
    closeCartDrawerBtn: document.getElementById("closeCartDrawerBtn"),
    cartDrawerCount: document.getElementById("cartDrawerCount"),
    cartItemsContainer: document.getElementById("cartItemsContainer"),
    cartSubtotalMrp: document.getElementById("cartSubtotalMrp"),
    cartDiscountAmount: document.getElementById("cartDiscountAmount"),
    cartTaxableValue: document.getElementById("cartTaxableValue"),
    cartGstAmount: document.getElementById("cartGstAmount"),
    cartPayableTotal: document.getElementById("cartPayableTotal"),
    itcSavingsDisplay: document.getElementById("itcSavingsDisplay"),
    checkoutItemCount: document.getElementById("checkoutItemCount"),
    promoCodeInput: document.getElementById("promoCodeInput"),
    applyPromoBtn: document.getElementById("applyPromoBtn"),
    promoFeedbackMsg: document.getElementById("promoFeedbackMsg"),
    proceedToCheckoutBtn: document.getElementById("proceedToCheckoutBtn"),
    continueShoppingBtn: document.getElementById("continueShoppingBtn"),

    // Checkout Modal
    checkoutModal: document.getElementById("checkoutModal"),
    closeCheckoutBtn: document.getElementById("closeCheckoutBtn"),
    checkoutItemsMini: document.getElementById("checkoutItemsMini"),
    coSubtotal: document.getElementById("coSubtotal"),
    coSavings: document.getElementById("coSavings"),
    coCgst: document.getElementById("coCgst"),
    coSgst: document.getElementById("coSgst"),
    coGrandTotal: document.getElementById("coGrandTotal"),
    confirmPlaceOrderBtn: document.getElementById("confirmPlaceOrderBtn"),

    // Invoice Modal
    invoiceModal: document.getElementById("invoiceModal"),
    closeInvoiceBtn: document.getElementById("closeInvoiceBtn"),
    invOrderRef: document.getElementById("invOrderRef"),
    invNumber: document.getElementById("invNumber"),
    invDate: document.getElementById("invDate"),
    invDoctor: document.getElementById("invDoctor"),
    invClinic: document.getElementById("invClinic"),
    invAddress: document.getElementById("invAddress"),
    invGstin: document.getElementById("invGstin"),
    invDci: document.getElementById("invDci"),
    invAwb: document.getElementById("invAwb"),
    invTableItems: document.getElementById("invTableItems"),
    invTaxableSubtotal: document.getElementById("invTaxableSubtotal"),
    invGrossTotal: document.getElementById("invGrossTotal"),
    invCgstAmount: document.getElementById("invCgstAmount"),
    invSgstAmount: document.getElementById("invSgstAmount"),
    invFinalTotal: document.getElementById("invFinalTotal"),
    trackThisNewOrderBtn: document.getElementById("trackThisNewOrderBtn"),

    // Tracking Modal
    trackModal: document.getElementById("trackModal"),
    closeTrackBtn: document.getElementById("closeTrackBtn"),
    trackInputAwb: document.getElementById("trackInputAwb"),
    trackSubmitBtn: document.getElementById("trackSubmitBtn"),
    trackAwbDisplay: document.getElementById("trackAwbDisplay"),

    // Pincode Modal
    pincodeModal: document.getElementById("pincodeModal"),
    closePincodeBtn: document.getElementById("closePincodeBtn"),
    pincodeCheckInput: document.getElementById("pincodeCheckInput"),
    verifyPincodeBtn: document.getElementById("verifyPincodeBtn"),
    pincodeResultBox: document.getElementById("pincodeResultBox"),

    // B2B Modal
    b2bModal: document.getElementById("b2bModal"),
    closeB2bBtn: document.getElementById("closeB2bBtn"),

    // WhatsApp Floating Button
    whatsappOrderBtn: document.getElementById("whatsappOrderBtn"),

    // Toast Container
    toastStack: document.getElementById("toastStack")
  };

  // Format INR Currency
  function formatINR(amount) {
    return '₹' + Math.round(amount).toLocaleString('en-IN');
  }

  // ==========================================
  // 5. TOAST NOTIFICATION SYSTEM
  // ==========================================
  function showToast(message, type = 'info') {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✓' : 'ℹ️'}</span>
      <span class="toast-msg">${message}</span>
    `;
    Elements.toastStack.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ==========================================
  // 6. RENDER PRODUCT CATALOG GRID
  // ==========================================
  function renderProductsGrid() {
    filterAndSortProducts();

    if (State.filteredProducts.length === 0) {
      Elements.productsGrid.innerHTML = `
        <div class="no-products-msg" style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #fff; border-radius: 12px; border: 1px dashed #cbd5e1;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">🔍</div>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: #0f2438;">No Dental Imports Found</h3>
          <p style="color: #64748b; font-size: 0.875rem; margin-top: 0.25rem;">Try adjusting your search keywords, origin countries, or price filters.</p>
          <button class="btn btn-primary" style="margin-top: 1rem;" onclick="window.IndoDentApp.resetAllFilters()">Reset All Filters</button>
        </div>
      `;
      Elements.resultsCount.textContent = "0 products found";
      renderActiveFilterChips();
      return;
    }

    Elements.resultsCount.textContent = `${State.filteredProducts.length} imported product${State.filteredProducts.length > 1 ? 's' : ''} found`;

    Elements.productsGrid.innerHTML = State.filteredProducts.map(prod => {
      const itcSave = Math.round(prod.price * (prod.gstRate / (100 + prod.gstRate)));
      const deliveryDate = getEstimatedDeliveryLabel();

      return `
        <article class="product-card" data-id="${prod.id}">
          <div class="card-badge-row">
            <span class="choice-badge"><span class="highlight">Murugan Impex</span> Choice</span>
            <span class="origin-badge">${prod.originFlag} ${prod.origin}</span>
          </div>

          <div class="card-img-wrapper" onclick="window.IndoDentApp.openProductGWindow(${prod.id})">
            <img src="${prod.image}" alt="${prod.title}" class="card-img" loading="lazy">
            <div class="card-gwindow-overlay">
              <button class="gwindow-trigger-btn" type="button">
                <span>🔍 Open G-Window™</span>
              </button>
            </div>
            <div class="cdsco-cert-ribbon">
              <span>CDSCO: ${prod.cdscoNumber.split('/').slice(-2).join('/')}</span>
            </div>
          </div>

          <span class="card-brand">${prod.brand}</span>
          <h3 class="card-title" onclick="window.IndoDentApp.openProductGWindow(${prod.id})" title="${prod.title}">${prod.title}</h3>

          <div class="card-rating-row">
            <span class="star-rating">★★★★★</span>
            <span class="rating-val" style="font-weight: 700; font-size: 0.8125rem;">${prod.rating}</span>
            <span class="rating-count">(${prod.reviewsCount} clinics)</span>
          </div>

          <div class="card-price-block">
            <div class="price-main-line">
              <span class="card-discount-tag">-${prod.discountPercent}%</span>
              <span class="card-price-inr">${formatINR(prod.price)}</span>
              <span class="card-mrp-strike">${formatINR(prod.mrp)}</span>
            </div>
            <div class="card-gst-benefit">
              <span>Save ${formatINR(itcSave)} via 18% GST Input Credit</span>
            </div>
          </div>

          <div class="card-delivery-line">
            <span>FREE Medical Delivery <strong>${deliveryDate}</strong></span>
          </div>

          <div class="card-actions">
            <button class="btn btn-sm btn-gwindow-card" onclick="window.IndoDentApp.openProductGWindow(${prod.id})">
              <span>G-Window™</span>
            </button>
            <button class="btn btn-sm btn-add-cart" onclick="window.IndoDentApp.addToCart(${prod.id}, 1)">
              <span>Add to Cart</span>
            </button>
          </div>
        </article>
      `;
    }).join("");

    renderActiveFilterChips();
  }

  function getEstimatedDeliveryLabel() {
    const pinData = INDIAN_PINCODES_DATABASE[State.currentPincode];
    return pinData ? pinData.tat : "Tomorrow by 11 AM";
  }

  // ==========================================
  // 7. FILTER & SORT LOGIC
  // ==========================================
  function filterAndSortProducts() {
    let list = [...State.products];

    // Category Filter
    if (State.activeCategory !== "all") {
      list = list.filter(p => p.category.toLowerCase() === State.activeCategory.toLowerCase());
    }

    // Search Query
    if (State.searchQuery.trim()) {
      const q = State.searchQuery.toLowerCase().trim();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Country of Origin
    if (State.selectedOrigins.size > 0) {
      list = list.filter(p => State.selectedOrigins.has(p.origin));
    }

    // Regulatory Certifications
    if (State.selectedCerts.size > 0) {
      list = list.filter(p => {
        let match = false;
        if (State.selectedCerts.has("CDSCO") && p.cdscoNumber) match = true;
        if (State.selectedCerts.has("CE") && p.origin !== "USA") match = true;
        if (State.selectedCerts.has("FDA") && (p.origin === "USA" || p.origin === "Switzerland")) match = true;
        if (State.selectedCerts.has("ISO")) match = true;
        return match;
      });
    }

    // Bulk Tiers
    if (State.selectedTiers.size > 0) {
      list = list.filter(p => State.selectedTiers.has(p.tierBulk));
    }

    // Prime Only
    if (State.primeOnly) {
      list = list.filter(p => p.isPrime);
    }

    // Max Price
    list = list.filter(p => p.price <= State.maxPrice);

    // Min Rating
    if (State.minRating > 0) {
      list = list.filter(p => p.rating >= State.minRating);
    }

    // Sorting
    switch (State.currentSort) {
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        list.sort((a, b) => b.discountPercent - a.discountPercent);
        break;
      default: // 'featured'
        list.sort((a, b) => a.id - b.id);
        break;
    }

    State.filteredProducts = list;
  }

  // Active filter chips
  function renderActiveFilterChips() {
    const chips = [];

    if (State.activeCategory !== 'all') {
      chips.push({ label: `Category: ${State.activeCategory}`, type: 'category' });
    }
    if (State.searchQuery) {
      chips.push({ label: `"${State.searchQuery}"`, type: 'search' });
    }
    State.selectedOrigins.forEach(origin => {
      chips.push({ label: origin, type: 'origin', val: origin });
    });
    State.selectedCerts.forEach(cert => {
      chips.push({ label: cert, type: 'cert', val: cert });
    });
    if (State.primeOnly) {
      chips.push({ label: "Prime Medical Express", type: 'prime' });
    }
    if (State.maxPrice < 15000) {
      chips.push({ label: `Under ${formatINR(State.maxPrice)}`, type: 'price' });
    }
    if (State.minRating > 0) {
      chips.push({ label: `${State.minRating}★ & Up`, type: 'rating' });
    }

    Elements.activeFilterChips.innerHTML = chips.map(c => `
      <span class="chip-tag">
        ${c.label}
        <button class="chip-remove-btn" onclick="window.IndoDentApp.removeFilter('${c.type}', '${c.val || ''}')">&times;</button>
      </span>
    `).join("");
  }

  // ==========================================
  // 8. THE G-WINDOW™ QUALITY INSPECTOR ENGINE
  // ==========================================
  function openProductGWindow(productId) {
    const product = State.products.find(p => p.id === productId);
    if (!product) return;

    State.activeGWindowProduct = product;
    State.gWindowSelectedQty = 1;
    State.gWindowSelectedDiscount = 0;

    // Populate data
    Elements.gWindowModalTitle.textContent = `${product.title}`;
    Elements.gWindowMainImg.src = product.image;
    Elements.gWindowMainImg.alt = product.title;
    Elements.gWindowOriginStamp.innerHTML = `
      <span class="flag">${product.originFlag}</span>
      <span class="country">${product.origin.toUpperCase()}</span>
    `;
    Elements.gWindowCdscoNumber.textContent = product.cdscoNumber;

    Elements.gWindowBrand.textContent = product.brand;
    Elements.gWindowProdName.textContent = product.title;
    Elements.gWindowRating.textContent = product.rating;
    Elements.gWindowReviewCount.textContent = `(${product.reviewsCount} Verified Indian Dental Practitioners)`;

    // Customs Ledger
    Elements.gWindowPort.textContent = product.portOfEntry;
    Elements.gWindowBoe.textContent = product.boeNumber;
    Elements.gWindowOrigin.textContent = `${product.originFlag} ${product.origin}`;
    Elements.gWindowStorage.textContent = product.storageTemp;
    Elements.gWindowExpiry.textContent = product.expiryDate;
    Elements.gWindowSterilization.textContent = product.sterilization;

    // Indications & Description
    Elements.gWindowDescription.textContent = product.description;

    // Specs table
    Elements.gWindowSpecsTable.innerHTML = product.specs.map(s => `
      <tr>
        <td>${s.label}</td>
        <td><strong>${s.value}</strong></td>
      </tr>
    `).join("");

    // Calculate Tiers
    const p1 = product.price;
    const p5 = Math.round(product.price * 5 * 0.88); // 12% off
    const p20 = Math.round(product.price * 20 * 0.78); // 22% off

    Elements.tier1Price.textContent = formatINR(p1);
    Elements.tier5Price.textContent = formatINR(p5);
    Elements.tier20Price.textContent = formatINR(p20);

    // Reset Tier Cards
    const tierCards = document.querySelectorAll(".tier-card");
    tierCards.forEach(card => card.classList.remove("active"));
    if (tierCards[0]) tierCards[0].classList.add("active");

    updateGWindowPriceDisplay();

    // Show Dialog
    if (typeof Elements.gWindowModal.showModal === 'function') {
      Elements.gWindowModal.showModal();
    } else {
      Elements.gWindowModal.setAttribute("open", "true");
    }
  }

  function updateGWindowPriceDisplay() {
    const prod = State.activeGWindowProduct;
    if (!prod) return;

    const baseUnit = prod.price;
    const qty = State.gWindowSelectedQty;
    const discountMultiplier = (100 - State.gWindowSelectedDiscount) / 100;
    const finalAmount = Math.round(baseUnit * qty * discountMultiplier);
    const mrpAmount = prod.mrp * qty;
    const itcAmount = Math.round(finalAmount * (prod.gstRate / (100 + prod.gstRate)));

    Elements.gWindowFinalPrice.textContent = formatINR(finalAmount);
    Elements.gWindowMrp.textContent = formatINR(mrpAmount);
    Elements.gWindowDiscountBadge.textContent = `${prod.discountPercent + State.gWindowSelectedDiscount}% OFF`;
    Elements.gWindowGstSave.textContent = `Includes ${prod.gstRate}% GST (ITC Tax Benefit: ${formatINR(itcAmount)})`;
  }

  // Setup interactive zoom lens for G-Window inspection
  function setupGWindowInspectionLens() {
    const viewport = Elements.gWindowViewport;
    const img = Elements.gWindowMainImg;
    const crosshair = Elements.gWindowCrosshair;

    viewport.addEventListener("mousemove", (e) => {
      const rect = viewport.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      crosshair.style.display = "block";
      crosshair.style.left = `${x}px`;
      crosshair.style.top = `${y}px`;

      img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
      img.style.transform = "scale(2.2)";
    });

    viewport.addEventListener("mouseleave", () => {
      crosshair.style.display = "none";
      img.style.transformOrigin = "center center";
      img.style.transform = "scale(1)";
    });

    // View toggles
    const viewButtons = document.querySelectorAll(".view-thumb-btn");
    viewButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        viewButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const view = btn.dataset.view;

        if (view === 'pack') {
          showToast("Sterile barrier seal view selected", "info");
        } else if (view === 'batch') {
          showToast(`Inspecting Lot: ${State.activeGWindowProduct ? State.activeGWindowProduct.batchLot : 'Verified'}`, "info");
        } else if (view === 'customs') {
          showToast("Customs bill of entry & CDSCO inspection report verified", "success");
        }
      });
    });

    // Tier Cards
    const tierCards = document.querySelectorAll(".tier-card");
    tierCards.forEach(card => {
      card.addEventListener("click", () => {
        tierCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        State.gWindowSelectedQty = parseInt(card.dataset.qty, 10);
        State.gWindowSelectedDiscount = parseInt(card.dataset.discount, 10);
        updateGWindowPriceDisplay();
      });
    });

    // CoA Download button
    Elements.gWindowDownloadCoaBtn.addEventListener("click", () => {
      if (!State.activeGWindowProduct) return;
      showToast(`Generating Certificate of Analysis (CoA) PDF for Lot: ${State.activeGWindowProduct.batchLot}...`, "success");
      setTimeout(() => {
        showToast(`Downloaded: CoA_${State.activeGWindowProduct.batchLot}.pdf (Central Drug Testing Laboratory Certified)`, "success");
      }, 1000);
    });

    // G-Window Add to cart & buy now
    Elements.gWindowAddToCartBtn.addEventListener("click", () => {
      if (!State.activeGWindowProduct) return;
      addToCart(State.activeGWindowProduct.id, State.gWindowSelectedQty);
      Elements.gWindowModal.close();
    });

    Elements.gWindowBuyNowBtn.addEventListener("click", () => {
      if (!State.activeGWindowProduct) return;
      addToCart(State.activeGWindowProduct.id, State.gWindowSelectedQty);
      Elements.gWindowModal.close();
      openCheckoutModal();
    });
  }

  // ==========================================
  // 9. CART & LOCAL STORAGE STATE
  // ==========================================
  function saveCart() {
    localStorage.setItem("indodent_cart", JSON.stringify(State.cart));
    updateCartUI();
  }

  function addToCart(productId, quantity = 1) {
    const product = State.products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = State.cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      State.cart[existingIndex].qty += quantity;
    } else {
      State.cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        mrp: product.mrp,
        image: product.image,
        origin: product.origin,
        originFlag: product.originFlag,
        gstRate: product.gstRate,
        hsnCode: product.hsnCode,
        batchLot: product.batchLot,
        qty: quantity
      });
    }

    saveCart();
    showToast(`Added ${quantity}x ${product.title.split(' ')[0]} to Clinic Cart!`, "success");
    openCartDrawer();
  }

  function updateCartItemQty(productId, delta) {
    const item = State.cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      State.cart = State.cart.filter(i => i.id !== productId);
    }
    saveCart();
  }

  function removeCartItem(productId) {
    State.cart = State.cart.filter(i => i.id !== productId);
    saveCart();
    showToast("Item removed from cart.", "info");
  }

  function updateCartUI() {
    const totalCount = State.cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotalMrp = State.cart.reduce((sum, item) => sum + (item.mrp * item.qty), 0);
    const subtotalDeal = State.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const savings = subtotalMrp - subtotalDeal;

    let finalPayable = subtotalDeal;
    if (State.activePromo) {
      finalPayable = Math.max(0, finalPayable - State.promoDiscount);
    }

    // 18% GST portion calculation
    const gstPortion = Math.round(finalPayable * 0.18 / 1.18);
    const taxableValue = finalPayable - gstPortion;

    // Header Badges
    Elements.cartCountBadge.textContent = totalCount;
    Elements.cartTotalHeader.textContent = formatINR(finalPayable);
    Elements.cartDrawerCount.textContent = totalCount;
    Elements.checkoutItemCount.textContent = totalCount;

    // Drawer summary
    Elements.cartSubtotalMrp.textContent = formatINR(subtotalMrp);
    Elements.cartDiscountAmount.textContent = `-${formatINR(savings + (State.promoDiscount || 0))}`;
    Elements.cartTaxableValue.textContent = formatINR(taxableValue);
    Elements.cartGstAmount.textContent = formatINR(gstPortion);
    Elements.cartPayableTotal.textContent = formatINR(finalPayable);
    Elements.itcSavingsDisplay.textContent = formatINR(gstPortion);

    // Items list
    if (State.cart.length === 0) {
      Elements.cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <div class="icon">🛒</div>
          <h4>Your Dental Clinic Cart is Empty</h4>
          <p>Browse imported bone grafts, titanium implants, and zirconia discs to place orders.</p>
        </div>
      `;
      Elements.proceedToCheckoutBtn.disabled = true;
    } else {
      Elements.proceedToCheckoutBtn.disabled = false;
      Elements.cartItemsContainer.innerHTML = State.cart.map(item => `
        <div class="cart-item-card" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" class="cart-item-img">
          <div class="cart-item-meta">
            <h4 class="cart-item-title">${item.title}</h4>
            <span class="cart-item-origin">${item.originFlag} ${item.origin} • Lot: ${item.batchLot}</span>
            <span class="cart-item-price">${formatINR(item.price * item.qty)} <small style="color:#64748b; font-weight:normal;">(${formatINR(item.price)} each)</small></span>
            <div class="cart-qty-stepper">
              <button class="qty-btn" onclick="window.IndoDentApp.updateCartQty(${item.id}, -1)">−</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" onclick="window.IndoDentApp.updateCartQty(${item.id}, 1)">+</button>
            </div>
          </div>
          <button class="cart-remove-item" onclick="window.IndoDentApp.removeCartItem(${item.id})" title="Remove item">&times;</button>
        </div>
      `).join("");
    }
  }

  function openCartDrawer() {
    Elements.cartDrawer.classList.add("open");
    Elements.cartDrawer.setAttribute("aria-hidden", "false");
  }

  function closeCartDrawer() {
    Elements.cartDrawer.classList.remove("open");
    Elements.cartDrawer.setAttribute("aria-hidden", "true");
  }

  // ==========================================
  // 10. CHECKOUT & INVOICE GENERATION
  // ==========================================
  function openCheckoutModal() {
    if (State.cart.length === 0) {
      showToast("Your cart is empty. Add products to proceed.", "info");
      return;
    }

    closeCartDrawer();

    const subtotalDeal = State.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const subtotalMrp = State.cart.reduce((sum, item) => sum + (item.mrp * item.qty), 0);
    const savings = subtotalMrp - subtotalDeal + (State.promoDiscount || 0);
    const finalTotal = Math.max(0, subtotalDeal - (State.promoDiscount || 0));

    const totalGst = Math.round(finalTotal * 0.18 / 1.18);
    const cgst = Math.round(totalGst / 2);
    const sgst = totalGst - cgst;

    Elements.coSubtotal.textContent = formatINR(subtotalDeal);
    Elements.coSavings.textContent = `-${formatINR(savings)}`;
    Elements.coCgst.textContent = formatINR(cgst);
    Elements.coSgst.textContent = formatINR(sgst);
    Elements.coGrandTotal.textContent = formatINR(finalTotal);

    Elements.checkoutItemsMini.innerHTML = State.cart.map(item => `
      <div class="mini-item-row">
        <span class="mini-item-name">${item.qty}x ${item.title}</span>
        <span class="mini-item-price"><strong>${formatINR(item.price * item.qty)}</strong></span>
      </div>
    `).join("");

    if (typeof Elements.checkoutModal.showModal === 'function') {
      Elements.checkoutModal.showModal();
    } else {
      Elements.checkoutModal.setAttribute("open", "true");
    }
  }

  function confirmAndPlaceOrder() {
    const doctorName = document.getElementById("doctorName").value.trim() || "Dr. Rohan Sharma";
    const dciNumber = document.getElementById("dentalRegNo").value.trim() || "DCI-MH-44912";
    const clinicName = document.getElementById("clinicName").value.trim() || "Apex Implantology Dental Center";
    const gstin = document.getElementById("clinicGstin").value.trim() || "27AABCA1294F1Z8";
    const address = document.getElementById("shippingAddress").value.trim() || "Suite 402, Lotus Medical Enclave, Andheri West";
    const city = document.getElementById("shippingCity").value.trim() || "Mumbai";
    const pincode = document.getElementById("shippingPincode").value.trim() || "400053";
    const state = document.getElementById("shippingState").value || "Maharashtra";

    const orderId = `MI-BOM-${Math.floor(100000 + Math.random() * 900000)}`;
    const awbId = `BD-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const invoiceNumber = `MI/2026/${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    // Populate Invoice Modal
    Elements.invOrderRef.textContent = orderId;
    Elements.invNumber.textContent = invoiceNumber;
    Elements.invDate.textContent = today;
    Elements.invDoctor.textContent = doctorName;
    Elements.invClinic.textContent = clinicName;
    Elements.invAddress.textContent = `${address}, ${city}, ${state} - ${pincode}`;
    Elements.invGstin.textContent = gstin;
    Elements.invDci.textContent = dciNumber;
    Elements.invAwb.textContent = awbId;

    let taxableSum = 0;
    let grossSum = 0;

    Elements.invTableItems.innerHTML = State.cart.map((item, index) => {
      const lineTotal = item.price * item.qty;
      const lineGst = Math.round(lineTotal * (item.gstRate / (100 + item.gstRate)));
      const lineTaxable = lineTotal - lineGst;
      const unitTaxable = (lineTaxable / item.qty).toFixed(2);

      taxableSum += lineTaxable;
      grossSum += lineTotal;

      return `
        <tr>
          <td>${index + 1}</td>
          <td><strong>${item.title}</strong></td>
          <td>${item.origin}</td>
          <td><code>${item.batchLot}</code></td>
          <td>${item.hsnCode}</td>
          <td>${item.qty}</td>
          <td>${formatINR(unitTaxable)}</td>
          <td>${formatINR(lineTaxable)}</td>
          <td>${item.gstRate}%</td>
          <td><strong>${formatINR(lineTotal)}</strong></td>
        </tr>
      `;
    }).join("");

    const cgst = Math.round((grossSum - taxableSum) / 2);
    const sgst = (grossSum - taxableSum) - cgst;

    Elements.invTaxableSubtotal.textContent = formatINR(taxableSum);
    Elements.invGrossTotal.textContent = formatINR(grossSum);
    Elements.invCgstAmount.textContent = formatINR(cgst);
    Elements.invSgstAmount.textContent = formatINR(sgst);
    Elements.invFinalTotal.textContent = formatINR(grossSum);

    // Update cargo tracking default
    Elements.trackInputAwb.value = awbId;
    Elements.trackAwbDisplay.textContent = awbId;

    // Clear cart and show invoice
    State.cart = [];
    saveCart();
    Elements.checkoutModal.close();

    if (typeof Elements.invoiceModal.showModal === 'function') {
      Elements.invoiceModal.showModal();
    } else {
      Elements.invoiceModal.setAttribute("open", "true");
    }

    showToast("🎉 Order Placed & Tax Invoice Generated Successfully!", "success");
  }

  // ==========================================
  // 11. PINCODE VERIFIER & CARGO TRACKER
  // ==========================================
  function verifyPincode(pincode) {
    pincode = pincode.trim();
    if (!/^\d{6}$/.test(pincode)) {
      Elements.pincodeResultBox.style.display = "block";
      Elements.pincodeResultBox.innerHTML = `
        <span style="color: #ef4444; font-weight: 700;">⚠️ Invalid Pincode</span>
        <p style="margin-top: 0.25rem;">Please enter a valid 6-digit Indian Postal Code.</p>
      `;
      return;
    }

    const pinData = INDIAN_PINCODES_DATABASE[pincode] || {
      city: "Regional City",
      state: "India",
      tat: "48-72 Hours Standard Express",
      hub: "Nearest Medical Cargo Transit",
      coldChain: "Yes (Validated)",
      courier: "Delhivery Surface / BlueDart"
    };

    State.currentPincode = pincode;
    State.currentLocationName = `${pinData.city} (${pincode})`;
    Elements.headerLocationDisplay.textContent = `${pinData.city.split(' ')[0]} ${pincode}`;

    Elements.pincodeResultBox.style.display = "block";
    Elements.pincodeResultBox.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.5rem; margin-bottom: 0.5rem;">
        <strong style="color: #059669; font-size: 0.9rem;">✅ Serviceable by Murugan Impex Express</strong>
        <span style="background: #00a896; color: #fff; font-size: 0.65rem; font-weight: bold; padding: 2px 6px; border-radius: 4px;">FAST DISPATCH</span>
      </div>
      <p><strong>Destination:</strong> ${pinData.city}, ${pinData.state}</p>
      <p><strong>Estimated Arrival:</strong> <span style="color: #028090; font-weight: bold;">${pinData.tat}</span></p>
      <p><strong>Primary Hub:</strong> ${pinData.hub}</p>
      <p><strong>Air Cargo Courier:</strong> ${pinData.courier}</p>
      <p><strong>Cold-Chain Guarantee:</strong> 15°C–25°C Data-Logged Packaging Active</p>
      <button class="btn btn-sm btn-primary" style="margin-top: 0.6rem; width: 100%;" onclick="window.IndoDentApp.closePincodeModal()">Set Delivery Address</button>
    `;

    renderProductsGrid();
    showToast(`Delivery location set to ${pinData.city} (${pincode})`, "success");
  }

  // ==========================================
  // 12. PROMO CODE COUPON HANDLER
  // ==========================================
  function applyPromoCode() {
    const code = Elements.promoCodeInput.value.trim().toUpperCase();
    if (!code) return;

    if (code === "EXPO2026") {
      const subtotalDeal = State.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      State.activePromo = "EXPO2026";
      State.promoDiscount = Math.round(subtotalDeal * 0.10);
      Elements.promoFeedbackMsg.className = "promo-feedback success";
      Elements.promoFeedbackMsg.textContent = `🎉 Coupon EXPO2026 Applied: 10% Clinic Discount (-${formatINR(State.promoDiscount)})`;
      updateCartUI();
    } else if (code === "CLINIC500") {
      State.activePromo = "CLINIC500";
      State.promoDiscount = 500;
      Elements.promoFeedbackMsg.className = "promo-feedback success";
      Elements.promoFeedbackMsg.textContent = `🎉 Coupon CLINIC500 Applied: Flat ₹500 Off!`;
      updateCartUI();
    } else {
      Elements.promoFeedbackMsg.className = "promo-feedback error";
      Elements.promoFeedbackMsg.textContent = "❌ Invalid Coupon Code. Try EXPO2026 or CLINIC500.";
    }
  }

  // ==========================================
  // 13. AUTO-SUGGESTIONS & SEARCH
  // ==========================================
  function setupSearchAutoSuggestions() {
    const input = Elements.mainSearchInput;
    const list = Elements.searchSuggestionsList;
    const clearBtn = Elements.clearSearchBtn;

    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      clearBtn.style.display = query ? "block" : "none";

      if (!query) {
        list.style.display = "none";
        State.searchQuery = "";
        renderProductsGrid();
        return;
      }

      State.searchQuery = query;
      const matches = State.products.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.origin.toLowerCase().includes(query)
      );

      if (matches.length > 0) {
        list.style.display = "block";
        list.innerHTML = matches.slice(0, 5).map(m => `
          <div class="suggestion-item" data-id="${m.id}">
            <span>${m.title}</span>
            <span class="sugg-cat">${m.originFlag} ${m.category}</span>
          </div>
        `).join("");

        list.querySelectorAll(".suggestion-item").forEach(item => {
          item.addEventListener("click", () => {
            const id = parseInt(item.dataset.id, 10);
            input.value = item.querySelector("span").textContent;
            list.style.display = "none";
            openProductGWindow(id);
          });
        });
      } else {
        list.style.display = "none";
      }

      renderProductsGrid();
    });

    clearBtn.addEventListener("click", () => {
      input.value = "";
      clearBtn.style.display = "none";
      list.style.display = "none";
      State.searchQuery = "";
      renderProductsGrid();
    });

    Elements.searchSubmitBtn.addEventListener("click", () => {
      State.searchQuery = input.value.trim().toLowerCase();
      list.style.display = "none";
      renderProductsGrid();
    });

    document.addEventListener("click", (e) => {
      if (!input.contains(e.target) && !list.contains(e.target)) {
        list.style.display = "none";
      }
    });

    Elements.searchCategorySelect.addEventListener("change", (e) => {
      State.activeCategory = e.target.value;
      updateSubNavActiveState(State.activeCategory);
      renderProductsGrid();
    });
  }

  function updateSubNavActiveState(cat) {
    document.querySelectorAll(".sub-link").forEach(link => {
      if (link.dataset.cat === cat) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // ==========================================
  // 14. EVENT LISTENERS SETUP
  // ==========================================
  function setupEventListeners() {
    // Header cart drawer toggle
    Elements.cartToggleBtn.addEventListener("click", openCartDrawer);
    Elements.closeCartDrawerBtn.addEventListener("click", closeCartDrawer);
    Elements.cartDrawerBackdrop.addEventListener("click", closeCartDrawer);
    Elements.continueShoppingBtn.addEventListener("click", closeCartDrawer);

    // Proceed to checkout
    Elements.proceedToCheckoutBtn.addEventListener("click", openCheckoutModal);
    Elements.closeCheckoutBtn.addEventListener("click", () => Elements.checkoutModal.close());
    Elements.confirmPlaceOrderBtn.addEventListener("click", confirmAndPlaceOrder);

    // G-Window close
    Elements.closeGWindowBtn.addEventListener("click", () => Elements.gWindowModal.close());

    // Invoice close
    Elements.closeInvoiceBtn.addEventListener("click", () => Elements.invoiceModal.close());
    Elements.trackThisNewOrderBtn.addEventListener("click", () => {
      Elements.invoiceModal.close();
      if (typeof Elements.trackModal.showModal === 'function') {
        Elements.trackModal.showModal();
      }
    });

    // Pincode Modal
    Elements.locationPickerBtn.addEventListener("click", () => Elements.pincodeModal.showModal());
    Elements.pincodeCheckSidebarBtn.addEventListener("click", () => Elements.pincodeModal.showModal());
    Elements.openPincodeLookupHeroBtn.addEventListener("click", () => Elements.pincodeModal.showModal());
    Elements.closePincodeBtn.addEventListener("click", () => Elements.pincodeModal.close());

    Elements.verifyPincodeBtn.addEventListener("click", () => {
      verifyPincode(Elements.pincodeCheckInput.value);
    });

    document.querySelectorAll(".metro-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const pin = chip.dataset.pin;
        Elements.pincodeCheckInput.value = pin;
        verifyPincode(pin);
      });
    });

    // Tracking Modal
    Elements.headerTrackOrdersBtn.addEventListener("click", () => Elements.trackModal.showModal());
    Elements.topTrackBtn.addEventListener("click", () => Elements.trackModal.showModal());
    Elements.closeTrackBtn.addEventListener("click", () => Elements.trackModal.close());
    Elements.trackSubmitBtn.addEventListener("click", () => {
      const awb = Elements.trackInputAwb.value.trim() || "BD-91823901";
      Elements.trackAwbDisplay.textContent = awb;
      showToast(`Refreshed live telemetry for AWB: ${awb}`, "info");
    });

    // B2B Quote Modal
    Elements.topB2bQuoteBtn.addEventListener("click", () => Elements.b2bModal.showModal());
    Elements.closeB2bBtn.addEventListener("click", () => Elements.b2bModal.close());

    // WhatsApp Contact
    Elements.whatsappOrderBtn.addEventListener("click", () => {
      const text = encodeURIComponent("Hello Murugan Impex Team, I am Dr. Rohan Sharma (MDS). I would like to inquire about bulk imported bone grafts and titanium implants under CDSCO registration.");
      window.open(`https://api.whatsapp.com/send?phone=919820154321&text=${text}`, "_blank");
    });

    // Hero buttons
    Elements.exploreAllProductsBtn.addEventListener("click", () => {
      document.getElementById("catalogSection").scrollIntoView({ behavior: 'smooth' });
    });

    Elements.launchDemoGWindowBtn.addEventListener("click", () => {
      openProductGWindow(1);
    });

    Elements.openGWindowGuide.addEventListener("click", () => {
      openProductGWindow(1);
    });

    Elements.dealsFilterNav.addEventListener("click", () => {
      State.currentSort = "discount";
      Elements.sortSelect.value = "discount";
      renderProductsGrid();
      document.getElementById("catalogSection").scrollIntoView({ behavior: 'smooth' });
      showToast("Filtered by Maximum Clinic Discount Deals!", "info");
    });

    // Sub-nav category buttons
    document.querySelectorAll(".sub-link[data-cat]").forEach(link => {
      link.addEventListener("click", () => {
        const cat = link.dataset.cat;
        State.activeCategory = cat;
        Elements.searchCategorySelect.value = cat;
        updateSubNavActiveState(cat);
        renderProductsGrid();
      });
    });

    // Strip categories
    document.querySelectorAll(".strip-item[data-category]").forEach(item => {
      item.addEventListener("click", () => {
        const cat = item.dataset.category;
        State.activeCategory = cat;
        Elements.searchCategorySelect.value = cat;
        updateSubNavActiveState(cat);
        renderProductsGrid();
        document.getElementById("catalogSection").scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Sidebar Category Filter
    document.querySelectorAll("#categoryFilterList .filter-opt").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#categoryFilterList .filter-opt").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        State.activeCategory = btn.dataset.cat;
        Elements.searchCategorySelect.value = btn.dataset.cat;
        renderProductsGrid();
      });
    });

    // Sidebar Origin Filter Checkboxes
    document.querySelectorAll(".origin-filter").forEach(cb => {
      cb.addEventListener("change", () => {
        if (cb.checked) {
          State.selectedOrigins.add(cb.value);
        } else {
          State.selectedOrigins.delete(cb.value);
        }
        renderProductsGrid();
      });
    });

    // Sidebar Certifications Filter
    document.querySelectorAll(".cert-filter").forEach(cb => {
      cb.addEventListener("change", () => {
        if (cb.checked) {
          State.selectedCerts.add(cb.value);
        } else {
          State.selectedCerts.delete(cb.value);
        }
        renderProductsGrid();
      });
    });

    // Sidebar Tier Filter
    document.querySelectorAll(".tier-filter").forEach(cb => {
      cb.addEventListener("change", () => {
        if (cb.checked) {
          State.selectedTiers.add(cb.value);
        } else {
          State.selectedTiers.delete(cb.value);
        }
        renderProductsGrid();
      });
    });

    // Prime filter
    Elements.filterPrimeOnly.addEventListener("change", (e) => {
      State.primeOnly = e.target.checked;
      renderProductsGrid();
    });

    // Price Slider
    Elements.priceRangeSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      State.maxPrice = val;
      Elements.priceDisplay.textContent = formatINR(val);
      renderProductsGrid();
    });

    // Rating Filter
    document.querySelectorAll(".rating-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        State.minRating = parseFloat(btn.dataset.rating);
        renderProductsGrid();
      });
    });

    // Sort control
    Elements.sortSelect.addEventListener("change", (e) => {
      State.currentSort = e.target.value;
      renderProductsGrid();
    });

    // Reset filters
    Elements.resetFiltersBtn.addEventListener("click", resetAllFilters);

    // Apply promo
    Elements.applyPromoBtn.addEventListener("click", applyPromoCode);

    // Back to top
    Elements.backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    Elements.brandLogoHome.addEventListener("click", (e) => {
      e.preventDefault();
      resetAllFilters();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function resetAllFilters() {
    State.activeCategory = "all";
    State.searchQuery = "";
    State.selectedOrigins.clear();
    State.selectedCerts.clear();
    State.selectedTiers.clear();
    State.primeOnly = false;
    State.maxPrice = 15000;
    State.minRating = 0;
    State.currentSort = "featured";

    Elements.mainSearchInput.value = "";
    Elements.clearSearchBtn.style.display = "none";
    Elements.searchCategorySelect.value = "all";
    Elements.sortSelect.value = "featured";
    Elements.filterPrimeOnly.checked = false;
    Elements.priceRangeSlider.value = 15000;
    Elements.priceDisplay.textContent = formatINR(15000);

    document.querySelectorAll(".origin-filter, .cert-filter, .tier-filter").forEach(cb => cb.checked = false);
    document.querySelectorAll("#categoryFilterList .filter-opt").forEach(b => {
      b.classList.toggle("active", b.dataset.cat === "all");
    });
    updateSubNavActiveState("all");

    renderProductsGrid();
    showToast("Filters reset to default view.", "info");
  }

  function removeFilter(type, val) {
    if (type === 'category') {
      State.activeCategory = 'all';
      Elements.searchCategorySelect.value = 'all';
      updateSubNavActiveState('all');
    } else if (type === 'search') {
      State.searchQuery = '';
      Elements.mainSearchInput.value = '';
      Elements.clearSearchBtn.style.display = 'none';
    } else if (type === 'origin') {
      State.selectedOrigins.delete(val);
      document.querySelectorAll(`.origin-filter[value="${val}"]`).forEach(cb => cb.checked = false);
    } else if (type === 'cert') {
      State.selectedCerts.delete(val);
      document.querySelectorAll(`.cert-filter[value="${val}"]`).forEach(cb => cb.checked = false);
    } else if (type === 'prime') {
      State.primeOnly = false;
      Elements.filterPrimeOnly.checked = false;
    } else if (type === 'price') {
      State.maxPrice = 15000;
      Elements.priceRangeSlider.value = 15000;
      Elements.priceDisplay.textContent = formatINR(15000);
    } else if (type === 'rating') {
      State.minRating = 0;
    }

    renderProductsGrid();
  }

  function submitB2BQuote() {
    const inst = document.getElementById("b2bInstName").value.trim();
    Elements.b2bModal.close();
    showToast(`Institutional RFQ submitted for ${inst}. Our Medical Director will send official rate contracts within 2 business hours.`, "success");
  }

  // ==========================================
  // 15. GLOBAL API & INITIALIZATION
  // ==========================================
  window.MuruganImpexApp = window.IndoDentApp = {
    openProductGWindow,
    addToCart,
    updateCartQty: updateCartItemQty,
    removeCartItem,
    openCheckoutModal,
    resetAllFilters,
    removeFilter,
    closePincodeModal: () => Elements.pincodeModal.close(),
    submitB2BQuote
  };

  // ==========================================
  // 16. PREMIUM UX ENHANCEMENTS
  // ==========================================

  function initScrollProgress() {
    const bar = document.getElementById('scrollProgressBar');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct  = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      bar.style.width = pct.toFixed(1) + '%';
    }, { passive: true });
  }

  function initStickyHeader() {
    const header = document.getElementById('mainHeader');
    if (!header) return;
    const threshold = 80;
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > threshold);
    }, { passive: true });
  }

  function animateCounter(el, target, suffix, duration) {
    const start = performance.now();
    const update = (now) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased   = 1 - Math.pow(1 - elapsed, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target).toLocaleString('en-IN') + suffix;
      if (elapsed < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  function initCounterAnimations() {
    const counters = [
      { selector: '.hero-stat-item:nth-child(1) .stat-num', target: 19500, suffix: '+', duration: 1600 },
      { selector: '.hero-stat-item:nth-child(2) .stat-num', target: 48,    suffix: 'h',  duration: 800  },
      { selector: '.hero-stat-item:nth-child(3) .stat-num', target: 100,   suffix: '%', duration: 1000 },
    ];

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        counters.forEach(({ selector, target, suffix, duration }) => {
          const el = document.querySelector(selector);
          if (el && !el.dataset.counted) {
            el.dataset.counted = '1';
            animateCounter(el, target, suffix, duration);
          }
        });
        observer.disconnect();
      });
    }, { threshold: 0.3 });

    const heroStats = document.querySelector('.hero-badges-row');
    if (heroStats) observer.observe(heroStats);
  }

  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.trust-feature-card, .strip-item, .footer-col').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)';
      observer.observe(el);
    });
  }

  function initWhatsAppBtn() {
    const btn = document.getElementById('whatsappOrderBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const msg = encodeURIComponent(
        'Hello Murugan Impex 👋\n\nI am a dental professional and would like to enquire about importing the following dental byproducts:\n\n[Please list your requirements here]\n\nClinic/Hospital Name:\nGSTIN:\nPincode:\n\nPlease share pricing and availability.'
      );
      window.open(`https://wa.me/918008008008?text=${msg}`, '_blank', 'noopener,noreferrer');
    });
  }

  function initBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', () => {
      btn.style.opacity = window.scrollY > 400 ? '1' : '0.5';
    }, { passive: true });
  }

  function initCategoryStripClicks() {
    document.querySelectorAll('.strip-item[data-category]').forEach(item => {
      item.addEventListener('click', () => {
        const cat = item.dataset.category;
        if (typeof State !== 'undefined') {
          State.activeCategory = cat;
          if (Elements.searchCategorySelect) Elements.searchCategorySelect.value = cat;
          updateSubNavActiveState(cat);
          renderProductsGrid();
          document.getElementById('catalogSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // Run initialization
  document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    setupSearchAutoSuggestions();
    setupGWindowInspectionLens();
    updateCartUI();
    renderProductsGrid();

    // Premium UX layer
    initScrollProgress();
    initStickyHeader();
    initCounterAnimations();
    initScrollReveal();
    initWhatsAppBtn();
    initBackToTop();
    initCategoryStripClicks();
  });

})();

