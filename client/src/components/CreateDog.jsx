import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { getTemperaments, addDog } from '../store/actions';
import '../styles/CreateDog.scss';
import {validate} from './validate';

export default function CreateDog (){

    const temperaments = useSelector(state => state.temperaments);
    const [dogs, setDogs] = useState({
        image: "",
        name: "",
        max_weight: "",
        min_weight: "",
        max_height: "",
        min_height: "",
        life_time_max: "",
        life_time_min: "",
        temperaments:[]
    });
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getTemperaments());
    }, [dispatch]);

    

    const handleChange = (e) => {
        setDogs({
            ...dogs,
            [e.target.name]: e.target.value
        });

        setErrors(validate({
            ...dogs,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addDog(dogs));
        alert('Has creado una nueva raza de perritos');
        setDogs({
            image: "",
            name: "",
            max_weight: "",
            min_weight: "",
            max_height: "",
            min_height: "",
            life_time_max: "",
            life_time_min: "",
            temperaments:[]
        });
        navigate("/home");
    };

    const selectTemp = (e)=>{
        setDogs({
            ...dogs,
            temperaments: [...dogs.temperaments, e.target.value]
        });
        setErrors(validate({
            ...dogs,
            [e.target.name]: e.target.value
        }))
    };

    const clicked = (e) => {
        e.preventDefault();
        let temps = dogs.temperaments.filter(el => el !== e.target.value);
        setDogs({
            ...dogs,
            temperaments: temps
        });
    };

    return (
        <div className="form">
                <div className="create_container">
                    <h2 className="ingrese">Ingrese los datos para crear una nueva Raza</h2>
                     <form onSubmit={handleSubmit} className="form_input"> 
                        <div className="input">
                            <input 
                            className={errors.image && 'danger'}
                            value={dogs.image} 
                            type="text" 
                            id="image"
                            name="image" 
                            onChange={handleChange} 
                            placeholder="Ingresar url de imagen"/>
                            <span className="error">{errors.image}</span>
                        </div>
                        <div className="input">
                            <input
                            className={errors.name && 'danger'}
                            type="text" 
                            value={dogs.name} 
                            id="name"
                            name="name" 
                            onChange={handleChange} 
                            placeholder="* Ingresar nombre de raza"/>
                            <span className="error">{errors.name}</span>
                        </div>
                        <div className="input_altura"> 
                        <div className="max">
                        <input 
                            id="max_height"
                            className={errors.max_height && 'danger'} 
                            type="text" 
                            value={dogs.max_height} 
                            name="max_height"
                            onChange={handleChange}
                            placeholder="Ingresar altura máxima"/>
                            <span className="error">{errors.max_height}</span>
                        </div>
                            <div className="min">
                            <input 
                            className={errors.min_height && 'danger'}
                            type="text" 
                            value={dogs.min_height} 
                            id="min_height" 
                            name="min_height" 
                            onChange={handleChange}
                            placeholder="Ingresar altura mínima"/>
                            <span className="error">{errors.min_height}</span>
                            </div>   
                        </div>
                        <div className="input_peso">
                            <div className="max">
                            <input 
                            className={errors.max_weight && 'danger'}
                            type="text" 
                            value={dogs.max_weight}
                            id="max_weight" 
                            name="max_weight" 
                            onChange={handleChange} 
                            placeholder="* Ingresar peso máximo"/>
                            <span className="error">{errors.max_weight}</span>
                            </div>
                           <div className="min">
                           <input 
                            className={errors.min_weight && 'danger'}
                            type="text" 
                            value={dogs.min_weight} 
                            id="min_weight" 
                            name="min_weight" 
                            onChange={handleChange} 
                            placeholder="* Ingresar peso mínimo"/>
                            <span className="error">{errors.min_weight}</span>
                           </div>
                            
                        </div>
                        <div className="input_life">
                            <div className="max">
                            <input 
                            className={errors.life_time_max && 'danger'}
                            type="text" 
                            value={dogs.life_time_max} 
                            id="life_time_max"
                            name="life_time_max" 
                            onChange={handleChange}
                            placeholder="Ingresar tiempo Máximo de vida"/>
                            <span className="error">{errors.life_time_max}</span>
                            </div>
                            <div className="min">
                            <input 
                            className={errors.life_time_min && 'danger'}
                            type="text" 
                            value={dogs.life_time_min}
                            id="life_time_min"name="life_time_min" 
                            onChange={handleChange}
                            placeholder="Ingresar tiempo Mínimo de vida"/>
                            <span className="error">{errors.life_time_min}</span>
                            </div>
                            
                        </div>
                        <div className="input_temps">
                            <label>Temperamentos</label>
                             <select defaultValue="temp"
                             onChange={selectTemp} 
                             className="temps_select">
                                <option disabled
                                value="temp"> elige los temperamentos</option>
                                {temperaments.map((temps) => {
                                    return <option 
                                    value={temps.name} 
                                    key={temps.name}>{temps.name}</option>
                                })}
                            </select>
                        </div>
                        <ul className='create_temps'>
                            {dogs.temperaments.map( t =>
                            <div key={t} className="temp">
                                <li className="temp_li">{t}
                                <button className="button_red" name={t} onClick={clicked} type="button" value={t}>x</button>
                                </li>
                            </div>
                            )} 
                        </ul>
                        <div className="btn_form">
                            <Link to='/home'>
                                <input type="button" value="Inicio" className="btn_home"/> 
                            </Link>
                            <input type="submit"
                            disabled={(errors.image || errors.name || errors.max_height || errors.min_height || errors.max_weight || errors.min_weight || errors.life_time_max || errors.life_time_min)?true:false} value="Crear" className="btn_submit"/>
                        </div>        
                    </form>
                    <p>(<span>*</span>) Campos requeridos</p>
                </div>
        </div>
    )
};