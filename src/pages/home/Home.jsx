import TransactionList from "./TransactionList";

const Home = () => {
  return (
    <>
      <div className="w-full px-2 py-4">
        <div className="space-y-8 text-sm">
          <TransactionList />
        </div>
      </div>
    </>
  );
};

export default Home;
