import { useRef,useEffect, useContext } from "react";
import { currentFormatter } from "@/lib/utils";
import { FaRegTrashAlt } from "react-icons/fa";

import { authContext } from "@/lib/store/auth-context";

import { financeContext } from "@/lib/store/finance-context"
import {toast} from "react-toastify"

import Modal from "@/components/Modal";



function AddIncomeModal({ show, onClose }) {
    const amountRef = useRef();
    const descriptionRef = useRef();
    const { income, addIncomeItem, removeIncomeItem } = useContext(financeContext);

    const { user } = useContext(authContext);

    const addIncomeHandler = async (e) => {
        e.preventDefault();
        const newIncome = {
            amount: +amountRef.current.value,
            description: descriptionRef.current.value,
            createAt: new Date(),
            uid: user.uid
        };

        try {
            await addIncomeItem(newIncome);
            descriptionRef.current.value = "";
            amountRef.current.value = "";
            toast.success("Thêm thu nhập thành công.")
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    const deleteIncomeEntryHandler = async (incomeId) => {
        try {
            await removeIncomeItem(incomeId);
            toast.warning(`Xóa thành công`);
        } catch (err) {
            console.log(err);
            toast.error(err.message)
        }
    };
    
    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={addIncomeHandler} className="input-group">
                <div className="input-group">
                    <label htmlFor="amount">Thu nhập</label>

                    <input
                        name="amount"
                        ref={amountRef}
                        type="number"
                        min={0.01}
                        step={0.01}
                        placeholder="Nhập số tiền..."
                        autoComplete="off"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="amount">Mô tả</label>

                    <input
                        name="description"
                        ref={descriptionRef}
                        type="text"
                        min={0.01}
                        step={0.01}
                        placeholder="Nhập mô tả..."
                        autoComplete="off"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Thêm thu nhập
                </button>
            </form>

            <div className="flex flex-col gap-4 mt-6">
                <h3 className="text-2xl">Lịch sử thu nhập</h3>
                <div className="">
                    {income.map((i) => {
                        return (
                            <div className="flex justify-between item-center" key={i.id}>
                                <div>
                                    <p className="font-semibold">{i.description}</p>
                                    <small className="text-xs">{i.createAt.toISOString().split("T")[0]}</small>
                                </div>
                                <p className="flex items-center gap-2">
                                    {currentFormatter(i.amount)}
                                    <button
                                        onClick={() => {
                                            deleteIncomeEntryHandler(i.id);
                                        }}
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </Modal>
    )
}

export default AddIncomeModal