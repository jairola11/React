import express from "express";
import body_parser from "body-parser"
import usuarioRoute from "./routers/usuario.route.js";
import juegosRoute from "./routers/juego.route.js";
import alquilarRoute from "./routers/alquiler.route.js";
import autRote from "./routers//autenticacion.route.js"
import cors from "cors"

const app = express();


/* app.use(express.json()); */
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }))


// app.use(usuarioRoute);


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));
app.use(cors());

app.get('/documents', (req, res) => {
    res.render('index.ejs');
});

app.use(`/verificaion`, autRote)
app.use("/usuario", usuarioRoute)
app.use(`/juego`, juegosRoute)
app.use(`/alquiler`, alquilarRoute)

app.listen(4000, () => {
    console.log("Servidor se esta ejecutando en el puerto 4000");
});





