
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useDispatch } from "react-redux";
import { heroesFetched } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import { useState } from "react";
//const classNames = require('classnames');

const HeroesFilters = () => {

    const dispatch = useDispatch();
    const { request } = useHttp();
    const [active, setActive]= useState("all");


    const onFilter = (filterSelector) => {
        request("http://localhost:3001/heroes")
            .then(data => {
                if (filterSelector === "all") {
                    return data
                } else {
                    return data.filter(hero => {
                        return hero.element === filterSelector;
                    })
                }

            })
            .then(data => dispatch(heroesFetched(data)))
            .then(setActive(filterSelector))

    }
    // const btnActive = classNames({
    //     'active': activeButton === this.getAttribute("data-filter"),
    // });

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button data-filter="all" className={`btn btn-outline-dark${active === "all" ? " active" : ""}`} onClick={(e) => onFilter(e.target.getAttribute("data-filter"))}>Все</button>
                    <button data-filter="fire" className={`btn btn-danger${active === "fire" ? " active" : ""}`} onClick={(e) => onFilter(e.target.getAttribute("data-filter"))}>Огонь</button>
                    <button data-filter="water" className={`btn btn-primary${active === "water" ? " active" : ""}`} onClick={(e) => onFilter(e.target.getAttribute("data-filter"))}>Вода</button>
                    <button data-filter="wind" className={`btn btn-success${active === "wind" ? " active" : ""}`} onClick={(e) => onFilter(e.target.getAttribute("data-filter"))}>Ветер</button>
                    <button data-filter="earth" className={`btn btn-secondary${active === "earth" ? " active" : ""}`} onClick={(e) => onFilter(e.target.getAttribute("data-filter"))}>Земля</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;