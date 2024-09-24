
let listNameExpense = [];
let listAmoutExpense = [];
let listDescriptions = [];
let modal = document.getElementById("myModal");

function clickBoton(){
    let nameExpense = document.getElementById('nombreGasto').value;
    let amountExpense = document.getElementById('valorGasto').value;
    let description = document.getElementById('descripcionGasto').value;

    if(nameExpense == "" || amountExpense == ""){
        messageExpenses("Por favor complete los campos (Nombre y Valor)")
        return
    }

    listNameExpense.push(nameExpense);
    listAmoutExpense.push(amountExpense);
    listDescriptions.push(description);

    updateExpenseList();
}

function updateExpenseList(){
    const listElement = document.getElementById("listaDeGastos");
    const totalElement = document.getElementById("totalGastos");
    let deleteAll = document.getElementById("deleteAll");

    let htmlList = '';
    let totalExpenses = 0;

    listNameExpense.forEach((element,position) => {
        const expenditureValue = Number(listAmoutExpense[position]);
        const description = listDescriptions[position];
        
        htmlList += `<li>${element} / ${description} / USD ${expenditureValue.toFixed(2)} 
            <button id="update" onclick="viewExpenses(${position});">Editar</button>
            <button id="delete" onclick="deleteExpenses(${position});">Eliminar</button>
        </li>`;
        
        totalExpenses += Number(expenditureValue);
    });    

    if(listNameExpense.length > 0){
        deleteAll.style.display = 'block';   
    }
    else{
        deleteAll.style.display = 'none'
    }
    
    listElement.innerHTML = htmlList;
    totalElement.innerHTML = totalExpenses.toFixed(2);

    if(totalExpenses >= 150)
    {
        messageExpenses("Has alcanzado un gasto superior a US$ 150");
    }    
    else{
        messageExpenses("");
    }

    clean();
}
// Limpiar campos
function clean(){
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcionGasto').value = '';
}

function deleteAll(){
    listNameExpense.splice(0);
    listAmoutExpense.splice(0);
    listDescriptions.splice(0);
    updateExpenseList();
}

// Eliminar gasto
function deleteExpenses(position){
    listNameExpense.splice(position, 1);
    listAmoutExpense.splice(position, 1);
    listDescriptions.splice(position, 1);
    updateExpenseList();
}
//Editar Gastos
function updateExpenses(index) {
    let nameExpense = document.getElementById('nombreGasto2').value;
    let amountExpense = document.getElementById('valorGasto2').value;
    let description = document.getElementById('descripcionGasto2').value;

    listNameExpense[index] = nameExpense;
    listAmoutExpense[index] = amountExpense;
    listDescriptions[index] = description;     

    updateExpenseList();
    closemodal();
}
//Ver gastos
function viewExpenses(index) {
    modal.style.display = "block";
    let div = document.getElementById('divUpdate');

    document.getElementById('nombreGasto2').value = listNameExpense[index];
    document.getElementById('valorGasto2').value = Number(listAmoutExpense[index]);
    document.getElementById('descripcionGasto2').value = listDescriptions[index];

    div.innerHTML = `<button id="botonFormulario" onclick="updateExpenses(${index});">Actualizar</button>`;    
}
// Cerrar modal
function closemodal() {
    modal.style.display = "none";
}
// Mensaje de gasto superior
function messageExpenses(message){
    let higherExpenses = document.getElementById("gastosTotales");
    higherExpenses.innerHTML = message;
}
