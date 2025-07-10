const express = require('express');
const {getTasks, deleteTask, updateTask, addTask, updateTaskStatus} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');



const router = express.Router();

router.use(authMiddleware);

router.get('/', getTasks);  //  Handles GET requests for all tasks at '/tasks'
router.delete('/:id', deleteTask); //Handles delete requests at '/tasks/:id'
router.put('/:id', updateTask); // Handles put request at '/tasks/:id'
router.post('/', addTask); // Handles post requests at '/tasks'
router.patch('/:id', updateTaskStatus);





module.exports = router;