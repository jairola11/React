import React,{useEffect,useRef} from "react";
import api from '../components/api'
import { useNavigate } from "react-router-dom";

const CrearUsuario=()=>{
  const name =useRef();
  const email =useRef();
  const password=useRef();
  const navigate=useNavigate()  
  
  useEffect(()=>{
    name.current.focus();
  },[])
  const handleSubmit =(e)=>{
    e.preventDefault();
    const data ={
      name:name.current.value,
      email:email.current.value,
      password:password.current.value,
    };
    api.post("/user",data,{}).finally(()=>{
      navigate('/Usuarios')
    })
  }
  return(
    <form onSubmit={handleSubmit} method="post" >
      <h1 className=" text-center font-bold underline text-3xl p-3 m-2"> CrearUsuario </h1>
      <div className=" max-w-xs">
        <input className=" shadow appearance-none border rounded w-full p-2 m-2 
        text-gray-700 leading-tight focus:outline-none focus:shadow-outline " type="name" id="name " name="name" ref={name} placeholder="nombre" />
      </div>
      <div className=" max-w-xs">
        <input className=" shadow appearance-none border rounded w-full p-2 m-2 
        text-gray-700 leading-tight focus:outline-none focus:shadow-outline " type="email" id="email " name="email" ref={email} placeholder="email" />
      </div>
      <div className=" max-w-xs">
        <input className=" shadow appearance-none border rounded w-full p-2 m-2 
        text-gray-700 leading-tight focus:outline-none focus:shadow-outline " type="password" id="password " name="password" ref={password} placeholder="password" />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white fondt-bold p-2 m-2 
      rounded focus:outline-none focus:shadow-outline" type="submit" > registar Usuario</button>
    </form>
  )
}
export default CrearUsuario