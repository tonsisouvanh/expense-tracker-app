import { useDispatch } from "react-redux";
import { fetchIncomeById } from "../../features/IncomeSlice";
import { useEffect } from "react";

const useIncomeDetail = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIncomeById(id));
  }, [dispatch, id]);
};

export default useIncomeDetail;
