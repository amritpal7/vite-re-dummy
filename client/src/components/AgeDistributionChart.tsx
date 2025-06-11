// components/AgeDistributionChart.tsx
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AgeDistributionChart = () => {
  const [ageGroups, setAgeGroups] = useState<number[]>([0, 0, 0, 0, 0]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();
      const users = data.users;

      const groupCounts = [0, 0, 0, 0, 0]; // <20, 20s, 30s, 40s, 50+

      users.forEach((user: any) => {
        const age = user.age;
        if (age < 20) groupCounts[0]++;
        else if (age < 30) groupCounts[1]++;
        else if (age < 40) groupCounts[2]++;
        else if (age < 50) groupCounts[3]++;
        else groupCounts[4]++;
      });

      setAgeGroups(groupCounts);
    };

    fetchData();
  }, []);

  const data = {
    labels: ["<20", "20–29", "30–39", "40–49", "50+"],
    datasets: [
      {
        label: "User Count",
        data: ageGroups,
        backgroundColor: "#4F46E5",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="w-full max-w-xl mx-auto my-8 bg-white p-6 rounded shadow">
      <h2 className="text-center text-xl font-semibold mb-4">
        Age Distribution
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default AgeDistributionChart;
