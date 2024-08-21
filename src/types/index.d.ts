// results and count in API
export type APIresponse = { count: number; results: Event[] };
export type Event = {
  title: string;
  description: string;
  start: string;
  end: string;
  category: string;
  country: string;
  rank: number;
  id: string;
};
export type APIparameters = {
  "start.lte"?: string | undefined;
  "start.gte"?: string | undefined;
  category?: string | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
  sort?: string | undefined;
  startDate?: Date;
  endDate?: Date;
  page?: number;
};
