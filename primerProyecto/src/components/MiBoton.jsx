import React from "react";

const MiBoton=()=>{
    const evetoBton =() => {
        alert('me hiciste clic');   
    }
    return(
        <div className=" text-center bg-red-600 p-3">
        <button className=" bg-slate-600  p-2   rounded-md text-white" onClick={evetoBton} > hazme clik </button>

        </div>
    )
}
 export  default MiBoton;