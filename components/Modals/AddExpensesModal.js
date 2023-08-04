import Modal from "@/components/Modal";
import { useContext, useState, useRef } from "react";
import { financeContext } from "@/lib/store/finance-context";
import ExpenseCategoryItem from "../ExpenseCategoryItem";

import {toast} from "react-toastify"

import { v4 as uuidv4 } from 'uuid';


function AddExpensesModal({ show, onClose }) {
    const [expenseAmount, setExpensesAmount] = useState("");
    const [selectCategory, setSelectCategory] = useState(null);
    const [showAddExpense, setShowAddExpense] = useState(false);

    const { expenses, addExpenseItem, addCategory } = useContext(financeContext);


    const titleRef = useRef();
    const colorRef = useRef();

    const expense = expenses.find(e => {
        return e.id === selectCategory;
    })

    const addExpenseItemHandle = async () => {
        const newExpense = {
            color: expense.color,
            title: expense.title,
            total: expense.total + +expenseAmount,
            items: [
              ...expense.items,
              {
                amount: +expenseAmount,
                createdAt: new Date(),
                id: uuidv4(),
              },
            ],
          };
          try{
            await addExpenseItem(selectCategory, newExpense);
            setExpensesAmount("");
            setSelectCategory([]);
            onClose();
            toast.success("Thêm chi tiêu thành công.")
          }catch(err){
            console.log(err);
            toast.error(err.message);
          }


    }


    const addCategoryHandler = async () => {
        const title = titleRef.current.value;
        const color = colorRef.current.value;

        try{
            await addCategory({title, color, total: 0});
            setShowAddExpense(false);
            toast.success("Thêm loại chi tiêu thành công.")
        }catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    return (
        <Modal show={show} onClose={onClose}>

            <div className="flex flex-col gap-4">

                <label>Nhập số tiền chi tiêu</label>
                <input type="number" min={0.01} step={0.01} value={expenseAmount} onChange={(e) => setExpensesAmount(e.target.value)} placeholder="Nhập số tiền chi tiêu" />
            </div>

            {expenseAmount > 0 && (
                <div className="flex flex-col gap-4 mt-6">
                    <div className="flex justify-between ">
                        <h3 className="text-xl capitalize">Chọn loại chi tiêu</h3>
                        <button onClick={() => {setShowAddExpense(true)}} className="text-emerald-700 font-bold">+ Thêm loại chi tiêu</button>
                    </div>

                    {showAddExpense && (
                        <div className="flex justify-between items-center flex-wrap gap-4">
                            <input type="text" placeholder="Tên loại chi tiêu..." ref={titleRef} />

                            <div className="flex items-center gap-2">
                                <label>Màu</label>
                                <input type="color" className="w-24 h-10" ref={colorRef} />
                            </div>

                            <button onClick={addCategoryHandler} className="btn btn-primary-outline">Tạo</button>
                            <button onClick={() => {setShowAddExpense(false)}} className="btn btn-danger">Hủy</button>
                        </div>
                    )}

                    {expenses.map((expense) => {
                        return (
                            <button
                                key={expense.id}
                                onClick={() => {
                                    setSelectCategory(expense.id);
                                }}
                            >
                                <div
                                    style={{
                                        boxShadow:
                                            expense.id === selectCategory ? "1px 1px 4px" : "none",
                                    }}
                                    className="flex items-center justify-between px-4 py-4 bg-white rounded-3xl"
                                >
                                    <div className="flex items-center gap-2">
                                        {/* Colored circle */}
                                        <div
                                            className="w-[25px] h-[25px] rounded-full"
                                            style={{
                                                backgroundColor: expense.color,
                                            }}
                                        />
                                        <h4 className="capitalize">{expense.title}</h4>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {expenseAmount > 0 && selectCategory && (
                <div className="mt-6">
                    <button className="btn btn-primary" onClick={addExpenseItemHandle}>
                        Thêm chi tiêu
                    </button>
                </div>
            )}

        </Modal>
    )
}

export default AddExpensesModal;