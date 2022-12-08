const express = require('express');
const Database = require('./database');
const cors = require('cors');
const port = 3001;
//Iniciamos en app el servidore web
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Servidor OK !!!');
})

app.get('/estudiante', (req, res) => {
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM inteledu.estudiante', [],
        function (err, results, fields) {
            res.json(results)
        }
    );

})

app.get('/profe', (req, res) => {
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM inteledu.profesor', [],
        function (err, results, fields) {
            res.json(results)
        }
    );

})

app.get('/juegos', (req, res) => {
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM inteledu.juegos', [],
        function (err, results, fields) {
            res.json(results)
        }
    );

})

//Relacional
app.get('/estuprofe', (req, res) => {
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT p.*, e.nombre estudiante FROM profesor p JOIN estudiante e ON p.estudiante_id = e.id;', [],
        function (err, results, fields) {
            res.json(results)
        }
    );

})

//Relacional
app.get('/profestu', (req, res) => {
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT e.*, p.nombre profesor FROM estudiante e JOIN profesor p ON e.profesor_id = p.id;', [],
        function (err, results, fields) {
            res.json(results)
        }
    );

})

 //REquest peticion     response  response
 app.post('/estudiante', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO inteledu.estudiante     
                (nombre, edad, curso, mail, contraseña, profesor_id) VALUES
                 (?,?,?,?,?,?)`;

    cn.execute(
        query, [body.nombre, body.edad, body.curso, body.mail, body.contraseña, body.profesor_id],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})

//REquest peticion     response  response
app.post('/profe', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO inteledu.profesor     
                (curso,	edad_alumnos, nombre, mail, contraseña, estudiante_id) VALUES
                 (?,?,?,?,?,?)`;

    cn.execute(
        query, [body.curso, body.edad_alumnos, body.nombre, body.mail, body.contraseña, body.estudiante_id],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})

 //REquest peticion     response  response
 app.post('/juegos', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO inteledu.juegos     
                (niveles, descripcion, estudiante_id) VALUES
                 (?,?,?)`;

    cn.execute(
        query, [body.niveles, body.descripcion, body.estudiante_id],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})
//update
app.put('/estudiante', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `UPDATE inteledu.estudiante     
                SET nombre=?, edad=?, curso=?, mail=?, contraseña=?, profesor_id=? 
                WHERE id = ?`;
    cn.execute(
        query, [body.nombre, body.edad, body.curso, body.mail, body.contraseña,body.profesor_id, body.id],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})

 //update
 app.put('/profe', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `UPDATE inteledu.profesor     
                SET curso=?, edad_alumnos=?, nombre=?, mail=?, contraseña=?, estudiante_id=? 
                WHERE id = ?`;
    cn.execute(
        query, [body.curso, body.edad_alumnos, body.nombre, body.mail, body.contraseña, body.estudiante_id, body.id],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})

//update
app.put('/juegos', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `UPDATE inteledu.juegos     
                SET niveles=?, descripcion=?, estudiante_id=? 
                WHERE id = ?`;
    cn.execute(
        query, [body.niveles, body.descripcion, body.estudiante_id, body.id],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})


// Obtener solo una update
app.get('/estudiante/:id', (req, res) => {
    const { id } = req.params;
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM inteledu.estudiante WHERE id = ?', [id],
        function (err, results, fields) {
            res.json(results[0])
        }
    );

})


// Obtener solo una update
app.get('/profe/:id', (req, res) => {
    const { id } = req.params;
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM inteledu.profesor WHERE id = ?', [id],
        function (err, results, fields) {
            res.json(results[0])
        }
    );

})

// Obtener solo una update
app.get('/juegos/:id', (req, res) => {
    const { id } = req.params;
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM inteledu.juegos WHERE id = ?', [id],
        function (err, results, fields) {
            res.json(results[0])
        }
    );

})

app.get('/estudiante/:searchItem/search', (req, res) => {
    const { searchItem } = req.params;    
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        "SELECT * FROM estudiante WHERE nombre like CONCAT('%',?,'%')", [searchItem],
        function (err, results, fields) {
            res.json(results)
        }
    );

})

app.get('/profe/:searchItem/search', (req, res) => {
    const { searchItem } = req.params;    
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        "SELECT * FROM profesor WHERE nombre like CONCAT('%',?,'%')", [searchItem],
        function (err, results, fields) {
            res.json(results)
        }
    );

})

app.get('/juegos/:searchItem/search', (req, res) => {
    const { searchItem } = req.params;    
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        "SELECT * FROM juegos WHERE nivel like CONCAT('%',?,'%')", [searchItem],
        function (err, results, fields) {
            res.json(results)
        }
    );

})


                   
                   
//Habilitamos el servidor en el puerto indicado

app.listen(port, () => {
    console.log('Sevidor Express en: http://localhost:' + port);
})