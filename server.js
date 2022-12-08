const express = require('express');

const app = express();

const port = 3001;

app.get('/', (req, res) => {
    res.send({
        data: 'Hola mundo'
    });
});

app.listen(port, () => {
    console.log('la placa esta en linea');
});


const express = require('express');
const Database = require('./database');
const port = 3001;
//Iniciamos en app el servidore web
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Servidor OK !!!');
})

app.get('/ruta', (req, res) => {
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM tabla', [],
        function (err, results, fields) {
            res.json(results)
        }
    );

})

//Habilitamos el servidor en el puerto indicado

app.listen(port, () => {
    console.log('Sevidor Express en: http://localhost:' + port);
})
