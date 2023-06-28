const Todo = require('../model/todo.model')
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

// create todo
const createTodo = async (req, res) => {
   const authHeader = req.headers.authorization || req.headers.Authorization;
   const token = authHeader.split(' ')[1];
   const userId = jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      return decoded.foundUser._id;
   });

   try {
      const { text, date } = req.body;
      const todo = await Todo.create({
         text,
         date,
         user: userId
      });
      if (todo) res.status(200).json(todo)

   } catch (error) {
      res.status(400).json(error)
   }
};

// get all Todos
const getTodos = async (req, res) => {
   try {
      const authHeader = req.headers.authorization || req.headers.Authorization;
      const token = authHeader.split(' ')[1];

      const userId = jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
         return decoded.foundUser._id;
      });
      const todos = await Todo.find({ user: userId });


      if (!todos) res.status(404).json('no todo found')
      res.status(200).json(todos)
   } catch (error) {

   }
}

// get todos by id
const getTodo = async (req, res) => {
   const id = req.params.id;

   try {
      const authHeader = req.headers.authorization || req.headers.Authorization;
      const token = authHeader.split(' ')[1];

      const userId = jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
         return decoded.foundUser._id;
      });
      const todos = await Todo.find({ _id: id, user: userId });

      res.status(200).json(todos)
   } catch (err) {
      res.status(400).json(err)
   }
}

// update todo
const updateTodo = async (req, res) => {
   const todoID = req.body.id;
   const authHeader = req.headers.authorization || req.headers.Authorization;
   const token = authHeader.split(' ')[1];

   const userId = jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      return decoded.foundUser._id;
   });

   try {
      const todo = await Todo.findById(todoID);
      const id = new ObjectId(todo.user).toString()

      if (id !== userId) {
         res.status(401).json('can"t update');
      } else {
         await todo.updateOne({ $set: req.body })
         res.status(200).json('updated successfully')
      }
   } catch (err) {
      res.status(500).json({ 'err': err.message })
   }
}
// await todo.updateOne({ $set: req.body })

// delete todo

const deleteTodo = async (req, res) => {
   const todoID = req.params.id
   const authHeader = req.headers.authorization || req.headers.Authorization;
   const token = authHeader.split(' ')[1];

   const userId = jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      return decoded.foundUser._id;
   });

   try {
      const todo = await Todo.findById(todoID);
      const id = new ObjectId(todo.user).toString()

      if (id !== userId) {
         res.status(401).json('can"t delete');
      } else {
         await todo.deleteOne();
         res.status(200).json('deleted successfully')
      }
   } catch (err) {
      res.status(500).json({ 'err': err.message })
   }
}

module.exports = { createTodo, getTodos, getTodo, updateTodo, deleteTodo }