const express = require("express");
const morgan = require("morgan");
const app = express();


app.use((req, res, next) => {
    //console.log('Solicitud recibida: ' + req.url + ' por método ' + req.method);
    next();
});

app.use(morgan('tiny'))
app.use(express.json());
app.use(express.text());

app.get("/", (req, res, next) => {
    res.send('Contestando GET desde ServExpress');
});

//Recibiendo parametros en la cadena
app.get("/alumnos", (req, res, next) => {
    console.log(req.query)
    res.send('Contestando GET - Alumnos desde ServExpress');
});

//Recibiedo parametros con parte de ruta
app.get("/maestros/:carrera", (req, res, next) => {
    console.log(req.params.carrera)
    res.send('Contestando GET - Maestros desde ServExpress');
});

//Recibiendo parametros con Json en el body
app.get("/administrativos", (req, res, next) => {
    console.log(req.body.id);
    //console.log(req.body.nombre);

    for (const campo in req.body) {
        console.log(req.body[campo])
    }
    res.send('Contestando GET - Administrativos desde ServExpress');
});

app.post("/", (req, res, next) => {
    res.send('Contestando POST desde ServeExpress');
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
