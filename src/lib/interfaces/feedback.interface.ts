export interface IFeedback {
  _id: string;
  type: "yesNo" | "rating" | "text";
  question: string;
  ratingOptions?: "very_good" | "good" | "average" | "bad";
  yesNoOptions?: boolean;
  textOption: string;
  status: "active" | "disabled";
  category:
    | "OVERALL"
    | "HOTELS"
    | "TOUR_MANAGER"
    | "TRANSPORT"
    | "AIRPORT_SERVICES";
}
