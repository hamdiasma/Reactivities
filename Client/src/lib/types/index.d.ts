type TPageList<T, TCursor>={
  items : T[],
  nextCursor:TCursor
}


interface IActivity {
  id: string;
  title: string;
  description: string;
  date: Date; // Use string for date to match JSON format
  category: string;
  isCancelled?: boolean;
  city: string;
  venue: string;
  latitude: number;
  langitude: number;
  attendees: IProfile[],
  isGoing: boolean,
  isHost: boolean,
  numberOfParicipate: number,
  hostDisplayName: string,
  hostId: string,
  hostImageUrl?: string
}

interface CommentStore {
  comments: ChatComment[];
  hubConnection: HubConnection | null;
  createHubConnection: (activityId?: string) => void;
  stopHubConnection: () => void;
}

interface ChatComment {
  id: string,
  createdAt: Date,
  updateAt: Date
  body: string,
  userId: string,
  activityId: string,
  displayName: string,
  imageUrl?: string
}

interface IPhoto {
  id: string,
  url: string,
  publicId: string,
  userId: string
}

interface IProfile {
  id: string
  imageUrl?: string
  displayName: string,
  bio?: string
  following?: boolean,
  followerSCount?: number,
  FollowingSCount?: number,
}



interface IUser extends IProfile {
  email: string
  roles?: Roles
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
  town?: string
  village?: string,
  county?: string,
  county: string
  state: string
  postcode: string
  country: string
  country_code: string
  house_number?: string
  road?: string
  suburb?: string
}
