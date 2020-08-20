const express = require("express");
const bodyParser = require("body-parser");
const WordRepository = require("./word-repo.js");


const port = process.env.PORT || 3000;
const wordRepository = new WordRepository("content/words1.json");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/api/word", async(req, res) => {
    let result = await wordRepository.findWord(req.query.w);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result), "utf8");
});

app.post("/api/word", async(req, res) => {
    await wordRepository.addWord(req.body);

    res.writeHead(200);
    res.end("word added", "utf8");
});

app.listen(port, () => console.log(`app listening on port ${port}!`));