import React, {useEffect, useState} from "react";
import './Team.css';
import {ITeam} from "../../Interfaces/team";
import {Data} from "../../Interfaces/data"
import {isWeekend} from "date-fns";


export const Team: React.FC<{ team: ITeam, date: Date, dataList: Data }> = ({team, date, dataList}) => {
    const [daysArray, setDaysArray] = useState([].constructor(date.getDate()))
    useEffect(() => {
        setDaysArray([].constructor(date.getDate()).fill(""));
    }, [date])

    return (<tbody>
        <tr className="mainRow">
            <td className="teamInfo">
                <div className="teamInfo__wrapper">
                    <p className="teamInfo__name">{team.name}</p>
                    <div className="teamInfo__block">
                        <i className="fas fa-users"/>
                        <span>{team.percentageOfAbsent[date.getMonth()]}%</span>
                        <div className="percent">{}</div>
                        <button>
                            <i className="fas chevronBtn fa-chevron-up"/>
                        </button>
                    </div>
                </div>
            </td>
            {daysArray.map((e: string, index: number) => <td className="teamInfo" key={"" + new Date() + index}/>)}
            <td className="teamInfo"/>
        </tr>
        {
            dataList.users.map((user, index) => {
                if (user.teamId === team.id) {
                    console.log(user)
                    return (<tr className="employeeКRow" key={"" + new Date() + index}>
                            <td>{user.name}</td>
                            {daysArray.map((e: string, index: number) => <td className={
                                (isWeekend(new Date(date).setDate(index + 1))) ? "weekend" : ""}
                                                                             key={"" + new Date() + index}/>)}
                            <td/>
                        </tr>
                    )
                }
                return null
            })
        }

        </tbody>
    )
}
