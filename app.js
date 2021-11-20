const express = require("express");
const data = require("./data.json")

const app = express();

app.use(express.json())

const logger = (req, res, next)=>{
    req.name = "Vivek Kumar"

  next();
}

app.use(logger)
app.get("/", (req, res) => {
    var api_requested_by = req.name
    var j = {
        api_requested_by,
        data
    }
    
    res.send( j)
})
app.get("/books/:id", (req, res) => {
    let api_requested_by = req.name

    const newUsers = data.filter((user) => user.id == req.params.id);
    let j = {
        api_requested_by,
        newUsers
    }

    res.send(j)
})
app.patch("/books/:id", (req, res) => {
    const newUsers = data.map((user)=>{
        if (req.params.id === user.id) {
            if (req?.body?.id) user.id = req.body.id;
            if (req?.body?.author) user.author = req.body.author;
            if (req?.body?.book_name) user.book_name = req.body.book_name;
            if (req?.body?.pages) user.pages = req.body.pages;
            if (req?.body?.published_year) user.published_year = req.body.published_year;
        }
        return user;
    })
    res.send(newUsers)
})

app.post("/books", (req, res) =>{
    const newUsers = [...data, req.body];
    res.send(newUsers)
});

// /books/: id ' 

app.delete("/books/:id", (req, res) => {
    let book = data.filter(b => {
        return b.id !== req.params.id;
    });
    res.send(book)
})

app.listen(2345, function(){
    console.log("server is running on port 2345")
})