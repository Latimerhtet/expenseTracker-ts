import React from "react";
import ExpensesForm from "../../components/AccountHomePage/ExpensesForm";
import WalletForm from "../../components/AccountHomePage/WalletForm";

const RightBar = () => {
  return (
    <section className="w-full flex gap-2">
      <div className="basis-1/2 p-8">
        <ExpensesForm />
      </div>
      <div className="basis-1/2 p-8">
        <WalletForm />
      </div>
    </section>
  );
};

export default RightBar;
