const express = require('express');
const {getTasks, deleteTask, updateTask, addTask} = require('../controllers/taskController');



const router = express.Router();


/*router.get('tasks/tasks', getTasks);
router.delete('tasks/task/:id', deleteTask);
router.put('tasks/task/:id', updateTask);
router.post('tasks/task', addTask);*/

router.get('/', getTasks);  //  Handles GET requests for all tasks at '/tasks'
router.delete('/:id', deleteTask); //Handles delete requests at '/tasks/:id'
router.put('/:id', updateTask); // Handles put request at '/tasks/:id'
router.post('/', addTask); // Handles post requests at '/tasks'





module.exports = router;