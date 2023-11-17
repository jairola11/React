import express from 'express';
import body_parser from 'body-parser';
import cors from 'cors';
import alquilerRuter from './routes/alquiler.jsla.routes.js';
import interesRuter from './routes/intereses.jsla.routes.js';
import articuloRuter from './routes/articulos.jsla.routes.js';
import clienteRuter from './routes/clientes.jsla.Routes.js';
import autRouter from './routes/aut.jsla.routes.js';

const api = express();

api.use(body_parser.json());
api.use(body_parser.urlencoded({ extended: false }));
api.use(cors());


api.set('view engine', 'ejs'); // Corrección de la línea
api.set('views', './views'); // Ruta al directorio de vistas

api.get('/document', (req, res) => {
    res.render('index.ejs');
});

api.use('/cliente', clienteRuter);
api.use('/alquiler', alquilerRuter);
api.use('/articulo', articuloRuter);
api.use('/interes', interesRuter);
api.use('/aut', autRouter);

api.listen(3000, () => {
    console.log('Servidor en ejecución en el puerto 3000');
});
