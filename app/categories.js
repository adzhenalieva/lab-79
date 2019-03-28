const express = require('express');
const router = express.Router();

const createRouter =connection => {
    router.get('/', (req, res) => {
        connection.query('SELECT * FROM `categories`', (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            res.send(results);
        });
    });

    router.get('/:id', (req, res) => {
        connection.query('SELECT * FROM `categories` WHERE `id` = ?', req.params.id, (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            if (results[0]) {
                res.send(results[0]);
            } else {
                res.status(404).send({error: "Not found"});
            }
        });

    });
    router.post('/', (req, res) => {
        const category = req.body;
        connection.query('INSERT INTO `categories` (`category`, `description`) VALUES (?, ?)', [category.category, category.description], (error) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            res.send({message: "Success"});
        });
    });

    router.delete('/:id', (req, res) => {
        connection.query('DELETE FROM `categories` WHERE `id` = ?', req.params.id, (error) => {
            if (error) {
                res.status(500).send({error: error.sqlMessage});
            }
            res.send({message: "Success"});
        });
    });

    return router;
};


module.exports = createRouter;