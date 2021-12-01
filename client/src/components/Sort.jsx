import React, {useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux';
import '../styles/Sort.scss';
import {ASC, DESC, API, DB, PESO_ASC, PESO_DESC, ALL_TEMP} from '../const';
import {getTemperaments, sort, filterType } from '../store/actions';


export default function Sort({setPage}){

    const temps = useSelector(state => state.temperaments)
    console.log(temps);
    const dispatch = useDispatch();
    // const [select, setSelect] = useState('');

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch]);

    const selectChange = (e)=>{
        e.preventDefault();
        dispatch(sort(e.target.value));
        setPage(1);
    };
    const filterCreated = (e)=>{
        e.preventDefault();
        dispatch(filterType(e.target.value));
        setPage(1);
    };


    return (
        <div className="sort_container">
        <label name="ordenado" className="order_label">Ordenado: </label>
        <select name="ordenado" className="ordenado" defaultValue="sort" onChange={selectChange}>
            <option value="sort" disabled>Elige un orden</option>
            <optgroup label="De A-Z"  className="sort_names">
                <option value={ASC}>A-Z</option>
                <option value={DESC}>Z-A</option>
            </optgroup>
            <optgroup label="Por Peso" className="sort_weight">
                <option value={PESO_ASC}>Menor a mayor</option>
                <option value={PESO_DESC}>Mayor a menor</option>
            </optgroup>
        </select>
        <label name="filtrado" className="filter_label">Filtrado: </label>
        <select name="filtrado" className="filtrado" defaultValue="filter" onChange={filterCreated}>
        <option value="filter" disabled>Elige un filtrado</option>
        <optgroup label="Por Tipo"  className="sort_created">
            <option value={ALL_TEMP}>Todos</option>
            <option value={DB}>Creados</option>
            <option value={API}>Api</option>
        </optgroup>
        <optgroup label="Por Temperamento" className="temperamentos">
            <option disable="true" value={ALL_TEMP}>Todos</option>
                {temps?.map((temps) => {
                return <option key={temps.name}>{temps.name}</option>})}
        </optgroup>
        </select>
        </div>
    );
}
 