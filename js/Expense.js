class Expense extends Data{
    static expenseCounter = 0; 

    constructor(description, value){
        super(description, value);
        this._id = ++Expense.expenseCounter;
    }

    get id(){
        return this._id;
    }
}