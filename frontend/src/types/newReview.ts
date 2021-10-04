import { User } from "./user";

export type NewReview = {
  text: string,
  user: User,
  movieId: number
};