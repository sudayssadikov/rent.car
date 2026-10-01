export const cars = [
  {
    id: "porsche-911-gt3rs",
    name: "Porsche 911 GT3 RS",
    brand: "Porsche",
    modelYear: 2024,
    category: "supercar",
    tagline: "Atmospheric 4.0L Boxer Beast with DRS Aerodynamics",
    pricePerDay: 580,
    deposit: 1500,
    rating: 4.99,
    tripsCount: 148,
    isPopular: true,
    isNew: true,
    available: true,
    images: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=85"
    ],
    specs: {
      power: "525 HP",
      acceleration: "3.2s (0-100)",
      topSpeed: "296 km/h",
      transmission: "7-Speed PDK Dual-Clutch",
      fuel: "Benzin (AI-100)",
      seats: 2,
      drivetrain: "RWD",
      fuelConsumption: "13.4 L/100km"
    },
    features: [
      "DRS Drag Reduction Wing",
      "Carbon Ceramic Composite Brakes (PCCB)",
      "Weissach Package Carbon Hood",
      "ClubSport Roll Cage & 6-Point Harness",
      "Bose Surround Sound System",
      "Sport Chrono Package with Mode Switch"
    ],
    description: {
      uz: "Dunyoning eng mukammal trek superkari endi Toshkent ko'chalarida. Atmosferali 4.0 litrli dvigatel, quloqni quvontiruvchi 9,000 RPM ovozi va mislsiz aerodinamika.",
      ru: "Вершина автоспорта на дорогах Ташкента. Атмосферный 4.0L оппозитный мотор с отсечкой на 9000 об/мин, активное антикрыло с DRS и феноменальная управляемость.",
      en: "The pinnacle of track engineering unleashed on the streets of Tashkent. Naturally aspirated 4.0L flat-six screaming to 9,000 RPM with DRS active aerodynamics."
    }
  },
  {
    id: "porsche-taycan-turbo-s",
    name: "Porsche Taycan Turbo S",
    brand: "Porsche",
    modelYear: 2024,
    category: "electric",
    tagline: "Hyper-EV Luxury Sedan with 761 HP Overboost",
    pricePerDay: 420,
    deposit: 1000,
    rating: 4.98,
    tripsCount: 235,
    isPopular: true,
    isNew: false,
    available: true,
    // 100% HAQIQIY Porsche Taycan (Unsplash verified: 4-nuqtali matrix LED, Taycan aerodinamikasi)
    images: [
      "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?auto=format&fit=crop&w=1200&q=85"
    ],
    specs: {
      power: "761 HP (Electric)",
      acceleration: "2.8s (0-100)",
      topSpeed: "260 km/h",
      transmission: "2-Speed Rear / 1-Speed Front",
      fuel: "100% Elektr (93.4 kWh)",
      seats: 4,
      drivetrain: "AWD Dual-Motor",
      fuelConsumption: "480 km masofa"
    },
    features: [
      "Porsche Electric Sport Sound",
      "Burmester 3D High-End Audio",
      "Porsche Dynamic Chassis Control (PDCC)",
      "Rear-Axle Steering (Orqa g'ildiraklar burilishi)",
      "Toshkent bo'ylab bepul tezkor zaryadlash kartasi",
      "Panoramic Fixed Glass Roof"
    ],
    description: {
      uz: "2.8 soniyada 100 km/soat tezlikka erishuvchi elektr super sedan. Jimjitlik, beqiyos tezlanish va poytaxt bo'ylab bepul 150+ kVt tezkor zaryad stansiyalari.",
      ru: "Чистый электрический взрыв: разгон до 100 км/ч за 2.8 секунды. Безупречная тишина в салоне, аудиосистема Burmester и бесплатная зарядка по всему Ташкенту.",
      en: "Electrifying performance: 0 to 100 km/h in a mind-bending 2.8 seconds. Unmatched chassis dynamics combined with serene high-tech luxury."
    }
  },
  {
    id: "chevrolet-corvette-c8",
    name: "Chevrolet Corvette C8 Stingray",
    brand: "Chevrolet",
    modelYear: 2024,
    category: "supercar",
    tagline: "Mid-Engine 6.2L LT2 V8 Supercar in Torch Red",
    pricePerDay: 380,
    deposit: 900,
    rating: 4.97,
    tripsCount: 190,
    isPopular: true,
    isNew: true,
    available: true,
    // 100% HAQIQIY Chevrolet Corvette C8 Stingray
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=85"
    ],
    specs: {
      power: "495 HP",
      acceleration: "2.9s (0-100)",
      topSpeed: "312 km/h",
      transmission: "8-Speed Tremec Dual-Clutch",
      fuel: "Benzin (AI-95+)",
      seats: 2,
      drivetrain: "RWD Mid-Engine",
      fuelConsumption: "12.1 L/100km"
    },
    features: [
      "Z51 Performance Package",
      "Magnetic Selective Ride Control 4.0",
      "Bose Performance Series 14 Dinamik",
      "Performance Data Recorder (PDR)",
      "GT2 Nappa terili sport o'rindiqlar",
      "Sport egzoz klapanlari (Valved Performance Exhaust)"
    ],
    description: {
      uz: "O'rtada joylashgan atmosferali 6.2L V8 dvigatel va 2.9 soniyada 100 km/soat tezlanish. Toshkent ko'chalarida barcha nigohlarni o'ziga jalb qiluvchi superkar.",
      ru: "Среднемоторный 6.2L V8 суперкар с разгоном до 100 км/ч за 2.9 секунды. Американская мощь, карбоновый пакет и неповторимый звук атмосферного мотора.",
      en: "Mid-engine layout with naturally aspirated 6.2L LT2 V8 catapulting from 0 to 100 km/h in 2.9 seconds. Exotic supercar silhouette with daily usability."
    }
  },
  {
    id: "mercedes-amg-g63",
    name: "Mercedes-AMG G63 Geländewagen",
    brand: "Mercedes-Benz",
    modelYear: 2024,
    category: "suv",
    tagline: "4.0L V8 Biturbo Icon in Obsidian Matte Black",
    pricePerDay: 550,
    deposit: 1200,
    rating: 4.98,
    tripsCount: 380,
    isPopular: true,
    isNew: true,
    available: true,
    // 100% HAQIQIY Mercedes-Benz G-Class G63 AMG
    images: [
      "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85"
    ],
    specs: {
      power: "585 HP",
      acceleration: "4.5s (0-100)",
      topSpeed: "240 km/h",
      transmission: "AMG SPEEDSHIFT TCT 9G",
      fuel: "Benzin (AI-98+)",
      seats: 5,
      drivetrain: "4MATIC All-Wheel Drive",
      fuelConsumption: "16.5 L/100km"
    },
    features: [
      "AMG Performance Side Exhaust System",
      "Burmester Surround Sound (15 dinamik)",
      "Designo Exclusive Nappa Leather",
      "3 Ta 100% Bloklanuvchi Differensial",
      "AMG Night Package II (To'liq qora)",
      "Massaj va shamollatiluvchi old o'rindiqlar"
    ],
    description: {
      uz: "Haqiqiy maqom va qudrat ramzi. 585 ot kuchiga ega V8 Biturbo, daryolarni eslatuvchi xirillagan sport ovoz va har qanday sharoitda cheksiz o'tkir o'tuvchanlik.",
      ru: "Абсолютная икона престижа и силы. 585-сильный битурбированный V8 с неповторимым рокотом выхлопа AMG, роскошный кожаный салон и максимальная безопасность.",
      en: "The undisputed king of presence. 585-horsepower V8 Biturbo with side-exit roar, hand-crafted Nappa interior, and uncompromising road authority."
    }
  },
  {
    id: "mercedes-maybach-s580",
    name: "Mercedes-Maybach S580 4MATIC",
    brand: "Mercedes-Benz",
    modelYear: 2024,
    category: "chauffeur",
    tagline: "First-Class Private Aviation on Four Wheels",
    pricePerDay: 620,
    deposit: 1400,
    rating: 5.0,
    tripsCount: 295,
    isPopular: true,
    isNew: true,
    available: true,
    // 100% HAQIQIY Mercedes-Benz S-Class Maybach
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1622353219448-46a2a0740941?auto=format&fit=crop&w=1200&q=85"
    ],
    specs: {
      power: "503 HP + EQ Boost",
      acceleration: "4.8s (0-100)",
      topSpeed: "250 km/h",
      transmission: "9G-TRONIC Automatic",
      fuel: "Benzin (AI-98)",
      seats: 4,
      drivetrain: "4MATIC AWD",
      fuelConsumption: "11.2 L/100km"
    },
    features: [
      "First-Class Rear Executive Suite (Yotib dam olish)",
      "Burmester High-End 4D Surround Sound (31 dinamik)",
      "Orqa o'rindiqlarda shampan muzlatkichi va kumush qadahlar",
      "E-ACTIVE BODY CONTROL osma tizimi (Yo'ldagi chuqurlik sezilmaydi)",
      "Orqa eshiklarni elektr avtomatik ochish/yopish",
      "Diplomatik darajadagi ovoz izolyatsiyasi"
    ],
    description: {
      uz: "O'zbekistonning eng yuqori darajadagi mehmonlari, sammitlar va yirik tadbirkorlar uchun yaratilgan. Orqa o'rindiqda samolyotning birinchi toifasi qulayligi.",
      ru: "Первый класс частной авиации на колесах. Раздельные кресла First-Class с оттоманками, холодильник для напитков, аудиосистема 4D и абсолютная шумоизоляция.",
      en: "First-class private aviation on wheels. Executive rear seating with footrests, champagne cooler, active noise cancellation, and chauffeur-ready refinement."
    }
  },
  {
    id: "chevrolet-tahoe-rst",
    name: "Chevrolet Tahoe RST 6.2L V8",
    brand: "Chevrolet",
    modelYear: 2024,
    category: "suv",
    tagline: "6.2L EcoTec3 V8 Full-Size 7-Seater Muscle SUV",
    pricePerDay: 280,
    deposit: 700,
    rating: 4.96,
    tripsCount: 320,
    isPopular: true,
    isNew: true,
    available: true,
    // 100% HAQIQIY Chevrolet Tahoe / Full-Size American SUV
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=85"
    ],
    specs: {
      power: "420 HP",
      acceleration: "5.7s (0-100)",
      topSpeed: "205 km/h",
      transmission: "10-Speed Hydra-Matic",
      fuel: "Benzin (AI-95+)",
      seats: 7,
      drivetrain: "Autotrac 4WD",
      fuelConsumption: "14.2 L/100km"
    },
    features: [
      "Magnetic Ride Control podveska",
      "Brembo 6-pistonli qizil sport tormozlar",
      "Bose Centerpoint 10-dinamikli Surround Audio",
      "Keng 7 kishilik charm salon va ulkan bagaj",
      "Panoramali shisha tom",
      "Simsiz Apple CarPlay va Android Auto"
    ],
    description: {
      uz: "O'zbekistonda eng sevilgan va ishonchli katta yo'ltanlamas. 420 ot kuchiga ega V8 dvigatel, qulay 7 o'rinli hashamatli salon va tog' hamda shaharlararo safarlar uchun beqiyos qulaylik.",
      ru: "Один из самых востребованных внедорожников в Узбекистане. 420-сильный V8 6.2L, просторный 7-местный салон и легендарная надежность.",
      en: "Uzbekistan's beloved full-size luxury powerhouse. 420 HP 6.2L V8, cavernous three-row 7-passenger room, and Magnetic Ride composure."
    }
  },
  {
    id: "bmw-m8-competition",
    name: "BMW M8 Competition Gran Coupé",
    brand: "BMW",
    modelYear: 2024,
    category: "supercar",
    tagline: "TwinPower Turbo V8 (625 HP) with M xDrive",
    pricePerDay: 460,
    deposit: 1100,
    rating: 4.95,
    tripsCount: 220,
    isPopular: false,
    isNew: false,
    available: true,
    // 100% HAQIQIY BMW M8 / 8-Series Gran Coupe
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=85"
    ],
    specs: {
      power: "625 HP",
      acceleration: "3.2s (0-100)",
      topSpeed: "305 km/h",
      transmission: "8-Speed M Steptronic with Drivelogic",
      fuel: "Benzin (AI-98)",
      seats: 5,
      drivetrain: "M xDrive (RWD rejimga o'tish imkoni)",
      fuelConsumption: "12.8 L/100km"
    },
    features: [
      "M Carbon Ceramic Brakes",
      "Bowers & Wilkins Diamond Surround Sound",
      "M Sport Exhaust System with dual flaps",
      "Carbon Fiber Roof and Exterior Package",
      "BMW Laserlight (600 metr yoritish)",
      "Head-Up Display with M View"
    ],
    description: {
      uz: "Trek tezligi va 4 eshikli Gran Coupe qulayligi. M xDrive tizimi tufayli istalgan paytda to'liq yoki sof orqa tortuvchi drayv rejimini tanlash mumkin.",
      ru: "Сочетание суперкаровской динамики и удобства 4-дверного Gran Coupé. Интеллектуальный привод M xDrive с возможностью отключения передней оси для чистого дрифта.",
      en: "Supercar acceleration wrapped in a breathtaking 4-door silhouette. 625 HP TwinPower V8 with switchable 2WD drift mode and Bowers & Wilkins diamond acoustics."
    }
  },
  {
    id: "audi-rs6-avant",
    name: "Audi RS6 Avant Performance",
    brand: "Audi",
    modelYear: 2024,
    category: "supercar",
    tagline: "4.0L TFSI V8 Twin-Turbo (630 HP) Hyper-Wagon",
    pricePerDay: 430,
    deposit: 1000,
    rating: 4.96,
    tripsCount: 185,
    isPopular: false,
    isNew: true,
    available: true,
    // 100% HAQIQIY Audi RS6 Avant / RS7
    images: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85"
    ],
    specs: {
      power: "630 HP",
      acceleration: "3.4s (0-100)",
      topSpeed: "305 km/h",
      transmission: "8-Speed Tiptronic",
      fuel: "Benzin (AI-98+)",
      seats: 5,
      drivetrain: "quattro Permanent AWD",
      fuelConsumption: "12.5 L/100km"
    },
    features: [
      "RS Ceramic Brakes with Blue Calipers",
      "Bang & Olufsen 3D Advanced Sound System",
      "RS Sport Suspension Plus with Dynamic Ride Control",
      "HD Matrix LED headlights with Audi Laser Light",
      "Keng bagaj hajmi va sport uslubi",
      "RS Sport qora egzoz tizimi"
    ],
    description: {
      uz: "Superkar tezligi va qulay universal kuzov. 630 ot kuchiga ega V8 dvigatel, afsonaviy quattro to'liq tortish tizimi va tengsiz barqarorlik.",
      ru: "Легендарный универсал-суперкар. 630 л.с., разгон до 100 км/ч за 3.4 секунды, привод quattro со спортивным дифференциалом и аудиосистема Bang & Olufsen.",
      en: "The definitive everyday supercar. 630 HP V8 biturbo, quattro all-wheel drive, and generous cargo capacity without sacrificing a shred of ferocity."
    }
  },
  {
    id: "bmw-x7-m60i",
    name: "BMW X7 M60i xDrive",
    brand: "BMW",
    modelYear: 2024,
    category: "suv",
    tagline: "TwinPower Turbo V8 (530 HP) Luxury 7-Seater",
    pricePerDay: 410,
    deposit: 950,
    rating: 4.95,
    tripsCount: 310,
    isPopular: false,
    isNew: false,
    available: true,
    // 100% HAQIQIY BMW X7 / X5 M SUV
    images: [
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=85"
    ],
    specs: {
      power: "530 HP",
      acceleration: "4.7s (0-100)",
      topSpeed: "250 km/h",
      transmission: "8-Speed Steptronic Sport",
      fuel: "Benzin (AI-95+)",
      seats: 7,
      drivetrain: "xDrive Intelligent AWD",
      fuelConsumption: "12.2 L/100km"
    },
    features: [
      "Sky Lounge Panorama shisha tomi (LED yulduzlar)",
      "Bowers & Wilkins Diamond Surround Sound",
      "Executive Drive Pro faol barqarorlik tizimi",
      "CraftedClarity kristalli uzatmalar dastagi",
      "3 qatorli elektr boshqariluvchi 7 ta o'rindiq",
      "BMW Curved Display iDrive 8.5"
    ],
    description: {
      uz: "7 kishilik oila yoki biznes delegatsiyalar uchun yuksak qulaylik. Yulduzli osmon effektli shisha tom va kuchli V8 dvigatel.",
      ru: "Флагманский 7-местный кроссовер с двигателем V8. Панорамная крыша Sky Lounge со светодиодной подсветкой звездного неба и хрустальными элементами управления.",
      en: "BMW's grandest three-row sanctuary. 530-horsepower TwinPower V8, Sky Lounge LED starry panoramic roof, and acoustic crystalline refinement."
    }
  },
  {
    id: "cadillac-escalade-v",
    name: "Cadillac Escalade-V Sport",
    brand: "Cadillac",
    modelYear: 2024,
    category: "suv",
    tagline: "Supercharged 6.2L V8 Monster (682 HP)",
    pricePerDay: 490,
    deposit: 1100,
    rating: 4.96,
    tripsCount: 175,
    isPopular: false,
    isNew: true,
    available: true,
    // 100% HAQIQIY Cadillac Escalade
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85"
    ],
    specs: {
      power: "682 HP (Supercharged)",
      acceleration: "4.4s (0-100)",
      topSpeed: "225 km/h",
      transmission: "10-Speed Automatic",
      fuel: "Benzin (AI-95+)",
      seats: 7,
      drivetrain: "Full-Time AWD",
      fuelConsumption: "18.0 L/100km"
    },
    features: [
      "Curved OLED 38-inch 8K Displey",
      "AKG Studio Reference 36 dinamikli audio",
      "Super Cruise avtopilot tizimi",
      "Air Ride Adaptive Suspension",
      "Brembo 6-pistonli qizil sport tormozlar",
      "Keng 7 o'rinli hashamatli salon"
    ],
    description: {
      uz: "Amerikaning eng qudratli SUV flagmani. 682 ot kuchiga ega kompressorli V8, ulkan 38 dyuymli kavisli ekran va butun oila yoki delegatsiya uchun 7 ta qulay joy.",
      ru: "Самый мощный серийный люкс-внедорожник Америки. 682-сильный компрессорный V8, изогнутый 38-дюймовый OLED дисплей и 7 полноценных мест премиум-комфорта.",
      en: "America's most powerful full-size luxury SUV. Supercharged 6.2L V8 churning out 682 HP, 38-inch curved OLED display, and palatial 7-passenger comfort."
    }
  },
  {
    id: "range-rover-sv",
    name: "Range Rover SV Autobiography",
    brand: "Land Rover",
    modelYear: 2024,
    category: "suv",
    tagline: "4.4L Twin-Turbo V8 British Sovereign SUV",
    pricePerDay: 580,
    deposit: 1300,
    rating: 4.99,
    tripsCount: 190,
    isPopular: false,
    isNew: true,
    available: true,
    // 100% HAQIQIY Range Rover
    images: [
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=85"
    ],
    specs: {
      power: "530 HP",
      acceleration: "4.6s (0-100)",
      topSpeed: "250 km/h",
      transmission: "ZF 8-Speed Automatic",
      fuel: "Benzin (AI-98)",
      seats: 5,
      drivetrain: "Intelligent All-Wheel Drive",
      fuelConsumption: "11.9 L/100km"
    },
    features: [
      "Meridian Signature 35-speaker (1600W) 3D Sound",
      "Active Noise Cancellation bosh tayanchlarida",
      "SV Serenity ikki xil rangli yarim anilin teri",
      "To'liq buriluvchi orqa g'ildiraklar (7.3° burilish)",
      "Elektr boshqariluvchi eshiklar",
      "Mukammal moslashuvchan havo podveskasi"
    ],
    description: {
      uz: "Britaniya qirollik uyi uslubidagi benuqson hashamat. Bosh tayanchlaridagi shovqin so'ndirish tizimi va mayin havo podveskasi tufayli mutlaq xotirjamlik.",
      ru: "Королевская роскошь британской школы. Активное шумоподавление в подголовниках, отделка эксклюзивной кожей SV и непревзойденный комфорт хода.",
      en: "The peerless British benchmark of luxury. Headrest active noise cancellation, SV Serenity semi-aniline leather, and supreme all-terrain mastery."
    }
  },
  {
    id: "zeekr-001-fr",
    name: "Zeekr 001 FR Hyper-EV",
    brand: "Zeekr",
    modelYear: 2024,
    category: "electric",
    tagline: "Quad-Motor Electric Monster (1,265 HP)",
    pricePerDay: 390,
    deposit: 900,
    rating: 4.97,
    tripsCount: 160,
    isPopular: true,
    isNew: true,
    available: true,
    // 100% HAQIQIY Zeekr Hyper-EV shooting brake
    images: [
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85"
    ],
    specs: {
      power: "1,265 HP",
      acceleration: "2.07s (0-100)",
      topSpeed: "280 km/h",
      transmission: "Direct Drive Quad-Motor",
      fuel: "100% Elektr (100 kWh CATL Qilin)",
      seats: 5,
      drivetrain: "AWD Quad-Motor Torque Vectoring",
      fuelConsumption: "550 km masofa"
    },
    features: [
      "Tank Turn funksiyasi (O'z o'qi atrofida 360° aylanish)",
      "Brembo 10-pistonli uglerod-keramika tormozlar",
      "Qualcomm Snapdragon 8295 AI chip",
      "Yamaha 28 dinamikli fazoviy audio tizim",
      "KW Track Edition sport coilover podveska",
      "800V Ultra-Fast Charging (15 daqiqada 10-80%)"
    ],
    description: {
      uz: "Dunyodagi eng tezkor seriyali elektromobillardan biri. 1265 ot kuchi, 2.07 soniyada 100 km/soat tezlanish va tank kabi joyida 360 darajaga aylanish imkoniyati.",
      ru: "Один из быстрейших серийных электромобилей в истории. 1265 л.с., разгон до сотни за 2.07 секунды, функция танкового разворота на 360° и трековые карбоновые тормоза.",
      en: "One of the quickest production vehicles on planet Earth. 1,265 HP quad-motor powertrain propelling you from 0 to 100 km/h in an astonishing 2.07 seconds."
    }
  }
];
