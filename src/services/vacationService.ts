import {AvailableDates, Vacation} from "../Interfaces/vacation";

export const vacationService = {
    generateVacationSetsByUserId: function (userId: number, date: Date, vacations: Vacation[]): AvailableDates[] {
        const userVacations = this.getVacationsByUserId(userId, vacations);
        const filteredVacations: AvailableDates[] = [];
            for (const vacationItem of userVacations) {
                const startDate = this.formatInputDate(vacationItem.startDate);
                const endDate = this.formatInputDate(vacationItem.endDate);
                const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth());
                const lastDayOfMonth = date;
                const availableDates: AvailableDates = {
                    availableDatesList: new Set(),
                    isPaid: vacationItem.isPaid,
                };
                if (!(endDate < firstDayOfMonth) && !(startDate > lastDayOfMonth)) {
                    let currentVacationDate = new Date(startDate.getTime());
                    for (
                        let index = currentVacationDate.getDate();
                        currentVacationDate <= lastDayOfMonth && currentVacationDate <= endDate;
                        ++index
                    ) {
                        currentVacationDate = new Date(startDate.getFullYear(), startDate.getMonth(), index);
                        if (firstDayOfMonth <= currentVacationDate && lastDayOfMonth >= currentVacationDate) {
                            availableDates.availableDatesList.add(currentVacationDate.toISOString());
                        }
                        currentVacationDate = new Date(startDate.getFullYear(), startDate.getMonth(), index + 1);
                    }
                }
                filteredVacations.push(availableDates);
            }

        return filteredVacations;
    },


    getVacationsByUserId:

        function (userId: number, vacations: Vacation[]): Vacation[] {

            return vacations.filter((element) => {
                return userId === element.userId;
            });
        }

    ,
    formatInputDate: function (stringDate: string): Date {
        return new Date(
            parseInt(stringDate.slice(6, 10), 10),
            parseInt(stringDate.slice(3, 5), 10) - 1,
            parseInt(stringDate.slice(0, 2), 10)
        );
    }
}
