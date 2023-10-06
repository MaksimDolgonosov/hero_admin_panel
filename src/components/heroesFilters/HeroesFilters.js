
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useSelector, useDispatch } from "react-redux";
import { heroesFetched } from "../../actions";
import { useHttp } from "../../hooks/http.hook";

const HeroesFilters = () => {
    const heroes = useSelector(state => state.heroes);
    const dispatch = useDispatch();


    const onFilter = (filterSelector) => {
        const { request } = useHttp;

        // request("http://localhost:3001/heroes")
        //     .then(data => {
        //         data = heroes.filter(hero => {
        //             return hero.element === filterSelector;
        //         })
        //             .then(data => dispatch(heroesFetched(data)))


        //     }
    }
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button data-filter="all" className="btn btn-outline-dark active">Все</button>
                    <button data-filter="fire" className="btn btn-danger">Огонь</button>
                    <button data-filter="water" className="btn btn-primary">Вода</button>
                    <button data-filter="wind" className="btn btn-success">Ветер</button>
                    <button data-filter="earth" className="btn btn-secondary">Земля</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;