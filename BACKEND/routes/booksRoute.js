import express from 'express';
import {Book} from '../models';
const router=express.Router();

//route to save a new book
router.post('/',async(req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
          return res.status(400).send({
            message:'send all required feilds:title,author,publishYear',
          })
        }
        const newBook={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
        }
        const book=await Book.create(newBook);
        res.status(201).send(book);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})
 //Route for get all books from database 
 router.get('/',async(req,res)=>{
    try{
     const books=await Book.find({});
     return res.status(200).json({
        count:books.length,
        data:books,
     });
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
 })
 //Route for get one book from database by id
 router.get('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
     const book=await Book.findById(id);
     return res.status(200).json(book);
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
 })
 //Route for update a book 
 router.put('/:id',async(req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
              message:'send all required feilds:title,author,publishYear',
            })
          }
          const {id}=req.params;
          const result=await Book.findByIdAndUpdate(id,req.body);
          if(!result){
            res.status(404).json({message:'Book Not Found'});
          }
          return res.status(200).send({message:'Book Updated Successfully'});
        }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
 })
 //Route for delete a Book 
 router.delete('/:id',async(req,res)=>{
    try{
          const {id}=req.params;
          const result=await Book.findByIdAndDelete(id);
          if(!result){
            res.status(404).json({message:'Book Not Found'});
          }
          return res.status(200).send({message:'Book Deleted Successfully'});
        }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
 })
 export default router;