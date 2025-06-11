import AgeDistributionChart from "../components/AgeDistributionChart";

function Dashboard() {
  return (
    <div className="flex flex-col items-center gap-6 overflow-y-scroll">
      <h1 className="mt-30">Dashboard (using chartsJs)</h1>
      <div>
        <AgeDistributionChart />
      </div>
    </div>
  );
}

export default Dashboard;
