import {isWeekend} from "date-fns";

export const statisticService = {
    updateStatistic: function (index: number, teamStatisticList: (string | number)[]) {
        if (typeof teamStatisticList[index] === 'number') {
            teamStatisticList[index] = +teamStatisticList[index] + 1;
        }
        return teamStatisticList
    },
    fillStatisticsList: function (date: Date): (string | number)[] {
        const statisticsList = [];
        for (let i = 1; i <= date.getDate(); i++) {
            const iDate: Date = new Date(date.getFullYear(), date.getMonth(), i);
            if (isWeekend(iDate)) {
                statisticsList.push('');
            } else {
                statisticsList.push(0);
            }
        }
        return statisticsList;
    }
}
