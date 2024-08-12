import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseList from "./components/ExpenseList";
import categories from "./Categories";
import { BASE_URL } from "./constant";
import axios from "axios";

export type TExpense = {
  Id: number;
  description: string;
  amount: number;
  category: string;
};

const App = () => {
  const [expenseArray, setExpenseArray] = useState<TExpense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/expense`);// Update this URL if different
        setExpenseArray(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <>
      <h1 className="text-center">Expense Tracker</h1>
      <div className="container">
        <div className="mb-5">
          <ExpenseForm
            expenseArray={expenseArray}
            setExpenseArray={setExpenseArray}
          />
        </div>

        <div className="m-5">
          <ExpenseFilter
            onSelectCategory={(category) => setSelectedCategory(category)}
          />
        </div>
        <div className="m-5">
          <ExpenseList
            category={selectedCategory}
            setExpenseArray={setExpenseArray}
            expenses={expenseArray}
          />
        </div>
      </div>

    </>
  );
};

export default App;
