const express = require('express');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const createRouter = connection => {
    router.get('/', (req, res) => {
        connection.query('SELECT * FROM `items`', (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            res.send(results);
        });

    });

    router.get('/:id', (req, res) => {
        connection.query('SELECT * FROM `items` WHERE `id` = ?', req.params.id, (error, results) => {
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
        const item = req.body;

        if(req.file){
            item.image = req.file.filename;
        }

        connection.query('INSERT INTO `items` (`item`, `category_id`, `place_id`, `description`, `image`, `date`) VALUES (?, ?, ?, ?, ?, ?)', [item.item, item.category_id, item.place_id, item.description, item.image, item.date], (error) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            res.send({message: "Success"});
        });

    });

    router.delete('/:id', (req, res) => {
        connection.query('DELETE FROM `items` WHERE `id` = ?', req.params.id, (error) => {
            if (error) {
                res.status(500).send({error: error.sqlMessage});
            }
            res.send({message: "Success"});
        });
    });

    return router;
};



module.exports = createRouter;