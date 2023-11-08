import React,{ useEffect, useState} from "react";
// import api from "../components/api";
import { Link } from "react-router-dom";

const ListarUser =()=>{
    const [usuario, setUsuario] = useState([]);

    useEffect(()=>{
        const fetchusuario =async()=>{
            try {
                const response = await api.get('/user');
                setUsuario(response.data);
            } catch (error) {
                console.error('error en datos: ', error)
            }
        };
        fetchusuario();
    },[]);

    return(
        <div className="m-3 p-3">
            <p className="font-bold">
                <Link to="/crear">Crear user </Link>
            </p>

        <h1>Usuario</h1>
        {usuario.map((usuario)=>(
            <div
            key={usuario.id}>
                <Link to={`/editar/${usuario.id}`}>{usuario.name}</Link>
            </div>
        ))}
        </div>
    )
}

export default ListarUser