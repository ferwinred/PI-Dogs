import React, { useEffect } from 'react';
import '../styles/DogDetail.scss';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../store/actions";
import doggy from '../images/gifs-perros-animados.gif';
import perrito from '../images/perrito_default.jpeg';

export default function DogDetail(){

    const { id } = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        return dispatch(getDetail(id))
    }, [dispatch, id])
    console.log(id)
    const dog = useSelector((state) => state.detail);
   console.log(dog)
   console.log(dog.createdAt)
    return (
        
        <div className="detail">
            {
            dog.length > 0 ?
            <div className="cardDetail">
                    <h2>{dog[0].name}</h2>
                <div className="info">
                    <h4>Peso Máximo: {dog[0].max_weight} kg</h4>
                    <h4>Peso Mínimo: {dog[0].min_weight} kg</h4>
                    <h4>Altura Máxima: {dog[0].max_height} cm</h4>
                    <h4>Altura Mínima: {dog[0].min_height} cm</h4>
                    <h4>Años de vida Máximos: {dog[0].life_time_max} años</h4>
                    <h4>Años de vida Mínimos: {dog[0].life_time_min} años</h4>
                </div>
                <img src={(dog[0].image)? dog[0].image : perrito} alt="Not Found" />
                <h4>Temperaments: { !dog[0].createdAt ? dog[0].temperaments : dog[0].temperaments.map(e => e.name).join(", ")}</h4>
            </div>  
        : <img src={doggy} alt="cargando..." className="cargando"/>}
         </div>
    )
}