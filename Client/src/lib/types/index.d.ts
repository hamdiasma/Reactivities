export interface IActivity{
    id: string;
    title: string;
    description: string;
    date: string; // Use string for date to match JSON format
    category: string;
    isCancelled: boolean;
    city: string;
    venue: string;
    latitude: number;
    langitude: number;
}