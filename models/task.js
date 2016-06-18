/**
 * Created by Henrique on 17/06/2016.
 */
var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    planned: {
        type: String,
        required: true
    },
    effort: {
        type: String
    },
    createdOn: {
        type: Date,
        required: true
    },
    finishedOn: {
        type: Date
    },
    developer: {
        type: String
    }
});

var Task = module.exports = mongoose.model('Task', taskSchema);

// Get To Do Tasks
module.exports.getTasks = function (callback, limit) {
    Task.find(callback).limit(limit);
};

// Get To Do Tasks
module.exports.getTasksToDo = function (callback, limit) {
    Task.find({"status": "ToDo"}, callback).limit(limit);
};

// Get Doing Tasks
module.exports.getTasksDoing = function (callback, limit) {
    Task.find({"status": "Doing"}, callback).limit(limit);
};

// Get Done Tasks
module.exports.getTasksDone = function (callback, limit) {
    Task.find({"status": "Done"}, callback).limit(limit);
};

// Get Task
module.exports.getTaskById = function (id, callback) {
    Task.findById(id, callback);
};

// Add Task
module.exports.addTask = function (task, callback) {
    Task.create(task, callback);
};

// Update Task
module.exports.updateTask = function (id, task, options, callback) {
    var query = {_id: id};
    var update = {
        title: task.title,
        status: task.status,
        description: task.description,
        planned: task.planned,
        effort: task.effort,
        createdOn: task.createdOn,
        finishedOn: task.finishedOn,
        developer: task.developer
    }
    Task.findOneAndUpdate(query, update, options, callback);
};

// Delete Task
module.exports.removeTask = function (id, callback) {
    var query = {_id: id};
    Task.remove(query, callback);
};
