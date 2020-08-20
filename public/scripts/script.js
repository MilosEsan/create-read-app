let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");
let displayWords = document.getElementById("displayWords");

document.getElementById("addWords").addEventListener("click", addWords);
document.getElementById("search").addEventListener("click", translate);

function addWords() {
    let words = {
        word1: input1.value,
        word2: input2.value
    };

    fetch("api/word", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(words)
        })
        .then(r => r.text())
        .then(t => alert(t));
}

function translate() {
    let searchWords = document.getElementById("searchWords");

    fetch("api/word?w=" + searchWords.value)
        .then(r => r.json())
        .then(w => {
            if (searchWords.value !== w.word1 &&
                searchWords.value !== w.word2) {
                throw new Error("Word is not saved!")
            } else {
                (displayWords.innerHTML = w.word1 + " = " + w.word2)
            };
        }).catch(err => alert("Word is not saved, or it's not spelled correctly. Please, check your input and turn the 'CAPS LOCK' OFF!"));

    if (searchWords.value === '') {
        alert("Warning, input required!")
        displayWords.innerHTML = "search-words missing!";

    }

}