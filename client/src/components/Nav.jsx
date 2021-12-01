import React from 'react';
import { Link, Outlet } from "react-router-dom";
import '../styles/Nav.scss';
import logo from '../images/dog.png';
// import Sort from "./Sort";


export default function Nav (){
    return (
        <>
            <nav className='navBar'>
                {/* <img src={logo} alt="Logo App" className="App-logo"/> */}
                <h1 className ="title">D<span ><img src={logo} alt="Logo App" className="App-logo"/></span>ggy's</h1>

                <ul className='nav'>
                    <li className='links'> <Link to="/home" className='text-link'>Home</Link></li>
                    <li className='links'> <Link to="/create" className='text-link'>Create Dog</Link></li>
                    <li className='links'> <Link to="/" className='text-link'>Salir</Link></li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}