const express = require("express");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const api = require("./routes/api");
var cors = require("cors");
const path = require("path");
const GoogleBooks = require("./models/googlebooks");

const app = express();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client/build")));

const db = require("./config/key").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(async () => {
    console.log("MongoDB connected");
    try {
      const books = await GoogleBooks.find({});
      if (!books || (books && books.length === 0)) {
        const initialBook = new GoogleBooks({
          authors: ["Suzanne Collins"],
          description:
            "Set in a dark vision of the near future, a terrifying reality TV show is taking place. Twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed. When sixteen-year-old Katniss Everdeen steps forward to take her younger sister's place in the games, she sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature.",
          image:
            "http://books.google.com/books/content?id=sazytgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          link:
            "http://books.google.com/books?id=sazytgAACAAJ&dq=title:The+Hunger+Games&hl=&source=gbs_api",
          title: "The Hunger Games"
        });
        await initialBook.save();
        console.log("Initial Book Data Added");
      }
    } catch (err) {
      console.log("init db err:", err);
    }
  })
  .catch(err => console.log(err));

// Routes
app.use("/api", api);
app.get("*", async (req, res) => {
  res.redirect("/");
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`server up and running on port ${port} !`));
