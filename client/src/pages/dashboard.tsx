import ProductPriceChart from "../components/ProductPriceChart";

function Dashboard() {
  return (
    <div className="flex flex-col items-center gap-6 overflow-y-scroll">
      <h1 className="mt-30">Dashboard (using React-charts)</h1>
      <div>
        <ProductPriceChart />
      </div>
    </div>
  );
}

export default Dashboard;
