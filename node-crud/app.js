const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// MySQL Code goes here
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'node-crud'
})

// Get all rows from emp table
app.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from emp', (err, rows) => {     //query -->sql string and callback
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            
            console.log('The data from emp table are: \n', rows)
        })
    })
})


// Get an emp by id
app.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM emp WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) 
            {
                if(rows!=req.params.id)
                {
                    res.send('ID is not in db');
                }
                res.send(rows)
            }
             else
            {
                console.log(err)
            }
            
            console.log('The data from emp table are: \n', rows)
        })
    })
});


// Delete an emp by id
app.delete('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM emp WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`Employee with the ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from emp table are: \n', rows)
        })
    })
});


// Adding an Employee
app.post('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO emp SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`Employee has been added.`) 
        } else {
            console.log(err)
        }
        
        console.log('The data from emp table are:11 \n', rows)

        })
    })
});


// Update a employee row with id
app.put('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, name, designation, salary } = req.body

        connection.query('UPDATE emp SET name = ?, designation = ?, salary = ? WHERE id = ?', [name, designation, salary, id] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`Employee with the name: ${name} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})


// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listening on port ${port}`))