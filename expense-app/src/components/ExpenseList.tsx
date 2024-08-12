import { useEffect } from 'react';
import axios from 'axios';
import { TExpense } from '../App';
import { BASE_URL } from '../constant';

interface ExpenseProps {
  expenses: TExpense[];
  setExpenseArray: React.Dispatch<React.SetStateAction<TExpense[]>>;
  category: string;
}

const ExpenseList = ({ expenses, setExpenseArray, category }: ExpenseProps) => {

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/Expense`);
        setExpenseArray(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, [setExpenseArray]);

  const onDelete = async (expenseId: number) => {
    try {
      await axios.delete(`${BASE_URL}/api/Expense/${expenseId}`);
      setExpenseArray(expenses.filter(expense => expense.Id !== expenseId));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

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
            category === "All"
              ? expenses.map((expense, idx) => (
                <tr key={idx}>
                  <td>{expense.description}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.category}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => onDelete(expense.Id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
              : expenses.filter(expense => expense.category === category).map((expense, idx) => (
                <tr key={idx}>
                  <td>{expense.description}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.category}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => onDelete(expense.Id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
          }
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
