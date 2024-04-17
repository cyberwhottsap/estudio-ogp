import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

interface Props {
  dataset: number[];
  labels: string[];
}

export const FtChart = ({ dataset, labels }: Props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "FT",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Puntaje",
        data: dataset,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  return (
    <div>
      <div className="my-4">
        <p className="font-bold">Valores</p>
        {dataset.map((value, index) => {
          return (
            <ul
              key={index}
              className="list-inside list-disc text-sm text-gray-500"
            >
              <li>
                {labels[index]}: {value}
              </li>
            </ul>
          );
        })}
      </div>
      <Line options={options} data={data} />;
    </div>
  );
};
