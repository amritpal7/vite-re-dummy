import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { User } from "../types/user";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserActivityChart = () => {
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();
      const users: User[] = data.users;

      // Simulate isActive status
      const activeUsers = users.filter(user => parseInt(user.id) % 2 === 0);
      const inactiveUsers = users.length - activeUsers.length;

      setActiveCount(activeUsers.length);
      setInactiveCount(inactiveUsers);
    };

    fetchUsers();
  }, []);

  const data = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        label: "# of Users",
        data: [activeCount, inactiveCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-96 mx-auto my-10">
      <h2 className="text-xl font-semibold text-center mb-4">
        User Activity (Just a Simulation)
      </h2>
      <Pie data={data} />
    </div>
  );
};

export default UserActivityChart;
