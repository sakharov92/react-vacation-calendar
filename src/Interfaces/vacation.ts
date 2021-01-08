export interface Vacation {
  id: number;
  startDate: string;
  endDate: string;
  userId: number;
  isPaid: boolean;
}
export interface AvailableDates {
  availableDatesList: Set<string>;
  isPaid: boolean;
}

