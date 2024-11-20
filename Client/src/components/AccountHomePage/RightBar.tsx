import React from "react";
import ExpensesForm from "./ExpensesForm";
import WalletForm from "./WalletForm";

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
