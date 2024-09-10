import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;
const blogPosts = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", (req, res) => {
    var authorName= req.body["authorName"];
    var blogTitle= req.body["blogTitle"];
    var content= req.body["content"];
    var creationTime = Date().toLocaleString();

    const newPost = {
        authorName: authorName,
        blogTitle: blogTitle,
        content: content,
        creationTime: creationTime
    };

    blogPosts.push(newPost);

    res.render("index.ejs", {blogPosts: blogPosts})
});

app.delete("/", (req, res) => {

});

app.patch("/", (req, res) => {

});

app.listen(port,() => {
    console.log(`Server running on port ${port}.`);
});