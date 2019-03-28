const express = require('express');
const router = express.Router();

const createRouter = connection => {
    router.get('/', (req, res) => {
        connection.query('SELECT * FROM `places`', (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            res.send(results);
        });
    });

    router.get('/:id', (req, res) => {
        connection.query('SELECT * FROM `places` WHERE `id` = ?', req.params.id, (error, results) => {
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
        const place = req.body;

        connection.query('INSERT INTO `places` (`place`, `description`) VALUES (?, ?)', [place.place, place.description], (error) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            res.send({message: "Success"});
        });
    });

    router.delete('/:id', (req, res) => {
        connection.query('DELETE FROM `places` WHERE `id` = ?', req.params.id, (error) => {
            if (error) {
                res.status(500).send({error: error.sqlMessage});
            }
            res.send({message: "Success"});
        });
    });

    return router;
};


module.exports = createRouter;