

function addition() {
    let x = document.getElementById("fvalue").value;
    let y = document.getElementById("svalue").value;
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
    const fields = document.querySelectorAll('.clearable-field');
    fields.forEach(field => {
        field.value = '';
    });
}