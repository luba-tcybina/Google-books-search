const express = require("express");
const router = express.Router();

const GoogleBooks = require("../models/googlebooks");

router.get("/books", async (req, res) => {
    try{
        const savedBooks = await GoogleBooks.find({});
        return res.status(200).json({books: savedBooks})
    }catch(err) {
        console.log("get books err:", err)
    }
    return res.status(500).json();
});

router.post("/books", async (req, res) => {
    try{
        
        const newBook = req.body.bookInfo;
        const abook = await GoogleBooks.findOne({title: newBook.title, link:newBook.link})
        if(abook){
            abook.authors = newBook.authors;
            abook.description = newBook.description;
            abook.image = newBook.image;
            await abook.save();
        }
        else{
            const newOne = new GoogleBooks(newBook);
            await newOne.save();
        }
        return res.status(200).json()
    }catch(err) {
        console.log("post books err:", err)
    }
    return res.status(500).json();
});

router.delete("/books", async (req, res) => {
    try{
        const book = GoogleBooks.findById(req.body.id)
        if(book){
            await book.deleteOne();
            return res.status(200).json();
        }
    }catch(err){
        console.log("delete books err", err)
    }
    return res.status(500).json();
});


module.exports = router;
