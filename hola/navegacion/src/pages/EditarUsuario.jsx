import React,{useEffect, useState} from "react";
import api from '../components/api'
import { useNavigate, useParams } from "react-router-dom";

const EditarUsuiario = ()=>{
  const {id} = useParams();
  const [usuario,setUsuario]=useState({name:"",email:""});
  const navigate=useNavigate()
  useEffect(()=>{
    const buscarUsuario = async ()=>{
      try{
        const res = await api.get(`/user/${id}`); 
        setUsuario(res.data)
      }catch(e){
      console.log('error buscando el usuario',e);
      }
    };
    buscarUsuario();
  },[id]);
  const handleEditUser= async () =>{
try{
  await api.put(`/user/${id},usuario`)
  navigate('/usuarios')
} catch (e){
  console.log('error en handleEditUsuario', e);

}
  }; 
  const handleDeleteUser= async () =>{
    try{
      await api.delete(`/user/${id},usuario`)
      navigate('/Usuarios')
    } catch (e){
      console.log('error en handleEditUsuario', e);
    
    }
      };
  
      return(
        <div>
          <h1 className=" text-center font-bold underline text-3xl p-3 m-2"> CrearUsuario </h1>
          <div className=" max-w-xs">
            <input className=" shadow appearance-none border rounded w-full p-2 m-2 
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline " type="text" placeholder="Name" value={usuario.name} 
            onChange={(e)=> setUsuario({...usuario,name: e.target.value})} />
          </div>
          <div className=" max-w-xs">
            <input className=" shadow appearance-none border rounded w-full p-2 m-2 
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline "type="text" placeholder="Email" value={usuario.email} 
            onChange={(e)=> setUsuario({...usuario,email: e.target.value})} />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white fondt-bold p-2 m-2 
      rounded focus:outline-none focus:shadow-outline" type="submit"   onClick={handleEditUser}> Actualizar  Usuario</button>
      <button className="bg-red-500 hover:bg-blue-700 text-white fondt-bold p-2 m-2 
      rounded focus:outline-none focus:shadow-outline" type="submit"   onClick={handleDeleteUser}> Eliminar Usuario </button>
          </div>
      )
} 
export default EditarUsuiario 