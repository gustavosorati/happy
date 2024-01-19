export type OrphanagePhoto = {
  name: string;
  uri: string;
  size: string;
}

export type CreateOrphanageModel = {
  name: string;
  about: string;
  images: string[];
  instructions: string;
  opening_hours: string;
  opening_on_weekends: boolean;
}
