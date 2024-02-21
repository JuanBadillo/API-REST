const express = require("express");
const app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'ejemplo',
});


app.get("/empleado", (req, res, next) => {
    //res.send('Contestando GET');
    
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
            //res.send(results);

            
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

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
