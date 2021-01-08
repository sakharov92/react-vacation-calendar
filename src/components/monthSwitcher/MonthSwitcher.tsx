import React from 'react';
import './MonthSwitcher.css';
import format from 'date-fns/format';

export const MonthSwitcher: React.FC<{ chosenDate: Date, switchMonth: Function }> = ({chosenDate, switchMonth}) => {
    return (
        <div className="month-switcher">
            <button className="month-switcher__btn" onClick={switchMonth.bind(this, "prev")}>
                <i className="fas fa-arrow-left"/>
            </button>
            <span className="month-switcher__month">{`${format(chosenDate, 'MMMM')} ${chosenDate.getFullYear()}`}</span>
            <button className="month-switcher__btn" onClick={switchMonth.bind(this, "next")}>
                <i className="fas fa-arrow-right"/>
            </button>
        </div>
    )
}
