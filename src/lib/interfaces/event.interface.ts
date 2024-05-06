export interface IEvent {
  _id?: string;
  eventName: string;
  description: string;
  startDate: string;
  endDate: string;
  country: string;
  capital: string;
  language: string;
  area: string;
  temperatureInEventMonth: number;
  currency: string;
  currencyExchangeRate: number;
  airportName: string;
  preDepartureChecklist: string[];
  dos: string[];
  donts: string[];
  itineraryDocUrl: string;
  itinerary: {
    title: string;
    date: string;
    scheduleTime: string;
  }[];
  meetings: {
    title: string;
    date: string;
    scheduleTime: string;
  }[];
  contact: {
    name: string;
    phone: string;
    location: string;
  }[];
  hotelInfo: {
    name: string;
    address: string;
    phone: string;
  }[];
}
