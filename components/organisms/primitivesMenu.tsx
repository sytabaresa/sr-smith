import React from "react";
import {
    BeakerIcon
  } from "@heroicons/react/outline";
import point from '../../assets/icons/point.png';
import line from '../../assets/icons/line.png';
import circle from '../../assets/icons/circle.jpeg';
import angle from '../../assets/icons/angle.webp';

const PrimitivesMenu = () => {
    return(
        <div className="dropdown">
            <button className="btn btn-primary"><BeakerIcon className="w-6" /></button>
            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a><img src={point.src} className='w-4 mr-2' alt="point" /> Punto</a></li>
                <li><a><img src={line.src} className='w-4 mr-2' alt="line" /> Linea</a></li>
                <li><a><img src={circle.src} className='w-4 mr-2' alt="circle" /> Circulo</a></li>
                <li><a><img src={angle.src} className='w-4 mr-2' alt="angle" /> Angulo</a></li>
            </ul>
        </div>
    )
}

export default PrimitivesMenu;