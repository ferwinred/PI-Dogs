import React from 'react';
import '../styles/Dog.scss';
import {Link} from 'react-router-dom';

export default function Dog ({name, id, max_weight, min_weight, temperaments,  image}){
    console.log(temperaments);
    
    let temps = !Array.isArray(temperaments)? temperaments : temperaments.map(e => e.name).join(" ,");

    return (
        <div className='card'>
            <h3>{name}</h3>
            <img src={image} alt="Not Found" />
            <h4>PESO MIN: {min_weight} kg</h4>
            <h4>PESO MAX: {max_weight} kg</h4>
            <h4>{temps}</h4>
            <Link to={`/dog/${id}`}>
                <button className="dogDetails">View More</button>
            </Link>
        </div>
    )
}