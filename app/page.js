"use client";
import { currentFormatter } from "@/lib/utils";

import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";
import { useState , useContext, useEffect} from "react";
import AddIncomeModal from "@/components/Modals/AddIncomModal"
import AddExpensesModal from "@/components/Modals/AddExpensesModal"
import { financeContext } from "@/lib/store/finance-context";

import { authContext } from "@/lib/store/auth-context";
import SingIn from "@/components/Modals/SignIn";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);


export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpensesModal, setShowAddExpensesModal] = useState(false);

  const [balance, setBalance] = useState(0);

  const { expenses, income } = useContext(financeContext);
  const { user } = useContext(authContext);

  useEffect(()=> {
    const newBalance = income.reduce((total, i)=> {
      return total + i.amount
    }, 0) - expenses.reduce((total, e)=>{
      return total + e.total
    }, 0)
    setBalance(newBalance)
  }, [expenses, income])
  
  if(!user){
    return <SingIn />
  }
  return (
    <>
      {/* modal */}
      <AddIncomeModal
        show={showAddIncomeModal}
        onClose={setShowAddIncomeModal}
      />

      <AddExpensesModal 
      show={showAddExpensesModal}
      onClose={setShowAddExpensesModal}
      />

      <main className="container px-6 max-w-2xl mx-auto">
        <section className="py-3">
          <small className=" text-md">Số dư hiện tại</small>
          <h2 className="text-4xl font-bold">{currentFormatter(balance)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            className="btn btn-primary"
            onClick={() => setShowAddExpensesModal(true)}
          >
            + Chi tiêu
          </button>
          <button
            className="btn btn-primary-outline"
            onClick={() => setShowAddIncomeModal(true)}
          >
            + Thu nhập
          </button>
        </section>

        <section className="py-6">
          <h3 className="text-2xl">Chi tiêu của tôi</h3>
          <div className="input-group mt-6">
            {/* expense items */}
            {expenses?.map((data) => (
              <ExpenseCategoryItem
                key={data.id}
                expense={data}
              />
            ))}
          </div>
        </section>

        {/* Biểu đồ */}

        <section className="py-6">
          <a id="stats"></a>
          <h3 className="text-2xl">Biểu đồ</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: expenses.map((data) => data.title),
                datasets: [
                  {
                    label: "Chi tiêu",
                    data: expenses.map((data) => data.total),
                    backgroundColor: expenses.map((data) => data.color),
                    borderWidth: 1,
                    borderColor: "#18181b",
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
