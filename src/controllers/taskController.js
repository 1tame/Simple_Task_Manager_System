const Task = require('../models/taskModel');

// ✅ Get all tasks for logged-in user with search + pagination
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    // Extract query params
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Build MongoDB filter
    const filter = {
      user: userId,
      title: { $regex: search, $options: 'i' } // case-insensitive search
    };

    // Calculate total matching tasks
    const totalTasks = await Task.countDocuments(filter);

    // Fetch paginated and filtered tasks
    const tasks = await Task.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); // optional: newest first

    res.status(200).json({
      total: totalTasks,
      page,
      limit,
      totalPages: Math.ceil(totalTasks / limit),
      tasks
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Add a new task for logged-in user
exports.addTask = async (req, res) => {
  try {
    const { name, status } = req.body;

    const newTask = new Task({
      title: name,
      status: status || 'pending',
      user: req.user._id
    });

    const task = await newTask.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update a task by ID (only if it belongs to user)
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete a task by ID (only if it belongs to user)
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ✅ PATCH only status of a task (if it belongs to user)
exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.status(200).json({ message: 'Status updated', task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*

//for development only

exports.clearAllTasks = async(req, res) =>{
  try{
    const result = await Task.deleteMany({});
    res.status(200).json({message: `${result.deletedCount} task deleted.`});
  } catch(error){
    res.status(500).json({message: error.message});
  };
};

*/