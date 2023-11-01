import  React,{useEffect,useState} from "react";
import api from "../components/api";
import { Link } from "react-router-dom";
const ListarProveedor=()=>{
  const [proveedores, setProdeevor] = useState([])
  useEffect(() => {
    const fetchProveedor=async()=>{
    try {
      const response = await api.get('/listar');
      setProdeevor(response.data);
    } catch (e) {
      console.error(' Error en fetching provedor',e)
    }
    };
    fetchProveedor();
  },[])
  return(
    <div className="m-3 p-3 ">
      <p className=" font-bold">
        <Link  to={"/registrarProveedor"}> Registrar Provedor</Link>
      </p>
      <h1 className=" text-center font-bold underline text-3xl"> usuarios</h1>
      {proveedores.map((proveedor)=>(
       <div className=" border-y-1 focus:bg-slate-300"  key={proveedor.id_proveedores}>
        <Link to={`/edit/${proveedor.id_proveedores}`}> {proveedor.nombre_proveedores} {proveedor.telefono_proveedores}{proveedor.direccion_proveedores}</Link>
       </div>
      ))}

    </div>
  )
}
export default ListarProveedor