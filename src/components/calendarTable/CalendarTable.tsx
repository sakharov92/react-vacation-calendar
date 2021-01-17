import React from "react";
import "./CalendarTable.css";
import {Day} from "../../Interfaces/day";
import {format} from "date-fns";
import isWeekend from "date-fns/isWeekend";
import {Data} from "../../Interfaces/data";
import {Team} from "../team/Team";
import {Footer} from "../footer/Footer";;

export const CalendarTable: React.FC<{
    chosenDate: Date;
    setFormState: Function;
    dataList: Data | undefined;
}> = ({chosenDate, setFormState, dataList}) => {
    const fillMonthObj = (date: Date): Day[] => {
        const newDate: Date = new Date(date);
        const currentMonthObj: Day[] = [];
        const daysInMonth = newDate.getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            const iDate: Date = new Date(
                newDate.getFullYear(),
                newDate.getMonth(),
                i
            );
            const day: Day = {
                date: iDate,
                isDayOff: isWeekend(iDate),
                dayName: format(iDate, "iiiiii"),
            };
            currentMonthObj.push(day);
        }
        return currentMonthObj;
    };

    let currentMonthObj: Day[] = fillMonthObj(chosenDate);

    return (
        <section className="calendar">
            <table className="calendar__table">
                <thead>
                <tr className="outputCalendar">
                    <td className="addVacationCell outputItem">
                        <button
                            className="addVacationBtn"
                            onClick={setFormState.bind(this, true)}
                        >
                            Add Vacation
                        </button>
                    </td>
                    {currentMonthObj.map((item, index) => {
                        let itemClasses = item.isDayOff
                            ? "outputItem weekend"
                            : "outputItem";
                        return (
                            <td
                                key={"" + new Date().getMilliseconds() + index}
                                className={itemClasses}
                            >
                                <div className="innerWrapperDayItem">
                                    <span className="outputDay">{item.dayName}</span>
                                    <span className="outputDate">{item.date.getDate()}</span>
                                </div>
                            </td>
                        );
                    })}
                    <td className="sumCell outputItem">
                        <span className="calendar__text">Sum</span>
                    </td>
                </tr>
                </thead>

                {dataList?.teams.map((team, index) => {
                    return (
                        <Team
                            key={"" + new Date() + index}
                            team={team}
                            dataList={dataList}
                            date={chosenDate}
                        />
                    );
                })}
                <Footer datalist={dataList} chosenDate={chosenDate}/>
            </table>
        </section>
    );
};
