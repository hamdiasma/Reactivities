 interface IActivity{
    id: string;
    title: string;
    description: string;
    date: Date ; // Use string for date to match JSON format
    category: string;
    isCancelled?: boolean;
    city: string;
    venue: string;
    latitude: number;
    langitude: number;
}

interface IUser {
  email: string
  id: string
  imageUrl?: string
  displayName: string
  roles: Roles
}

type Roles = string[]

 interface ILocationIQSuggsetion {
  place_id: string
  osm_id: string
  osm_type: string
  licence: string
  lat: string
  lon: string
  boundingbox: string[]
  class: string
  type: string
  display_name: string
  display_place: string
  display_address: string
  address: ILocationIQAddress
}

 interface ILocationIQAddress {
  name: string
  city?: string
  town?:string
  village?:string,
  county?:string,
  county: string
  state: string
  postcode: string
  country: string
  country_code: string
  house_number?: string
  road?: string
  suburb?: string
}
