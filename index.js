import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;
const blogPosts = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { blogPosts: blogPosts });
});

app.post("/submit", (req, res) => {
    var authorName= req.body["authorName"];
    var blogTitle= req.body["blogTitle"];
    var content= req.body["content"];
    var creationTime = Date();

    const newPost = {
        authorName: authorName,
        blogTitle: blogTitle,
        content: content,
        creationTime: creationTime
    };

    blogPosts.push(newPost);

    res.redirect('/');
});

app.post("/delete", (req, res) => {
    const listIndex = req.body.index;
    blogPosts.splice(listIndex, 1);

    res.redirect('/');
});

app.post("/edit", (req, res) => {
    const listIndex = req.body.index;
    res.render("edit.ejs", {blogPost: blogPosts[listIndex], listIndex: listIndex});
    
});

app.post("/update", (req, res) => {
    const listIndex = req.body.id;
    blogPosts[listIndex].authorName = req.body["authorName"];
    blogPosts[listIndex].blogTitle = req.body["blogTitle"];
    blogPosts[listIndex].content = req.body["content"];
    res.redirect('/');    
});


app.listen(port,() => {
    console.log(`Server running on port ${port}.`);
});