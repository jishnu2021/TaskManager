const router = require('express').Router();

const {registerAdmin,loginAdmin}=require('../controllers/Admin-Controller');
const {registerUser,loginUser}=require('../controllers/User-Controller');

const TaskController = require('../controllers/Task-Controller');

const {alltasks,deleteTask,completetask,todotask,incomplete} = require('../controllers/Task-Controller')

router.post('/tasks', TaskController.addTask); 
router.put('/tasks/:taskId', TaskController.updateTask);
router.delete('/tasks/:taskId', deleteTask); 
router.get('/alltasks',alltasks)
router.get('/tasks/complete',completetask)
router.get('/tasks/todo',todotask)
router.get('/tasks/incomplete',incomplete)
router.post('/adminregister',registerAdmin);
router.post('/adminlogin',loginAdmin);

router.post('/registeruser',registerUser);
router.post('/loginuser',loginUser);




module.exports = router;
