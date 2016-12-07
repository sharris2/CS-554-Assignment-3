const express = require('express');
var multer  =   require('multer');
const router = express.Router();
const bookList = [];

function makeBook(title, description, picture) {
    return {
        title: title,
        description: description,
        picture: picture,
        id: bookList.length
    };
}

bookList.push(makeBook("Stubbed my toe", "STORY OF MY LIFE!!", "../public/images/stubbed-toe.jpg"));
bookList.push(makeBook("Hit my head", "STORY OF MY LIFE!!", ""));
bookList.push(makeBook("Overlsept", "STORY OF MY LIFE!!", ""));
bookList.push(makeBook("Missed homework", "STORY OF MY LIFE!!", ""));
bookList.push(makeBook("Tripped", "STORY OF MY LIFE!!!", ""));

router.get("/", (req, res) => {
    res.json(bookList);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    let book = bookList.filter(x => x.id === id)[0];

    if (!book) {
        res.sendStatus(404);
    } else {
        res.json(book);
    }
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/public/images')
  },
  filename: function (req, file, cb) {
    var patt1=/\.[0-9a-z]+$/i;
    var ext = file.originalname.match(patt1);
    cb(null, file.fieldname + '-' + Date.now()+ext)
  }
})
 
var upload = multer({ storage: storage })

router.post("/new", upload.single('userPhoto'), function (req, res, next) {
  // req.file is the `userPhoto` file 
  // req.body will hold the text fields, if there were any 
    title = req.body.title;
    story = req.body.story;

    console.log("Title: "+title);
    console.log("Story: "+story);
    console.log("Pic: "+req.file.filename);
    bookList.push(makeBook(title, story, "../public/images/"+req.file.filename));
    res.redirect('/');
});



// Capture any other uncoded routes and 404 them
router.use("*", (req, res) => {
    res.sendStatus(404);
});

module.exports = router;