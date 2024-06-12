import "./IncomeExpensesViewer.css";
import incomeicon from "../../../Assets/Owner_assests/income_icon.png";
import expenseicon from "../../../Assets/Owner_assests/expenses_icon.png";
import Divider from "@mui/material/Divider";
import { useEffect } from "react";
const IncomeExpensesViewer = (props) => {
  return (
    <div className="income-expenses-container">
      <div>Daily Income & Expenses</div>
      <div>
        <div className="icon-contianer-expenses-income">
          <div className=" d-flex">
            <img style={{ height: 60, width: 60 }} src={incomeicon} alt="" />
            <div className="d-flex flex-column">
              <div className="income-txt">Income</div>
              <div className="income-value">{props.data.income}</div>
            </div>
          </div>
          <Divider
            className="divider-class"
            orientation="vertical"
            variant="middle"
            color="black"
            sx={{ height: 50, width: "1px", marginLeft: 2, marginRight: 2 }}
            flexItem
          />
          <div className="items-income-expenses d-flex">
            <img style={{ height: 60, width: 60 }} src={expenseicon} alt="" />
            <div className="d-flex flex-column">
              <div className="income-txt">Expenses</div>
              <div className="income-value">{Math.abs(props.data.expense)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpensesViewer;
