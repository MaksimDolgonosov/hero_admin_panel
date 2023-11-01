//import { useDispatch, useSelector } from "react-redux";
//import { useHttp } from "../../hooks/http.hook";
//import { heroesFetched, selectAll } from "../../reducers/heroes";
import { motion } from "framer-motion"
//import {motion} from 'framer-motion/dist/es/index'

import { useDeleteHeroMutation } from "../api/apiSlice";
const HeroesListItem = ({ name, description, element, id }) => {
    // const heroes = useSelector(selectAll);
    //const heroes = useSelector(state => state.heroes.heroes);
    // const dispatch = useDispatch();
    // const { request } = useHttp();

    const [deleteHero] = useDeleteHeroMutation();


    const removeHerro = (id) => {
        deleteHero(id)
        // const data = heroes.filter(hero => hero.id !== id);
        // dispatch(heroesFetched(data));
        // request("http://localhost:3001/heroes/" + id, "DELETE");

    }


    let elementClassName;

    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    return (
        //<AnimatePresence >
        <motion.li
            key={id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: .3 }}
            // transition={{
            //     type: "spring",
            //     stiffness: 260,
            //     damping: 20
            // }}
            exit={{ scale: 0 }}
            className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
            <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg"
                className="img-fluid w-25 d-inline"
                alt="unknown hero"
                style={{ 'objectFit': 'cover' }} />
            <div className="card-body">

                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button type="button" className="btn-close btn-close" aria-label="Close" onClick={() => removeHerro(id)}></button>
            </span>
        </motion.li>
        // </AnimatePresence>
    )
}




export default HeroesListItem;