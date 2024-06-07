import Transaction from "./Transaction";
// TODO: Render all transactions in a list
const TransactionList = () => {
  return (
    <>
      <div>
        <p className="mb-2">May 13, 2024</p>
        <div className="space-y-4">
          {Array.from({ length: 4 }, (__, index) => (
            <div key={index} className="">
              <Transaction />
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2">May 13, 2024</p>
        <div className="space-y-4">
          {Array.from({ length: 3 }, (__, index) => (
            <div key={index} className="">
              <Transaction />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TransactionList;
