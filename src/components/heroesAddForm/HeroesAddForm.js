import { useFormik } from "formik";
import { object, string } from 'yup';
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line
import { heroesFetched, selectAll, heroesAdd } from "../../reducers/heroes";
import { selectAll as selectAllFilters } from "../../reducers/filters";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { useCreateHeroMutation } from "../api/apiSlice";
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const heroes = useSelector(selectAll);
    //const heroes = useSelector(state => state.heroes.heroes);
    const [newHerroItem] = useCreateHeroMutation();
    const filters = useSelector(selectAllFilters);

   // const filters = useSelector(state => state.filters.filters);
    const activeFilter = useSelector(state => state.filters.activeFilter);
    const dispatch = useDispatch();
    const { request } = useHttp();
    const options = filters.map((filter, i) => {
        switch (filter.name) {
            case "fire":
                return (
                    <option key={i} value="fire">Огонь</option>
                )
            case "water":
                return (
                    <option key={i} value="water">Вода</option>
                )
            case "wind":
                return (
                    <option key={i} value="wind">Ветер</option>
                )
            case "earth":
                return (
                    <option key={i} value="earth">Земля</option>
                )
            default:
                return null
        }


    })


    const formik = useFormik({
        initialValues: {
            name: "", description: "", element: ""
        },
        validationSchema: object({
            name: string().min(3, "Минимум 3 буквы").required("Обязательное поле"),
            description: string().min(5, "Минимум 5 букв").required("Обязательное поле"),
            element: string().required("Выберете элемент героя"),
        }),
        onSubmit: values => {
            const id = uuidv4();
            const newHerro = { id: id, ...values };



            const data = activeFilter === "all" ? [...heroes, newHerro] : [...heroes, newHerro].filter(hero => {
                return hero.element === activeFilter;
            });
            // // dispatch(heroesAdd(newHerro));
            dispatch(heroesFetched(data));
            // request("http://localhost:3001/heroes", "POST", JSON.stringify(newHerro));
            newHerroItem(newHerro).unwrap();
            formik.handleReset();
        },
    })

    return (
        <form onSubmit={formik.handleSubmit} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                />
            </div>
            {formik.errors.name && formik.touched.name ? <div>{formik.errors.name}</div> : null}
            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ "height": '130px' }}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    onBlur={formik.handleBlur} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    onChange={formik.handleChange}
                    value={formik.values.element}
                    onBlur={formik.handleBlur} as="select">
                    <option >Я владею элементом...</option>
                    {/* <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option> */}
                    {options}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}


export default HeroesAddForm;