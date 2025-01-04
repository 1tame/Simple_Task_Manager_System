const Task = require('../models/taskModel');

//getting all the tasks
exports.getTasks = async (req, res) =>{
    try {
        const task = await Task.find();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

//delete task by id
exports.deleteTask = async (req, res) =>{
    try {
        const {id} = req.params;
        await Task.findByIdAndDelete(id);
        res.status(200).json("Task deleted successfully")
    } catch (error) {
        res.status(500).json(error.message);
    }
};


//updating task by id 
exports.updateTask = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(updatedTask);
        
    } catch (error) {
        res.status(500).json(error.message);
    }
}


//adding new task
exports.addTask = async (req, res) =>{
    try {
        const {title} = await new Task(req.body);
        const newTask = await Task({title});
        const task = await newTask.save();
        res.status(200).json(task);

    } catch (error) {
        res.status(500).json("error: ", error.message);
        
    }
}