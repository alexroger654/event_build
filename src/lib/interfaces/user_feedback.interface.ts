export interface IUserFeedbacks {
  _id?: string;
  userName: string;
  userId: string;
  eventName: string;
  eventId: string;
  feedbacks: {
    question: string;
    answer: string;
  }[];
}
