

function addition() {
    let x = document.getElementById("fvalue").value; // Assigns the value found in the input field with the id fvalue into x
    let y = document.getElementById("svalue").value; // Assigns the value found in the input field with the id fvalue into y
    alert(Number(x) + Number(y));
}

function subtraction(){
    let x = document.getElementById("fvalue").value;
    let y = document.getElementById("svalue").value;
    alert(Number(x) - Number(y));
}

function multiplication(){
    let x = document.getElementById("fvalue").value;
    let y = document.getElementById("svalue").value;
    alert(Number(x) * Number(y));
}

function division(){
    let x = document.getElementById("fvalue").value;
    let y = document.getElementById("svalue").value;
    alert(Number(x) / Number(y));
}

function clearFields(){
    const fields = document.querySelectorAll('.clearable-field'); // Looks through the entire html and returns every element with the class clearable-field
    fields.forEach(field => { // Goes through the collection one item at a time and for each element found it temporary calls them field
        field.value = ''; // Accesses the elements value and replaces whatever text/data was inside with an empty string
    });
}