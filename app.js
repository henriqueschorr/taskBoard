var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

Task = require('./models/task');

// Connect to mongoose
mongoose.connect('mongodb://localhost/taskboard');
var db = mongoose.connection;

app.get('/api/tasks', function (req, res) {
    Task.getTasks(function (err, tasks) {
        if (err) {
            throw err;
        }
        res.json(tasks);
    });
});

app.get('/api/tasks/todo', function (req, res) {
    Task.getTasksToDo(function (err, tasks) {
        if (err) {
            throw err;
        }
        res.json(tasks);
    });
});

app.get('/api/tasks/doing', function (req, res) {
    Task.getTasksDoing(function (err, tasks) {
        if (err) {
            throw err;
        }
        res.json(tasks);
    });
});

app.get('/api/tasks/done', function (req, res) {
    Task.getTasksDone(function (err, tasks) {
        if (err) {
            throw err;
        }
        res.json(tasks);
    });
});

app.get('/api/tasks/:_id', function (req, res) {
    Task.getTaskById(req.params._id, function (err, task) {
        if (err) {
            throw err;
        }
        res.json(task);
    });
});

app.post('/api/tasks', function (req, res) {
    var task = req.body;
    task.createdOn = Date.now();

    Task.addTask(task, function (err, task) {
        if (err) {
            throw err;
        }
        res.json(task);
    });
})

app.put('/api/tasks/:_id', function (req, res) {
    var id = req.params._id;
    var task = req.body;

    if (task.status === "Done") {
        task.finishedOn = Date.now();
    }

    Task.updateTask(id, task, {}, function (err, task) {
        if (err) {
            throw err;
        }
        res.json(task);
    });
});

app.delete('/api/tasks/:_id', function (req, res) {
    var id = req.params._id;

    Task.removeTask(id, function (err, task) {
        if (err) {
            throw err;
        }
        res.json(task);
    });
});


var port = Number(process.env.PORT || 3000);

app.listen(port);
console.log('Running on port 3000...');