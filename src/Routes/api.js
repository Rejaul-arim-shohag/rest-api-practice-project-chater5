const express = require('express');
const router = express.Router();
const ProfileController = require("../Controllers/ProfileController");
const TodoListController = require("../Controllers/TodoListController")
const AuthVerifyMiddleware = require("../Middleware/AuthVerifyMiddleware")

//userProfile 
router.post("/createProfile",ProfileController.createProfile);
router.post("/userLogin",ProfileController.userLogin);
router.get("/userRead",AuthVerifyMiddleware, ProfileController.userReadProfile);
router.post("/userUpdate",AuthVerifyMiddleware, ProfileController.updateProfile);

//user todo
router.post("/createTodo",AuthVerifyMiddleware, TodoListController.createTodo);
router.get("/readTodo",AuthVerifyMiddleware, TodoListController.selcetTodo);
router.post("/updateTodo",AuthVerifyMiddleware,TodoListController.updateTodo);
router.post("/updateTodoStatus", AuthVerifyMiddleware, TodoListController.updateTodoStatud);
router.delete("/removeTodo", AuthVerifyMiddleware, TodoListController.removeTodo);
router.post("/todoFindByStatus",AuthVerifyMiddleware,TodoListController.todoFindByStatus);
router.post("/todoFindByDate", AuthVerifyMiddleware, TodoListController.selectTodoByDate);
module.exports = router;