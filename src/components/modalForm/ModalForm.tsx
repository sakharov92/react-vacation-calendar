import React, {useEffect, useState} from "react";
import './ModalForm.css'

export const ModalForm: React.FC<{
    isLoading: boolean, isFormShown: boolean, setIsFormShown: Function, setIsLoading: Function
}> = ({isLoading, isFormShown, setIsLoading, setIsFormShown}) => {

    const [daysOff, setDaysOff] = useState("0");
    const [dateFromString, setDateFromString] = useState("");
    const [dateToString, setDateToString] = useState("");

    useEffect(() => {
        if (dateFromString && dateToString) {
            let difference: number =
                (Number(new Date(dateToString)) -
                    Number(new Date(dateFromString))) /
                (1000 * 3600 * 24);
            if (difference < 0) {
                let dateFrom = dateFromString;
                setDateFromString(dateToString);
                setDateToString(dateFrom);
                difference = -difference;
                setDaysOff(difference + " days");
            } else {
                setDaysOff(difference + " days");
            }
        }
    }, [dateToString, dateFromString])

    const hideModalWindow = (event: React.MouseEvent): void => {
        if (!isLoading) {
            event.preventDefault();
            setIsLoading(false);
            setIsFormShown(false);
        }
    }

    const dateInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.classList.contains("form__input-from") ? setDateFromString(event.target.value) : setDateToString(event.target.value);
    }

    if (!isFormShown && !isLoading) {
        return null;
    }

    return (
        <div className="modalBackground" onClick={hideModalWindow}>
            {isLoading && (<div className="loadingWindow">
                <p className="loadingWindow__text"> Loading ...</p>
            </div>)
            }
            {isFormShown && (
                <div className="inputForm form__container" onClick={event => event.stopPropagation()}>
                    <form className="form" id="form">
                        <div className="form__header">
                            <h3 className="form__title">Vacation Request</h3>
                            <div className="form__days-counter">
                                <p className="form__days-text">{daysOff}</p>
                            </div>
                        </div>
                        <div className="form__body">
                            <div className="form__dates-subtitle">
                                <h4>Dates</h4>
                            </div>
                            <div className="form__inputs-group">
                                <div className="form__input-wrapper">
                                    <label>
                                        <input className="form__input-from form__input" type="date"
                                               value={dateFromString}
                                               onChange={dateInputHandler}/>
                                        From</label>
                                </div>
                                <div className="form__input-wrapper">
                                    <label>
                                        <input className="form__input-to form__input" type="date" value={dateToString}
                                               onChange={dateInputHandler}/>
                                        To</label>
                                </div>
                                <div className="form__select-wrapper">
                                    <div className="form__dates-subtitle">
                                        <h4>Vac Type</h4>
                                    </div>
                                    <select form="form" name="" id="" className="form__select">
                                        <option>Paid Day Off (PD)</option>
                                        <option>Unpaid Day (UD)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form__footer">
                            <button className="form__cancel-btn form__btn" type="submit"
                                    onClick={hideModalWindow}>Cancel
                            </button>
                            <button className="form__send-btn form__btn">Send</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
