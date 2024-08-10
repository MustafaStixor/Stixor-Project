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
