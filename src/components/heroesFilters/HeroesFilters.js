
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useDispatch, useSelector } from "react-redux";
// import { heroesFetched } from "../../reducers/heroes";
// import { useHttp } from "../../hooks/http.hook";
//import { useState } from "react";
import { activeFilter } from "../../reducers/filters";
//const classNames = require('classnames');

const HeroesFilters = () => {
    const currentFilter = useSelector(state => state.filters.activeFilter);
    const dispatch = useDispatch();
   // const { request } = useHttp();
    // const [active, setActive]= useState("all");


    const onFilter = (filterSelector) => {

        
        dispatch(activeFilter(filterSelector));
        // request("http://localhost:3001/heroes")
        //     .then(data => {
        //         if (filterSelector === "all") {
        //             return data
        //         } else {
        //             return data.filter(hero => {
        //                 return hero.element === filterSelector;
        //             })
        //         }

        //     })
            //.then(data => dispatch(heroesFetched(data)))
    }
    // const btnActive = classNames({
    //     'active': activeButton === this.getAttribute("data-filter"),
    // });

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button data-filter="all" className={`btn btn-outline-dark${currentFilter === "all" ? " active" : ""}`} onClick={(e) => onFilter(e.target.getAttribute("data-filter"))}>Все</button>
                    <button data-filter="fire" className={`btn btn-danger${currentFilter === "fire" ? " active" : ""}`} onClick={(e) => onFilter(e.target.getAttribute("data-filter"))}>Огонь</button>
                    <button data-filter="water" className={`btn btn-primary${currentFilter === "water" ? " active" : ""}`} onClick={(e) => onFilter(e.target.getAttribute("data-filter"))}>Вода</button>
                    <button data-filter="wind" className={`btn btn-success${currentFilter === "wind" ? " active" : ""}`} onClick={(e) => onFilter(e.target.getAttribute("data-filter"))}>Ветер</button>
                    <button data-filter="earth" className={`btn btn-secondary${currentFilter === "earth" ? " active" : ""}`} onClick={(e) => onFilter(e.target.getAttribute("data-filter"))}>Земля</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;