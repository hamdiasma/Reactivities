export interface IErrors {
  type: string
  title: string
  status: number
  detail: string
  errors: IError
}

export interface IError {
  Title: string[]
  Description: string[]
  Date: string[]
  City: string[]
  Venue: string[]
  Category: string[]
  Langitude: string[]
  Latitude: string[]
}