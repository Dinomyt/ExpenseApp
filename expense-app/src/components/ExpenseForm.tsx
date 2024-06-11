import categories from "../Categories";
import { TExpense } from "../App";
import { useState } from "react";


type ExpenseFormProp = {
  expenseArray: TExpense[],
  setExpenseArray: React.Dispatch<React.SetStateAction<TExpense[]>>
}


const ExpenseForm = ({
  expenseArray,
  setExpenseArray
}:ExpenseFormProp) => {

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

const AddExpenses = () => {
  const expense:TExpense = {
    description: description,
    amount: amount,
    category: category

  }
  const newArray:TExpense[] = [...expenseArray,expense]

  setExpenseArray(newArray);
}

  return (
    
      <form>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input onChange={(e) => setDescription(e.target.value)} id="description" type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input onChange={(e) => setAmount(Number(e.target.value))} id="amount" type="number" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select onChange={(e) => setCategory(e.target.value)} id="category" className="form-select" >
            <option value=""></option>
            {categories.map(category => <option key={category} value={category}>{category}</option>)}

          </select>
        </div>
        <button onClick={AddExpenses} type="button" className="btn btn-outline-primary">Submit</button>
      </form>
    
  );
};

export default ExpenseForm;
