import {isWeekend} from "date-fns";


let statisticArr: [];
export const statisticService = {
    getStatistic: function () {
        console.log(statisticArr)
        // return statisticArr;
    },
    setStatisticArrAmount: function (amount: number) {
        statisticArr = [].constructor(amount)
    },
    setWeekDaysForUser: function (userId: number, value: any) {
        // @ts-ignore
        statisticArr[userId] = value;

    },
    updateStatistic: function (index: number, teamStatisticList: (string | number)[]) {
        let newTeamStatisticList = teamStatisticList.slice();
        newTeamStatisticList[index] = +newTeamStatisticList[index] + 1;
        return newTeamStatisticList
    },
    fillStatisticsList: function (date: Date): (string | number)[] {
        let statisticsList = [];
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
