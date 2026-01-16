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
