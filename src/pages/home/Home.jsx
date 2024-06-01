import TransactionList from "./TransactionList";

const Home = () => {
  return (
    <>
      <div className="w-full px-2 py-4">
        <div className="text-sm space-y-8">
          <TransactionList />
        </div>
      </div>
    </>
  );
};

export default Home;
