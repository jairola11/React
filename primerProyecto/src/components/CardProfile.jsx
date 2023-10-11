import { defaults } from "autoprefixer";
import React from "react";

const person={
    nombre : 'Hedy ',
    apellido: 'Lammar',
    imagenUrl:'https://i.imgur.com/7vQD0fPs.jpg',
    dim:90,
    telefono:31212212

};
const CardProfile=()=>{
    return(
        <div className=" text-center bg-lime-700">
            <h1 className=" text-3xl font-bold underline">{person.nombre}{person.apellido}</h1>
            <img className=" rounderd-full mx-auto" src={person.imagenUrl} width={person.dim} height={person.dim} alt="" />

        </div>
    );
}
export default CardProfile