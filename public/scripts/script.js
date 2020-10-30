const update = document.getElementById('update')
const del = document.getElementById('delete')
const delDisplay = document.getElementById("displayDelWords")
const delInput = document.getElementById("deleteWords")

const inp1 = document.getElementById("update1")
const inp2 = document.getElementById("update2")



update.addEventListener('click', function() {

    fetch('/words', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input1: inp1.value,
                input2: inp2.value
            })
        })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            window.location.reload(true)
        })

})

del.addEventListener('click', function() {
    fetch('/words', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input1: delInput.value
            })
        })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            if (response === 'No word to delete') {
                delDisplay.textContent = 'Word not found or already deleted'

            } else {
                window.location.reload(true)
                    // delDisplay.textContent = "check Your Input"
            }
        })
        .catch(console.error)
})