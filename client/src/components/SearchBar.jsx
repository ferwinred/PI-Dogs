import React, { useState }  from 'react';
import { searchDogs, getDogs } from '../store/actions';
import { useDispatch } from 'react-redux';
import '../styles/SearchBar.scss';
import Sort from './Sort';

export default function SearchBar ({setPage}){

    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(searchDogs(input));
        setPage(1);
    };

    const onChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };

    const reload = (e) => {
        e.preventDefault();
        dispatch(getDogs());
        setInput('');
    };

    
    return (
        <div className="searchBar">
            <form onSubmit={onSubmit} className="search_form">
                <input onChange={onChange} placeholder="Ingresa una raza" type="text" value={input} className="search_input" required={true}/>
                <input type="submit" value="Buscar" className="btn_form" />
            </form>
            <form onSubmit={reload} className="form_limpiar">
                <input type="submit" value="limpiar"  className="btn_form" />
            </form>
            <Sort setPage={setPage}/>
        </div>
    )
}