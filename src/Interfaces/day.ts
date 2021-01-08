export interface Day {
    date: Date;
    isDayOff: boolean;
    dayName: string;
}
export interface CellInfo {
    isWeekend: boolean;
    isVacation: boolean;
    isUiStart: boolean;
    isUiEnd: boolean;
    isPaid: boolean;
    isTypeText: boolean;
    isLeftL: boolean;
    isLeftS: boolean;
}
