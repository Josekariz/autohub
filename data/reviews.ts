// data/reviews.ts

export type Review = {
  id: number;
  carMake: string;
  carModel: string;
  year: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  ownerNotes: string;
  issues: string[];
  fuelUsage: string;
  rating: number;
  votes: number;
  author: string;
};

export const reviews: Review[] = [
  {
    id: 1,
    carMake: "BMW",
    carModel: "M3 Competition",
    year: 2024,
    title: "BMW M3 Competition",
    subtitle: "Pure driving perfection",
    image:
      "https://images.unsplash.com/photo-1616455263449-0bd3aac04029?q=80&w=687&auto=format&fit=crop",
    description:
      "The G80 generation M3 brings a massive leap in interior quality and tech, paired with the legendary S58 twin-turbo engine[cite: 39]. It's a precision instrument built for the track but comfortable enough for the school run[cite: 39].",
    ownerNotes:
      "The carbon bucket seats look incredible, but they are a nightmare to get in and out of every day[cite: 39]. If this is your only car, go for the sport seats instead[cite: 39].",
    issues: ["Carbon seat wear", "Brake squeal"],
    fuelUsage: "12.4L/100km",
    rating: 4.8,
    votes: 156,
    author: "Sejo Qariz",
  },
  {
    id: 2,
    carMake: "Audi",
    carModel: "RS7",
    year: 2023,
    title: "Audi RS7",
    subtitle: "Luxury meets performance",
    image:
      "https://images.unsplash.com/photo-1540066019607-e5f69323a8dc?q=80&w=687&auto=format&fit=crop",
    description:
      "A wide-bodied beast that hides its speed with incredible refinement[cite: 40]. With its Quattro all-wheel drive, it's essentially a high-speed private jet for the road[cite: 40].",
    ownerNotes:
      "The fuel economy is exactly what you'd expect from a V8—terrible[cite: 40, 41]. But every time you cold start it, you'll forget about the gas prices[cite: 41].",
    issues: ["High tire cost", "Infotainment lag"],
    fuelUsage: "14.1L/100km",
    rating: 4.6,
    votes: 89,
    author: "Sarah Chen",
  },
  {
    id: 3,
    carMake: "Mercedes-AMG",
    carModel: "GT",
    year: 2022,
    title: "Mercedes-AMG GT",
    subtitle: "Engineering excellence",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1470&auto=format&fit=crop",
    description:
      "Hand-built in Affalterbach, this front-mid-engine sports car offers a classic long-hood, short-deck silhouette[cite: 42].",
    ownerNotes:
      "The hood is so long that pulling out of tight junctions can be nerve-wracking[cite: 42]. You're halfway into the street before you can actually see oncoming traffic[cite: 42]!",
    issues: ["Limited visibility", "Stiff suspension"],
    fuelUsage: "13.8L/100km",
    rating: 4.7,
    votes: 112,
    author: "Marcus Vane",
  },
  {
    id: 4,
    carMake: "Volkswagen",
    carModel: "Golf R",
    year: 2024,
    title: "Volkswagen Golf R",
    subtitle: "The ultimate hot hatch",
    image:
      "https://images.unsplash.com/photo-1718629879998-ee8cfc09df39?q=80&w=2070&auto=format&fit=crop",
    description:
      "The wolf in sheep's clothing[cite: 43]. It looks like a standard hatchback, but its 300+ horsepower and drift mode make it a giant-killer[cite: 43].",
    ownerNotes:
      "The touch-sensitive buttons on the steering wheel are frustrating and easy to hit by accident[cite: 44]. Aside from that, it's the perfect daily driver[cite: 44].",
    issues: ["Capacitive buttons", "Piano black trim scratches"],
    fuelUsage: "8.5L/100km",
    rating: 4.5,
    votes: 245,
    author: "Solo Pedi",
  },
  {
    id: 5,
    carMake: "Land Rover",
    carModel: "Range Rover",
    year: 2025,
    title: "Range Rover",
    subtitle: "Luxury or Stressful?",
    image:
      "https://images.unsplash.com/photo-1725147211182-b6b8f373d83c?q=80&w=1470&auto=format&fit=crop",
    description:
      "The gold standard for luxury SUVs[cite: 45]. It offers a 'command' driving position and ride quality that feels like floating on a cloud[cite: 45].",
    ownerNotes:
      "When it works, it's the best car in the world[cite: 46]. When the air suspension acts up, it's a very expensive driveway ornament[cite: 46]. Get a good warranty[cite: 47]!",
    issues: ["Air suspension reliability", "Depreciation"],
    fuelUsage: "11.2L/100km",
    rating: 4.2,
    votes: 67,
    author: "David Sterling",
  },
  {
    id: 6,
    carMake: "Porsche",
    carModel: "911 Carrera",
    year: 2023,
    title: "Porsche 911 Carrera",
    subtitle: "The daily supercar",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1470&auto=format&fit=crop",
    description:
      "The definitive sports car. Balanced, fast, and surprisingly practical for a two-door performance machine.",
    ownerNotes:
      "The rear seats are basically just a leather-lined shelf for groceries. Don't try to put adults back there.",
    issues: ["Expensive options", "Road noise"],
    fuelUsage: "10.1L/100km",
    rating: 4.9,
    votes: 312,
    author: "Chris Harris",
  },
];
