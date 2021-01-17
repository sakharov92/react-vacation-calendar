import React, {useEffect, useState} from "react";
import "./Team.css";
import {ITeam} from "../../Interfaces/team";
import {Data} from "../../Interfaces/data";
import {User} from "../user/User";

const TeamComponent: React.FC<{
    team: ITeam;
    date: Date;
    dataList: Data;
}> = ({team, date, dataList}) => {
    const [daysArray, setDaysArray] = useState([].constructor(date.getDate()));
    let usersInCurrentTeam = 0;
    const [isTeamHide, setIsTeamHide] = useState(false);

    const hideTeam = (): void => {
        setIsTeamHide(!isTeamHide);
    };

    useEffect((): void => {
        setDaysArray([].constructor(date.getDate()).fill(""));
    }, [date]);
    dataList.users.forEach((item) => {
        if (item.teamId === team.id) {
            usersInCurrentTeam++;
        }
    });
    return (
        <tbody>
        <tr className="mainRow">
            <td className="teamInfo">
                <div className="teamInfo__wrapper">
                    <p className="teamInfo__name">{team.name}</p>
                    <div className="teamInfo__block">
                        <i className="fas fa-users"/>
                        <span>{usersInCurrentTeam}</span>
                        <div className="percent">
                            {team.percentageOfAbsent[date.getMonth()]}%
                        </div>
                        <button onClick={hideTeam}>
                            {<i className={isTeamHide ? "arrow-show" : "arrow-hide"}/>}
                        </button>
                    </div>
                </div>
            </td>
            {daysArray.map((e: string, index: number) => (
                <td className="teamInfo" key={"" + new Date() + index}/>
            ))}
            <td className="teamInfo"/>
        </tr>

        {dataList.users.map((user, index) => {
            if (user.teamId === team.id && !isTeamHide) {
                return (
                    <User
                        key={"" + new Date() + index}
                        date={date}
                        user={user}
                        dataList={dataList}
                    />
                );
            }
            return null;
        })}
        </tbody>
    );
};
export const Team = React.memo(TeamComponent);
