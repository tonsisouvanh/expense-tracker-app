import { useDispatch } from "react-redux";
import { fetchExpenseById } from "../../features/ExpenseSlice";
import { useEffect } from "react";

const useExpenseDetail = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchExpenseById(id));
  }, [dispatch, id]);
};

export default useExpenseDetail;
