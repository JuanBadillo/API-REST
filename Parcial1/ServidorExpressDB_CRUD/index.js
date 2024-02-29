const express = require("express");
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'ejemplo',
});

app.use(bodyParser.json());

//GET - SELCECT 
app.get("/empleado", (req, res, next) => {    
    sql = "";
    if (req.query.id) {
        sql = "SELECT * FROM ejemplo.empleado WHERE ID="+[req.query.id]
    }
    else{
        sql = "SELECT * FROM ejemplo.empleado"
    }
    try {
        connection.query(
            sql,
            function (err, results, fields) {           
                if (results.length > 0) {
                    res.send(results); 
                }else{
                    res.send("No se encontro");
                }
            }
        );  
    } catch (error) {
        res.send(error); 
    }
});
//POST - INSERT
app.post("/empleado", (req, res) => {
    const empleado = req.body;
    connection.query('INSERT INTO ejemplo.empleado SET ?', empleado, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al agregar un empleado");
            return;
        }
        res.status(200).send("Empleado agregado correctamente");
    });
});
//PUT - UPDATE 
app.put("/empleado", (req, res) => {
    const id = req.query.id;
    const empleado = req.body;
    connection.query('UPDATE ejemplo.empleado SET ? WHERE ID = ?', [empleado, id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al actualizar empleado");
            return;
        }
        res.status(200).send("Empleado actualizado correctamente");
    });
});
//DELETE -DELETE
app.delete("/empleado", (req, res) => {
    const id = req.query.id;
    connection.query('DELETE FROM ejemplo.empleado WHERE ID = ?', id, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al eliminar empleado");
            return;
        }
        res.status(200).send("Empleado eliminado correctamente");
    });
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});