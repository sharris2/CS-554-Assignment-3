const express = require('express');
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

bookList.push(makeBook("Stubbed my toe", "STORY OF MY LIFE!!", ""));
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


router.post("/", (req, res) => {
});

// Capture any other uncoded routes and 404 them
router.use("*", (req, res) => {
    res.sendStatus(404);
});

module.exports = router;