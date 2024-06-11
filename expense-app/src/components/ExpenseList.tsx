import { TExpense } from "../App";



interface ExpenseProps {
  expenses: TExpense[];
  setExpenseArray: React.Dispatch<React.SetStateAction<TExpense[]>>
  category: string
}


const ExpenseList = ({ expenses,setExpenseArray,category}: ExpenseProps) => {



  const onDelete = (expenseItemIndex:number) => {
    const tempArray:TExpense[] = [...expenses];
    tempArray.splice(expenseItemIndex,1)
    setExpenseArray(tempArray);
  }

  
  return (
    <>
      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
          category === "All" ? expenses.map((expense,idx) => (
            <tr key={idx}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDelete(idx)}
                >
                  Delete
                </button>
              </td>
            </tr>
          )) :
          expenses.filter(expense => expense.category == category).map((expense,idx) => (
            <tr key={idx}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDelete(idx)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>
              {expenses
                .reduce((acc, expense) => expense.amount + acc, 0)
                .toFixed(2)}
            </td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default ExpenseList;
