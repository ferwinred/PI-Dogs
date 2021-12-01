import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from 'react-redux';
// import { ALL, API, ASCENDENTE, CREATED, DESCENDENTE } from "../const/sort";
// import { filterByTemperament, filterCreated, getTemperaments, sort, sortByWeight } from "../store/actions";
import Dog from './Dog';
import '../styles/Home.scss';
import { getDogs } from '../store/actions';
import Pages from './pages';
import SearchBar from "./SearchBar";
import doggy from '../images/gifs-perros-animados.gif';
import perrito from '../images/perrito_default.jpeg';
import dogCry from '../images/pngtree-cute-corgi-crying-dog-cartoon-image_2299953.jpg'

export default function Home () {

    const dog = useSelector((state)=>state.filters)
    const dispatch = useDispatch();
    console.log('Dogs en home: ', dog)
    const [ actualPage, setActualPage ] = useState(1);
    const [ cardsPerPage ] = useState(8);
    const lastCard = actualPage*cardsPerPage;
    const firstCard = lastCard - cardsPerPage;
    const cardsToShow = dog.slice(firstCard, lastCard);

    const paginado = (number)=>{
        setActualPage(number);
    };
  
    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch]);
   
    return (
        <div className="body">
            <SearchBar setPage={setActualPage}/>
            <Pages cardsPerPage={cardsPerPage} paginado={paginado} dogs={dog.length}/>
            <div className="main-cards">
            {cardsToShow.length === 0 ? 
            <div className="not_found"><img src={doggy} alt="cargando..."  className="cargando" /></div>
            : 
            (cardsToShow[0].length === 0)? <div className="sorry_dont">
            <img src={dogCry} alt="sorry" className="image_sorry"/>
            <h3>Sorry any dogs don't exist</h3> 
            </div>
            : cardsToShow.map(({name, id, max_weight, min_weight, temperaments, image}) => {
            return <Dog name={name} id={id} max_weight={max_weight} min_weight={min_weight} temperaments={temperaments} image={image? image : perrito} key={id}/>
            })}
            </div>
        </div>
        
    )
}