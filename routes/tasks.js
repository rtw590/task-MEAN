var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://rob:qazqaz11!!MM@ds117888.mlab.com:17888/mytasklist_rob', ['tasks'])


//  Get all Tasks
router.get('/tasks', function (req, res, next) {
    db.tasks.find(function (err, tasks) {
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
})

//  Get Single Task

router.get('/task/:id', function (req, res, next) {
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function (err, task) {
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//  Save Task
router.post('/task', function (req, res, next) {
    var task = req.body;
    if (!task.title || (task.isDone + '')) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.save(task, function (err, task) {
            if(err){
                res.send(err);
            }
            res.json(tasks);
        });
    }
})

module.exports = router;
