import express from 'express';
import cors from 'cors';
import usuarioRoute from './routers/usuario.route.js';
import juegosRoute from './routers/juegos.route.js';
import alquilarRoute from './routers/alquiler.route.js';

import  body_parser from 'body-parser';
import autRoute from './routers/autenticacion.route.js';

const app = express();


//app.use(express.json());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));
app.use(cors());

app.set('view engine','ejs');
app.set('views','./views');


app.get('/documents',(req,res)=>{
    res.render('index.ejs');
})

app.use(express.static('./public'));

app.use('/usuario',usuarioRoute);
app.use('/juego',juegosRoute);
app.use('/alquiler',alquilarRoute);
app.use('/auten',autRoute);

app.listen(3000,()=>{
    console.log("Servidor ejecutando en el puerto 3000")
});

