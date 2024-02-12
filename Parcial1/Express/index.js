const express = require("express");
const morgan = require("morgan");
const app = express();


app.use((req, res, next) => {
    console.log('Solicitud recibida: ' + req.url + ' por método ' + req.method);
    next();
});

app.use(morgan("combined"))

app.get("/", (req, res, next) => {
    res.send('Contestando GET');
});

app.post("/", (req, res, next) => {
    res.send('Contestando POST');
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
