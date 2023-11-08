import React from "react";

const Contacto = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex">
       
        <div className="w-1/2">
          <img
            src="/public/descarga.png"
            alt="Foto de contacto"
            className="w-full h-auto"
          />
        </div>

        <div className="w-1/2">
          <form className="p-4">
            <h2 className="text-2xl font-bold mb-4">Envía tus sugerencias</h2>

            <div className="mb-4">
              <label htmlFor="titulo">Título de la sugerencia:</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                className="w-full border border-gray-300 p-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="descripcion">Descripción de la sugerencia:</label>
              <textarea
                id="descripcion"
                name="descripcion"
                className="w-full border border-gray-300 p-2"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
