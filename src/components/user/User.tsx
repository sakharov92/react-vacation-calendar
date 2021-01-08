import React from "react";
import {isWeekend} from "date-fns";
import {IUser} from "../../Interfaces/user";
import {CellInfo} from "../../Interfaces/day";
import {AvailableDates, Vacation} from '../../Interfaces/vacation';
import {vacationService} from "../../services/vacationService";
import {statisticService} from "../../services/statisticService";
import "./User.css"
import {Data} from "../../Interfaces/data";

export const User: React.FC<{ date: Date, user: IUser, dataList: Data }> = ({date, user, dataList}) => {
    const userId: number = user.id;
    const lastDayOfMonth: Date = date;
    let dayCells: CellInfo[] = [];
    let vacationSum: number = 0;
    let vacations: Vacation[] = dataList.vacations;
    let teamStatisticList: (string | number)[] = statisticService.fillStatisticsList(date);
    const fillDayCells = (userId: number, lastDayOfMonth: Date): CellInfo[] => {
        const vacationsFiltered: AvailableDates[] = vacationService.generateVacationSetsByUserId(userId, lastDayOfMonth, vacations);
        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            const iDate: Date = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), i);
            const cellInfo: CellInfo = getCellInfo(iDate, vacationsFiltered);
            if (cellInfo.isVacation && !cellInfo.isWeekend) {
                teamStatisticList = statisticService.updateStatistic(i - 1, teamStatisticList);
                increaseVacationSumByOne();
            }
            dayCells.push(cellInfo);
        }
        addVacationInfoText(dayCells);
        return dayCells;
    }

    const increaseVacationSumByOne = (): void => {
        vacationSum += 1;
    }

    const getCellInfo = (date: Date, vacationsFiltered: AvailableDates[]): CellInfo => {
        const cellDate: string = date.toISOString();
        const cellInfo: CellInfo = {
            isWeekend: isWeekend(date),
            isVacation: false,
            isUiStart: false,
            isUiEnd: false,
            isPaid: false,
            isTypeText: false,
            isLeftL: false,
            isLeftS: false
        };
        for (const vacationItem of vacationsFiltered) {
            // @ts-ignore
            const vacationItemEntries = [...vacationItem.availableDatesList];
            const vacationUiStart = vacationItemEntries[0];
            const vacationUiEnd = vacationItemEntries[vacationItemEntries.length - 1];
            if (vacationItem.availableDatesList.has(cellDate)) {
                cellInfo.isVacation = true;
                if (cellDate === vacationUiStart) {
                    cellInfo.isUiStart = true;
                }
                if (cellDate === vacationUiEnd) {
                    cellInfo.isUiEnd = true;
                }
                if (vacationItem.isPaid) {
                    cellInfo.isPaid = true;
                }
            }
        }
        return cellInfo;
    }

    const addVacationInfoText = (dayCells: CellInfo[]): void => {
        let startUiCellIndex: number = 0;
        let vacationUILength: number;
        let shift: number = 0;
        for (let index = 0; index < dayCells.length; ++index) {
            if (dayCells[index].isUiStart) {
                startUiCellIndex = index;
            }
            if (dayCells[index].isUiEnd) {
                vacationUILength = index - startUiCellIndex;
                if (vacationUILength % 2 === 0) {
                    shift = vacationUILength / 2;
                    dayCells[startUiCellIndex + shift].isTypeText = true;
                    dayCells[startUiCellIndex + shift].isLeftS = true;
                } else {
                    shift = (vacationUILength - 1) / 2;
                    dayCells[startUiCellIndex + shift].isTypeText = true;
                    dayCells[startUiCellIndex + shift].isLeftL = true;
                }
            }
        }
    }

    const calculateClasses = (dayCell: CellInfo) => {
        let classesObject = {
            dayCell: true,
            weekend: dayCell.isWeekend,
            'vacation-cell_paid': dayCell.isVacation && dayCell.isPaid,
            'vacation-cell_unpaid': dayCell.isVacation && !dayCell.isPaid,
            'vacation-cell_ui-start': dayCell.isUiStart,
            'vacation-cell_ui-end': dayCell.isUiEnd,
            'vacation-cell_type-text': dayCell.isTypeText,
            'vacation-cell_type-text_left_s': dayCell.isLeftS,
            'vacation-cell_type-text_left_l': dayCell.isLeftL
        };
        let classesString: string = '';
        let entriesArray = Object.entries(classesObject)
        for (let i = 0; i < entriesArray.length; i++) {
            if (entriesArray[i][1]) {
                classesString += " " + entriesArray[i][0];
            }
        }
        return classesString;
    }
    dayCells = fillDayCells(userId, lastDayOfMonth);
    return <tr className="employeeКRow">
        <td>{user.name}</td>
        {dayCells.map((e: CellInfo, index: number) => <td className={calculateClasses(e)}
                                                          key={"" + new Date() + index}/>
        )}
        <td className="weekend vacationSum">{vacationSum}</td>
    </tr>
}
