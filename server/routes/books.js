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
bookList.push(makeBook("test20", "STORY OF MY LIFE!!", "../public/images/stubbed-toe.jpg"));
bookList.push(makeBook("test19", "STORY OF MY LIFE!!", ""));
bookList.push(makeBook("test18", "STORY OF MY LIFE!!", ""));
bookList.push(makeBook("test17", "STORY OF MY LIFE!!", ""));
bookList.push(makeBook("test16", "STORY OF MY LIFE!!!", ""));
bookList.push(makeBook("test15", "STORY OF MY LIFE!!", "../public/images/stubbed-toe.jpg"));
bookList.push(makeBook("test14", "STORY OF MY LIFE!!", ""));
bookList.push(makeBook("test13", "STORY OF MY LIFE!!", ""));
bookList.push(makeBook("test12", "STORY OF MY LIFE!!", ""));
bookList.push(makeBook("test11", "STORY OF MY LIFE!!!", ""));
bookList.push(makeBook("test10", "STORY OF MY LIFE!!", "../public/images/stubbed-toe.jpg"));
bookList.push(makeBook("test9", "STORY OF MY LIFE!!", ""));
bookList.push(makeBook("test8", "STORY OF MY LIFE!!", ""));
bookList.push(makeBook("test7", "STORY OF MY LIFE!!", ""));
bookList.push(makeBook("test6", "STORY OF MY LIFE!!!", ""));
bookList.push(makeBook("test5", "STORY OF MY LIFE!!", "../public/images/stubbed-toe.jpg"));
bookList.push(makeBook("test4", "STORY OF MY LIFE!!", ""));
bookList.push(makeBook("test3", "STORY OF MY LIFE!!", ""));
bookList.push(makeBook("test2", "STORY OF MY LIFE!!", ""));
bookList.push(makeBook("test1", "STORY OF MY LIFE!!!", ""));

router.get("/", (req, res) => {
    res.json(bookList);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let pagelist = [];
    num = 20 + (id * 20);
    end_num = 20 * id;

    if(bookList.length < 20) {
        res.json(bookList);
    }
    else if((num - bookList.length) > 20) {
        res.json(pagelist);
    }
    else {
        beg_num = bookList.length - num;
        if(beg_num < 0) {
            beg_num = 0;
        }

        pagelist = bookList.slice(beg_num, bookList.length - end_num);
        res.json(pagelist);
    }

    //let book = bookList.filter(x => x.id === id)[0];
})

router.get("/detail/:id", (req, res) => {
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
    if(req.file !== undefined) {
        console.log("Pic: "+req.file.filename);
        bookList.push(makeBook(title, story, "../public/images/"+req.file.filename));
    }
    else {
        bookList.push(makeBook(title, story, ""));
    }
    res.redirect('/');
});



// Capture any other uncoded routes and 404 them
router.use("*", (req, res) => {
    res.sendStatus(404);
});

module.exports = router;