export type Review = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  ownerNotes: string;
};

export const reviews: Review[] = [
  {
    id: 1,
    title: "BMW M3 Competition",
    subtitle: "Pure driving perfection",
    image:
      "https://images.unsplash.com/photo-1616455263449-0bd3aac04029?q=80&w=687&auto=format&fit=crop",
    description:
      "The G80 generation M3 brings a massive leap in interior quality and tech, paired with the legendary S58 twin-turbo engine. It's a precision instrument built for the track but comfortable enough for the school run.",
    ownerNotes:
      "The carbon bucket seats look incredible, but they are a nightmare to get in and out of every day. If this is your only car, go for the sport seats instead.",
  },
  {
    id: 2,
    title: "Audi RS7",
    subtitle: "Luxury meets performance",
    image:
      "https://images.unsplash.com/photo-1540066019607-e5f69323a8dc?q=80&w=687&auto=format&fit=crop",
    description:
      "A wide-bodied beast that hides its speed with incredible refinement. With its Quattro all-wheel drive, it's essentially a high-speed private jet for the road, regardless of the weather.",
    ownerNotes:
      "The fuel economy is exactly what you'd expect from a V8—terrible. But every time you cold start it in the morning, you'll forget about the gas prices.",
  },
  {
    id: 3,
    title: "Mercedes-AMG GT",
    subtitle: "Engineering excellence",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1470&auto=format&fit=crop",
    description:
      "Hand-built in Affalterbach, this front-mid-engine sports car offers a classic long-hood, short-deck silhouette that turns heads everywhere it goes.",
    ownerNotes:
      "The hood is so long that pulling out of tight junctions can be nerve-wracking. You're halfway into the street before you can actually see oncoming traffic!",
  },
  {
    id: 4,
    title: "Volkswagen Golf R",
    subtitle: "The ultimate hot hatch",
    image:
      "https://images.unsplash.com/photo-1718629879998-ee8cfc09df39?q=80&w=2070&auto=format&fit=crop",
    description:
      "The wolf in sheep's clothing. It looks like a standard hatchback to the untrained eye, but its 300+ horsepower and drift mode make it a giant-killer on a twisty backroad.",
    ownerNotes:
      "The touch-sensitive buttons on the steering wheel are frustrating and easy to hit by accident. Aside from that, it's the perfect daily driver.",
  },
  {
    id: 5,
    title: "Range Rover",
    subtitle: "Luxury or Stressful?",
    image:
      "https://images.unsplash.com/photo-1725147211182-b6b8f373d83c?q=80&w=1470&auto=format&fit=crop",
    description:
      "The gold standard for luxury SUVs. It offers a 'command' driving position and a ride quality that feels like you're floating on a cloud above the chaos of the road.",
    ownerNotes:
      "When it works, it's the best car in the world. When the air suspension acts up, it's a very expensive driveway ornament. Get a good warranty!",
  },
];
