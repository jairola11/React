import  React,{useEffect,useState} from "react";
import api from "../components/api";
import { Link } from "react-router-dom";


const Listar=()=>{
  const[tasks,setTasks]=useState([]);
  useEffect(()=>{
    const  fetchTasks=async()=>{
      try{
    const response = await api.get('/user');
    setTasks(response.data);
      } catch(e){
        console.error(' Error en fetching usuarios',e)

      }
    };
    fetchTasks();

  },[]);
  return(
    <div className="m-p3 p-3">
      <p className=" font-bold ">
        <Link to="/crearusuario" > Crear Usuario</Link> 
      </p>
      <h1 className=" text-center font-bold underline text-3xl"> provedor</h1>
      {provedor.map((provedor)=>(
       <div className=" border-y-1 focus:bg-slate-300"  key={provedor.id}>
        <Link to={`/edit/${provedor.id}`}> {provedor.name}</Link>
       </div>
      ))}
    </div>
  )
}
export default Listar