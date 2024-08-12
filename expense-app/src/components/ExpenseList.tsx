import { useEffect, useState } from 'react';
import axios, { CanceledError } from 'axios';
import { BASE_URL } from '../constant';
import { Expense } from '../App';

interface ExpenseProps {
  expenses: Expense[];
  setExpenseArray: React.Dispatch<React.SetStateAction<Expense[]>>;
  category: string;
}

const ExpenseList = ({ expenses, setExpenseArray, category }: ExpenseProps) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expense, setExpense] = useState({
    id: 0,
    description: '',
    amount: '',
    category: ''
  })

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/api/Expense`)
      .then((response) => {
        setExpenseArray(response.data); // Update the main state directly
      })
      .catch((error) => {
        if (error instanceof CanceledError) {
          return;
        }
        setError(error.message);
        console.log("error debug: " + error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = (id: number) => {
    console.log("current id: " + id);
    axios
      .delete(`${BASE_URL}/api/Expense/${id}`)
      .then(() => {
        setExpenseArray(expenses.filter((expense) => expense.id !== id)); // Update the main state directly
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onEdit = (id: number) => {
    axios.put(`${BASE_URL}/api/Expense/${id}`, expenses)
    .then(() => {
      fetchData();

    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
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
          {category === "All"
            ? expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.description}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.category}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => onDelete(expense.id)}
                    >
                      Delete
                    </button>
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => onEdit(expense.id)}
                      >
                        Edit
                      </button>
                  </td>
                </tr>
              ))
            : expenses
                .filter((expense) => expense.category === category)
                .map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.description}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.category}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => onDelete(expense.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => onEdit(expense.id)}
                      >
                        Edit
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
