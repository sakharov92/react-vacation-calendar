import React from "react";
import "./Footer.css"
import {Data} from "../../Interfaces/data";
import {vacationService} from "../../services/vacationService";
import {AvailableDates} from "../../Interfaces/vacation";
import {format, isWeekend} from "date-fns";

const FooterComponent: React.FC<{ datalist: Data | undefined, chosenDate: Date }> = ({datalist, chosenDate}) => {
    let statisticList = [].constructor(chosenDate.getDate()).fill("");
    let peopleOnVacationThisMonth: number = 0;
    const vacations = datalist?.users.map((user, index): AvailableDates[] => {
        return vacationService.generateVacationSetsByUserId(user.id, chosenDate, datalist.vacations);

    })
    let sumOfVacation = 0;

    const pathThroughtCurrentVacationSets = (vacationSet: AvailableDates[]) => {
        vacationSet.forEach((currentSet) => {
            let vacationArr = Array.from(currentSet.availableDatesList);
            if (vacationArr.length > 0) {
                vacationArr.forEach((vacationDate, index) => {
                    if (!isWeekend(new Date(vacationDate)))
                        statisticList[new Date(vacationDate).getDate() - 1] = +statisticList[new Date(vacationDate).getDate() - 1] + 1;
                })
            }
        })
        sumOfVacation = statisticList.reduce((acc: number, item: number | string) => {
            if (typeof item === "number") {
                return +acc + +item;
            }
            return +acc
        })
    }

    const pathThroughtVacatiosSets = () => {

        if (vacations) {
            vacations.forEach((element: AvailableDates[], index: number) => {
                if (element.length > 0) {
                    if (element[1].availableDatesList.size > 0 || element[0].availableDatesList.size > 0) {
                        peopleOnVacationThisMonth++;
                    }
                    pathThroughtCurrentVacationSets(element)
                }
            })
        }
    }

    pathThroughtVacatiosSets();


    return (
        <>
            <tbody>
            <tr className="weekend">
                <td className="footerHeader">Day-Person Stats</td>
                {statisticList.map((value: any, index: number) => <td key={"" + new Date() + index}
                                                                      className="footerCell">{value}</td>
                )}
                <td className="footerCell">{sumOfVacation}</td>
            </tr>
            </tbody>

            <tbody className="sumInfo">
            <tr className="sumInfoRow">
                <td>
                    <div className="footer">
                        <div className="container">
                            <div className="footer__inner">
                                <div
                                    className="footer__title">{`${format(chosenDate, 'MMMM')} ${chosenDate.getFullYear()}`} teams
                                    Summary
                                </div>
                                <div className="footer__stat">
                                    <div className="footer__text">On vacation</div>
                                    <div className="statistic">
                                        <div className="footer__amount">
                                            <i className="fas fa-users"/>
                                            <span className="usersAmount">{peopleOnVacationThisMonth}</span>
                                        </div>
                                        <div
                                            className="footer__percent">{datalist ? peopleOnVacationThisMonth * 100 / datalist.users.length : 0}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
            </tbody>
        </>
    )
}
export const Footer = React.memo(FooterComponent);
