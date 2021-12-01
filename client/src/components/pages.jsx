import React from 'react';
import '../styles/Pages.scss';

export default function Pages ({dogs, cardsPerPage, paginado}){

    let pages = [];
    for(let i=1; i<Math.ceil(dogs/cardsPerPage);i++){
        pages.push(i);
    };
   
    return (
        <nav className="nav_paginado">
            <ul className="paginado">
                {pages.map((n)=>{
                    return <li className='pages' key={n}> <button onClick={() => paginado(n)} className="btn_pages">{n}</button> </li> ;
                    })}
            </ul>
        </nav>
    )
}

