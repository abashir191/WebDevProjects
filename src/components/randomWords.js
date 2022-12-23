var animals = [
    "cat",
    "bird",
    "lion",
    "tiger",
    "dog",
    "elephant",
    "giraffe",
    "jaguar",
    "monkey"
]
function randomWord(){
    return animals[Math.floor(Math.random()* animals.length)]
}
export {
    randomWord
}
