// Power Tools Store - Sri Lanka Catalog Data
const PRODUCTS = [
  {
    id: "PT-001",
    name: "DongCheng 26mm Rotary Hammer Drill (800W)",
    brand: "DongCheng",
    category: "drills",
    price: 24500,
    originalPrice: 28000,
    rating: 4.8,
    reviewsCount: 34,
    badge: "Best Seller",
    warranty: "6 Months Company Warranty",
    inStock: true,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    description: "Heavy-duty 800W rotary hammer suitable for concrete drilling, chiseling and masonry work. Features 3-mode operation (drill, hammer drill, chisel).",
    specs: {
      "Rated Power Input": "800W",
      "No-Load Speed": "0-1180 r/min",
      "Impact Rate": "0-4000 /min",
      "Max Drilling Concrete": "26 mm",
      "Chuck Type": "SDS-Plus",
      "Net Weight": "2.93 kg"
    },
    includes: ["Rotary Hammer Drill", "3 SDS Drill Bits", "2 Chisels (Point & Flat)", "Depth Gauge", "Auxiliary Handle", "Heavy Duty Carrying Case"]
  },
  {
    id: "PT-002",
    name: "Makita 4-Inch Angle Grinder 9556HN (840W)",
    brand: "Makita",
    category: "grinders",
    price: 29800,
    originalPrice: 33500,
    rating: 4.9,
    reviewsCount: 58,
    badge: "Contractor Choice",
    warranty: "1 Year Official Warranty",
    inStock: true,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80",
    description: "Compact and powerful 840W motor delivers 11,000 RPM. Labyrinth construction seals motor and bearings from dust and debris for maximum lifespan.",
    specs: {
      "Continuous Rating": "840W",
      "Wheel Diameter": "100 mm (4\")",
      "No Load Speed": "11,000 RPM",
      "Spindle Thread": "M10 x 1.5",
      "Overall Length": "271 mm",
      "Net Weight": "1.9 kg"
    },
    includes: ["Angle Grinder Unit", "Grinding Wheel", "Wheel Guard", "Lock Nut Wrench", "Side Grip"]
  },
  {
    id: "PT-003",
    name: "DeWalt 20V MAX Brushless Cordless Drill / Driver",
    brand: "DeWalt",
    category: "cordless",
    price: 58500,
    originalPrice: 65000,
    rating: 5.0,
    reviewsCount: 42,
    badge: "Top Rated",
    warranty: "2 Years Limited Warranty",
    inStock: true,
    image: "https://images.unsplash.com/photo-1622372738946-62e02505feb3?auto=format&fit=crop&w=800&q=80",
    description: "High-performance brushless motor delivers 340 unit watts out (UWO). Compact, lightweight design fits into tight work spaces with 2-speed transmission.",
    specs: {
      "Voltage": "20V MAX Lithium-Ion",
      "Max Power": "340 UWO",
      "Speed Settings": "2 (0-450 / 0-1650 RPM)",
      "Chuck Size": "1/2\" Keyless Ratcheting",
      "LED Light": "3-Mode LED with 20-min shutoff",
      "Tool Weight": "1.6 kg"
    },
    includes: ["Brushless Drill/Driver", "2x 2.0Ah XR Li-Ion Batteries", "Fast Charger", "Belt Hook", "Contractor Kit Bag"]
  },
  {
    id: "PT-004",
    name: "Bosch GKS 190 Professional 7\" Circular Saw (1400W)",
    brand: "Bosch",
    category: "saws",
    price: 46200,
    originalPrice: 51000,
    rating: 4.7,
    reviewsCount: 29,
    badge: "Heavy Duty",
    warranty: "1 Year Official Warranty",
    inStock: true,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    description: "With 1400 watts, it has the highest motor power in its class for fast sawing progress in soft and hard wood. Cut depth up to 70mm.",
    specs: {
      "Rated Power": "1400 W",
      "Saw Blade Diameter": "190 mm (7-1/2\")",
      "No-Load Speed": "5,500 RPM",
      "Cutting Depth (90°)": "70 mm",
      "Cutting Depth (45°)": "50 mm",
      "Weight": "4.2 kg"
    },
    includes: ["Circular Saw GKS 190", "190mm TCT Saw Blade", "Parallel Guide", "Dust Extraction Adapter", "Hex Key"]
  },
  {
    id: "PT-005",
    name: "Ingco 130 Bar High Pressure Washer 1800W",
    brand: "Ingco",
    category: "cleaning",
    price: 36800,
    originalPrice: 42000,
    rating: 4.6,
    reviewsCount: 51,
    badge: "Popular in SL",
    warranty: "6 Months Warranty",
    inStock: true,
    image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80",
    description: "Ideal for vehicle washing, driveway cleaning, and home outdoor sanitation. Carbon brush motor with auto-stop system for prolonged pump life.",
    specs: {
      "Voltage/Freq": "220-240V ~ 50Hz",
      "Input Power": "1800W",
      "Max Pressure": "130 Bar (1900 PSI)",
      "Flow Rate": "6.0 L/min",
      "Hose Length": "5 Meters Heavy Duty"
    },
    includes: ["1800W Pressure Washer", "Spray Gun with Adjustable Nozzle", "5m High Pressure Hose", "Foam Lance / Soap Bottle", "Water Inlet Connector"]
  },
  {
    id: "PT-006",
    name: "Total 200A Inverter IGBT Arc MMA Welding Machine",
    brand: "Total",
    category: "welding",
    price: 33500,
    originalPrice: 38000,
    rating: 4.8,
    reviewsCount: 39,
    badge: "Best Value",
    warranty: "1 Year Warranty",
    inStock: true,
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    description: "Advanced IGBT inverter technology provides smooth arc, minimal spatter and deep penetration. Compact design easy for on-site metal fabrication.",
    specs: {
      "Input Voltage": "1~220-240V",
      "Output Current": "15-200A",
      "Duty Cycle": "200A @ 60%",
      "Electrode Diameter": "1.6 - 4.0 mm",
      "Display": "Digital LED Amp Meter",
      "Weight": "4.5 kg"
    },
    includes: ["Welding Machine 200A", "Electrode Holder with Cable", "Earth Clamp with Cable", "Wire Brush with Chipping Hammer", "Handheld Shield"]
  },
  {
    id: "PT-007",
    name: "Prescott 24L Direct Driven Air Compressor (2.0HP)",
    brand: "Prescott",
    category: "compressors",
    price: 49500,
    originalPrice: 56000,
    rating: 4.7,
    reviewsCount: 22,
    badge: "Workshop Essential",
    warranty: "6 Months Warranty",
    inStock: true,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    description: "Dependable 24 Liter air tank with 2.0HP direct motor. Excellent for tire inflators, spray painting guns, air blowers and pneumatic tools.",
    specs: {
      "Power": "2.0 HP (1.5 kW)",
      "Tank Capacity": "24 Liters",
      "Working Pressure": "8 Bar (115 PSI)",
      "Air Delivery (FAD)": "195 L/min",
      "Cylinder": "Single Cast Iron"
    },
    includes: ["24L Air Compressor", "2x Rubber Wheels & Vibration Foot", "Air Filter", "Oil Cap with Breather", "Manual"]
  },
  {
    id: "PT-008",
    name: "Makita 2-Stroke 43cc Heavy Duty Petrol Grass Trimmer",
    brand: "Makita",
    category: "gardening",
    price: 52000,
    originalPrice: 59000,
    rating: 4.9,
    reviewsCount: 19,
    badge: "Field Tested",
    warranty: "1 Year Official Warranty",
    inStock: true,
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=800&q=80",
    description: "Rugged 43cc 2-stroke petrol brush cutter designed for agricultural clearing, coconut estates and Sri Lankan domestic lawn maintenance.",
    specs: {
      "Displacement": "43 cc",
      "Engine Power": "1.45 kW / 2.0 HP",
      "Fuel Tank": "1.2 Liters",
      "Shaft Type": "Solid Straight Shaft",
      "Starting System": "Easy Recoil Starter"
    },
    includes: ["Grass Trimmer Unit", "3-Tooth Steel Blade", "Nylon Cutting Head", "Double Shoulder Harness", "Tool Kit & Mixing Bottle"]
  },
  {
    id: "PT-009",
    name: "DongCheng 1500W Demolition Breaker Jackhammer (16kg)",
    brand: "DongCheng",
    category: "drills",
    price: 68500,
    originalPrice: 77000,
    rating: 4.9,
    reviewsCount: 45,
    badge: "Heavy Duty",
    warranty: "6 Months Warranty",
    inStock: true,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    description: "Engineered for road breakdown, concrete pillar demolition and heavy civil construction projects with massive 45 Joules impact energy.",
    specs: {
      "Rated Power Input": "1500 W",
      "Impact Rate": "1450 /min",
      "Impact Energy": "45 Joules",
      "Chisel Shank": "30mm Hex",
      "Net Weight": "16.0 kg"
    },
    includes: ["Demolition Breaker", "Hex Point Chisel", "Hex Flat Chisel", "Lubricant Grease", "Carbon Brushes Pair", "Metal Storage Box"]
  },
  {
    id: "PT-010",
    name: "Bosch GWS 750-100 Angle Grinder 750W",
    brand: "Bosch",
    category: "grinders",
    price: 22900,
    originalPrice: 26500,
    rating: 4.8,
    reviewsCount: 67,
    badge: "Best Seller",
    warranty: "1 Year Official Warranty",
    inStock: true,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80",
    description: "Slim handle circumference (187mm) delivers ultimate ergonomics. High removal rate and high overload capacity for tough steel cutting.",
    specs: {
      "Rated Input Power": "750 W",
      "No-Load Speed": "11,000 RPM",
      "Disc Diameter": "100 mm (4\")",
      "Spindle Thread": "M10",
      "Weight": "1.8 kg"
    },
    includes: ["GWS 750 Unit", "Clamping Flange", "Protective Guard", "Clamping Nut", "Two-hole Spanner"]
  },
  {
    id: "PT-011",
    name: "Total 20V Cordless Brushless Impact Wrench (400Nm)",
    brand: "Total",
    category: "cordless",
    price: 43500,
    originalPrice: 49000,
    rating: 4.8,
    reviewsCount: 31,
    badge: "Automotive Pick",
    warranty: "1 Year Warranty",
    inStock: true,
    image: "https://images.unsplash.com/photo-1622372738946-62e02505feb3?auto=format&fit=crop&w=800&q=80",
    description: "Brushless motor delivers 400 Nm fastening torque. Perfect for vehicle wheel nut removal, scaffold assembly and steel structure erecting.",
    specs: {
      "Voltage": "20V Li-Ion",
      "Square Drive": "1/2\" (12.7 mm)",
      "Max Torque": "400 Nm",
      "Impact Rate": "0-3000 bpm",
      "No Load Speed": "0-2300 rpm"
    },
    includes: ["Impact Wrench Bare Tool", "2x 4.0Ah Lithium Batteries", "Fast Charger", "3 Sockets (17, 19, 21mm)", "Heavy Duty Canvas Bag"]
  },
  {
    id: "PT-012",
    name: "Ingco 10-Inch Sliding Compound Miter Saw 1800W",
    brand: "Ingco",
    category: "saws",
    price: 74900,
    originalPrice: 84000,
    rating: 4.9,
    reviewsCount: 16,
    badge: "Woodworking Pro",
    warranty: "6 Months Warranty",
    inStock: true,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    description: "Precision sliding compound miter saw with laser guide line for accurate wood trimming, door frame cutting and aluminum profile mitering.",
    specs: {
      "Voltage": "220-240V ~ 50Hz",
      "Input Power": "1800 W",
      "Blade Diameter": "255 mm (10\")",
      "No-Load Speed": "4,500 RPM",
      "Miter Cuts": "0° to 45° Left & Right",
      "Cutting Capacity 90°/90°": "295 x 70 mm"
    },
    includes: ["10\" Sliding Miter Saw", "TCT 60T Wood Blade", "Workpiece Clamp", "Dust Bag", "Side Extension Wings"]
  }
];

const CATEGORIES = [
  { id: "all", name: "All Power Tools", icon: "wrench", count: 12 },
  { id: "drills", name: "Rotary & Breakers", icon: "hammer", count: 2 },
  { id: "grinders", name: "Angle Grinders", icon: "disc", count: 2 },
  { id: "cordless", name: "Cordless & Lithium", icon: "battery-charging", count: 2 },
  { id: "saws", name: "Saws & Woodworking", icon: "scissors", count: 2 },
  { id: "welding", name: "Welding Machines", icon: "flame", count: 1 },
  { id: "cleaning", name: "Pressure Washers", icon: "droplets", count: 1 },
  { id: "compressors", name: "Air Compressors", icon: "wind", count: 1 },
  { id: "gardening", name: "Garden & Outdoor", icon: "trees", count: 1 }
];

const BRANDS = ["All Brands", "Makita", "Bosch", "DeWalt", "DongCheng", "Ingco", "Total", "Prescott"];

const TESTIMONIALS = [
  {
    name: "Sunil Jayawardena",
    role: "Civil Contractor, Colombo 05",
    comment: "Panchikawatta walata yanne nathuwa meken order kala. DongCheng rotary hammer eka next day morning delivery una. Original company warranty card ekath thibba. Highly recommended!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Mahesh Gunasekara",
    role: "Woodcraft Workshop Owner, Moratuwa",
    comment: "Makita angle grinder and Bosch circular saw bought for my Moratuwa furniture shop. Very smooth WhatsApp ordering process and instant reply on technical specifications.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Nimal Perera",
    role: "Auto Body Garage, Kandy",
    comment: "Total 200A welding plant eka Kandy walata 2 days walin labuna. Cash on delivery option eka thiyena nisa bayak nathuwa ganna puluwan una. Best power tools webstore in SL!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  }
];
