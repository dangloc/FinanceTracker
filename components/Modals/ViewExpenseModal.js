import Modal from "@/components/Modal"
import {FaRegTrashAlt} from 'react-icons/fa'
import { useContext } from "react"
import { financeContext } from "@/lib/store/finance-context"
import {toast} from "react-toastify"

import { currentFormatter } from "@/lib/utils"

function ViewExpenseModal({ show, onClose, expense }) {
    
    const { deleteExpenseItem , deleteExpenseCategory} = useContext(financeContext);

    const deleteExpenseHandler = async () => {
        try {
          await deleteExpenseCategory(expense.id);
          toast.warning("Xóa loại chi tiêu thành công.")
        } catch (error) {
          console.log(error.message);
          toast.error("Xóa chi tiêu lỗi.")
        }
      };

    const DeleteExpenseHandeler =  async (item)=> {

        try{
            const updateItem =  expense.items.filter((e)=> e.id !== item.id);
            const updatedExpense = {
                items: [...updateItem],
                total: expense.total - item.amount,
            }
            await deleteExpenseItem(updatedExpense, expense.id);
            toast.warning("Xóa chi tiêu thành công.")
        }catch(err){
            console.log(err.message);
            toast.error("Xóa chi tiêu lỗi.")
        }
    }

    return (
        <Modal show={show} onClose={onClose}>
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold uppercase drop-shadow-xl" style={{color: expense.color}}>{expense.title}</h2>
                <button onClick={deleteExpenseHandler} className="btn btn-danger">Delete</button>
            </div>

            <div>
                <h3 className="my-4 text-xl">Lịch sử chi tiêu</h3>
                {expense.items.map((item) => {
                    return (
                        <div className="flex items-center justify-between mb-2" key={item.id}>
                            <small>
                                {item.createdAt.toMillis
                                    ? new Date(item.createdAt.toMillis()).toISOString().split("T")[0]
                                    : item.createdAt.toISOString().split("T")[0]}
                            </small>

                            <p className="flex items-center gap-4">{currentFormatter(item.amount)} 
                                <button onClick={() => {DeleteExpenseHandeler(item)}}><FaRegTrashAlt/></button>
                            </p>
                            
                        </div>
                    )
                })}
            </div>
        </Modal>
    )
}

export default ViewExpenseModal