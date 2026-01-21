function displayText(){
    var inputValue = document.getElementById("task").value;

    let toDo = [];

    toDo.push(inputValue);

    document.getElementById("outputText").innerHTML = toDo;
}