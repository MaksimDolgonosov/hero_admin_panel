//import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line
import { heroesFetching, heroesFetched, heroesFetchingError, fetchHeroes, selectAll } from '../../reducers/heroes';
// eslint-disable-next-line
import { filtersInForm, filterHeroes } from '../../reducers/filters';
import { createSelector } from '@reduxjs/toolkit';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import { AnimatePresence } from 'framer-motion';


import { useGetHeroesQuery } from '../api/apiSlice';
// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const { data: heroes = [], isFetching, isLoading, isError } = useGetHeroesQuery();




    //const { heroes, heroesLoadingStatus } = useSelector(state => state.heroes);
   // const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
   // const dispatch = useDispatch();
    // const { request } = useHttp();

    const heroesSelector = createSelector(
        selectAll,
        //state => state.heroes.heroes,
        state => state.filters.activeFilter,
        (heroes, filter) => {
            if (filter === "all") {
                return heroes;
            } else {
                return heroes.filter(item => item.element === filter)
            }
        }
    )


    // const heroes = useSelector(heroesSelector);

    // useEffect(() => {
    //     // dispatch(heroesFetching());
    //     dispatch(fetchHeroes());
    //     dispatch(filterHeroes())
    //     // request("http://localhost:3001/heroes")
    //     //     .then(data => dispatch(heroesFetched(data)))
    //     //     .catch(() => dispatch(heroesFetchingError()))
    //     // request("http://localhost:3001/filters")
    //     //     .then(data => dispatch(filtersInForm(data.slice(1))))


    //     //.catch(() => dispatch(heroesFetchingError()))
    //     // eslint-disable-next-line
    // }, []);

    if ( isLoading ||  isFetching) {
        return <Spinner />;
    } else if ( isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return (
            <AnimatePresence>
                {arr.map(({ id, ...props }) => {
                    return <HeroesListItem key={id} {...props} id={id} />
                })}
            </AnimatePresence>
        )

    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;