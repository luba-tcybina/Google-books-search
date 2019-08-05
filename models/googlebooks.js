const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const GoogleBooksSchema = new Schema({
    title: {
        type: String,
        default: "",
    },
    authors: {
        type: Array,
        default: null,
    },
    description: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },
    link: {
        type: String,
        default: "",
    },
})

module.exports = GoogleBooks = mongoose.model("book", GoogleBooksSchema)