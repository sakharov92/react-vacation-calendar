import './App.css';
import {MonthSwitcher} from './components/monthSwitcher/MonthSwitcher'
import {useEffect, useState} from "react";
import {CalendarTable} from './components/calendarTable/CalendarTable';
import {ModalForm} from "./components/modalForm/ModalForm";
import {departmentTeams} from './services/data';
import {statisticService} from "./services/statisticService";

const App: React.FC = () => {


    const [dataList, setDataList] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const [isFormShown, setIsFormShown] = useState(false)
    const [chosenDate, setChosenDate] = useState(() => {
        const date: Date = new Date();
        return new Date(date.getFullYear(), date.getMonth() + 1, 0)
    });

    useEffect(() => {

        setTimeout(() => {

            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify([departmentTeams]),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    setDataList(json[0])
                    setIsLoading(false)
                    statisticService.setStatisticArrAmount(json[0].users.length);
                });
        }, 1500);

    }, [])

    const switchMonth = (direction: string): void => {
        let newDate: Date;
        if (direction === 'prev') {
            newDate = new Date(chosenDate.getFullYear(), chosenDate.getMonth(), 0);
            setChosenDate(newDate);

        } else {
            newDate = new Date(chosenDate.getFullYear(), chosenDate.getMonth() + 2, 0)
            setChosenDate(newDate)

        }
    }

    const setFormState = (newFormState: boolean): void => {
        setIsFormShown(newFormState);
    }


    return (
        <div className="App">

            <ModalForm isLoading={isLoading} isFormShown={isFormShown} setIsLoading={setIsLoading}
                       setIsFormShown={setIsFormShown}/>
            <MonthSwitcher chosenDate={chosenDate} switchMonth={switchMonth}/>
            <CalendarTable chosenDate={chosenDate} setFormState={setFormState}
                           dataList={dataList}/>
        </div>
    )
}
export default App;
