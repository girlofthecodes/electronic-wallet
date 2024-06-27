class Income extends Data{
    static incomeCounter = 0; 

    constructor(description, value){
        super(description, value);
        this._id = ++Income.incomeCounter;
    }

    get id(){
        return this._id;
    }
}