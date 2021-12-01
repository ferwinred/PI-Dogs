import React from 'react';
import '../styles/Landing.scss'
import {Link} from 'react-router-dom';
import video from '../images/pexels-anna-bondarenko-6588292.mp4';
import logo from '../images/dog.png';

export default function Landing (){
    return (
        <div className="landing">
            <div className="content">
            <video autoPlay muted loop id="bg_video">
            <source src={video} type="video/mp4"/>
            </video></div> 
            <img src={logo} alt="logo Doggy Doggy" className="logo"/>
            <h2>BIENVENIDO A D<span><img src={logo} alt="logo Doggy Doggy" className="logo"/></span>GGY!</h2>
            <Link to='/home' className="btn_inicio">Inicio</Link>
        </div>
    );
};