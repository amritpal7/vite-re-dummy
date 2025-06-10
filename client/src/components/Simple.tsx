import { Chart } from "react-charts";
import { useMemo } from "react";

function SimpleChart() {
  const data = useMemo(
    () => [
      {
        label: "Visitors",
        data: [
          { date: new Date(2023, 0, 1), value: 150 },
          { date: new Date(2023, 1, 1), value: 220 },
          { date: new Date(2023, 2, 1), value: 300 },
          { date: new Date(2023, 3, 1), value: 180 },
          { date: new Date(2023, 4, 1), value: 260 },
          { date: new Date(2024, 1, 1), value: 200 },
        ],
      },
    ],
    []
  );

  return (
    <div className="w-full h-[400px] p-4 bg-white rounded-xl shadow-md">
      <Chart
        options={{
          data,
          primaryAxis: {
            getValue: datum => datum.date,
            scaleType: "time",
          },
          secondaryAxes: [
            {
              getValue: datum => datum.value,
              elementType: "line",
            },
          ],
          tooltip: true,
        }}
      />
    </div>
  );
}

export default SimpleChart;
