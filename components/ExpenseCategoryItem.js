import { useState } from "react";

import { currentFormatter } from "@/lib/utils";

import ViewExpenseModal from "./Modals/ViewExpenseModal";

function ExpenseCategoryItem({ expense }) {
  const [showViewExpense, setViewExpenseModal] = useState(false);
  return (
    <>
    <ViewExpenseModal show={showViewExpense} onClose={setViewExpenseModal} expense={expense}/>    
    <button onClick={() => setViewExpenseModal(true)}>
      <div className="flex items-center justify-between px-4 py-4 bg-white rounded-full">
        <div className="flex items-center gap-2">
          <div
            className="w-[25px] h-[25px] rounded-full"
            style={{ backgroundColor: expense.color }}
          ></div>
          <h4 className="capitalize">{expense.title}</h4>
        </div>
        <p>{currentFormatter(expense.total)}</p>
      </div>
    </button>
    </>
  );
}

export default ExpenseCategoryItem;
