const incomes = [
    new Income("Salary", 2100.00),
    new Income("Car Sale", 1500.00),
    new Income("Work", 30000.00)
]; 

const expenses = [
    new Expense("Supermarket", 780.00), 
    new Expense("Vet", 900.00),
    new Expense("iPhone", 833.00)
]; 


/*almacena lo que tiene que realizar al cargarse el sitio web*/
let loadApp = () => {
    loadHeader(); //Cada que se cargue la página web se actualizara automaticamente el cabecero con  las operaciones necesarias
    loadIncome(); //Cada que se cargue la pagina web se llamara de forma dinamica los ingresos
    loadExpense(); //Cada que se cargue la pagina web se llamara de forma dinamica los egresos
}


let totalIncomes = () => { //Calcula el total de ingresos
    let totalIncome = 0; 
    for (let income of incomes){
        totalIncome += income.value; 
    }
    return totalIncome;
}

let totalExpenses = () => { //Calcula el total de egresos
    let totalExpense = 0; 
    for(let expense of expenses){
        totalExpense += expense.value; 
    }   
    return totalExpense;
}

let loadHeader = () => {
    let budget = totalIncomes() - totalExpenses(); 
    let percentageExpenses = totalExpenses() / totalIncomes(); 

    //Header
    document.getElementById('budget').innerHTML = currencyFormat(budget);
    document.getElementById('percentage').innerHTML = percentageFormat(percentageExpenses);
    document.getElementById('incomes').innerHTML = currencyFormat(totalIncomes()); 
    document.getElementById('expenses').innerHTML = currencyFormat(totalExpenses()); 
}


//toLocaleString permite la internalizacion, en este caso especifica el uso de monedas
const currencyFormat = (value) => {
    return value.toLocaleString('en-US', {style:'currency', currency: 'USD', minimumFractionDigits:2});
}

//toLocaleString permite la internalizacion, en este caso especifica el uso de porcentaje 
const percentageFormat = (value) =>{
    return value.toLocaleString('en-US', {style: 'percent', minimumFractionDigits:2});
}    

//Itera cada ingreso de nuestra lista y lo recupera, monstrandolo
const loadIncome = () => {
    let incomeHTML = ''; 
    for(let income of incomes){
        incomeHTML += createIncomeHTML(income); 
    }
    document.getElementById('list_incomes').innerHTML = incomeHTML;
}

const createIncomeHTML = (income) => {
    /*Se agrega la parte onlick... al elemento HTML que recibe una funcion, la cual recibira asimismo como
    parametro el id del elemento que se esta tratando de eliminar mediante el icono y de esta manera eliminarlo*/
    let incomeHTML = `
        <div class="element clear_style">
            <div class="element_description">${income.description}</div>
            <div class="right clear_style">
                <div class="element_value">${currencyFormat(income.value)}</div>
                <div class="delete_element">
                    <button class="delete_element--btn">
                        <ion-icon name="close-circle-outline" onclick="deleteIncome(${income.id})"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `;
    return incomeHTML; 
}

const deleteIncome = (id) => {
    let deleteIndex = incomes.findIndex(income=>income.id === id); 
    incomes.splice(deleteIndex, 1);
    loadHeader();
    loadIncome();
}

const loadExpense = () => {
    let expenseHTML =''; 
    for(let expense of expenses){
        expenseHTML += createExpenseHTML(expense); 
    }
    document.getElementById('list_expenses').innerHTML = expenseHTML;
}

const createExpenseHTML = (expense) => {
    let expenseHTML =`
        <div class="element clear_style">
            <div class="element_description">${expense.description}</div>
            <div class="right clear_style">
                <div class="element_value">${currencyFormat(expense.value)}</div>
                <div class="element_percentage">${percentageFormat(expense.value/totalExpenses())}</div>
                <div class="delete_element">
                    <button class="delete_element--btn">
                        <ion-icon name="close-circle-outline" onclick="deleteExpense(${expense.id})"><</ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `;
    return expenseHTML; 
}

let deleteExpense = (id) => {
    let deleteIndex = expenses.findIndex(expense => expense.id === id);
    expenses.splice(deleteIndex, 1);
    loadHeader();
    loadExpense();
}

let addData = () => {
    let form = document.forms['form']
    let type = form['type']; 
    let description = form['description'];
    let value = form['value'];
    if(description.value != '' && value.value != ''){
        if(type.value === 'income'){
            incomes.push(new Income(description.value, +value.value));
            /*Si se esta trabajando con tipo numerico se puede hacer la conversion por medio de Number() o agregando un + 
            al valor que se le esta indicando que es numerico*/
            form.reset(); //Limpia el formulario
            loadHeader(); 
            loadIncome(); 
            
        } else if(type.value === 'expense'){
            expenses.push(new Expense(description.value, +value.value));
            form.reset();
            loadHeader(); 
            loadExpense(); 
        }
    }
}
