import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import type { itszapopan } from "@prisma/client";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Proyectos por año",
    },
  },
};

interface Props {
  projects: itszapopan[];
}

export const YearProjectsChart = ({ projects }: Props) => {
  const years = projects.map((project) => project.fecha ?? "");
  const uniqueYears = [...new Set(years)];

  const data = {
    labels: uniqueYears,
    datasets: [
      {
        label: "Proyectos",
        data: uniqueYears.map((year) => {
          return projects.filter((project) => project.fecha === year).length;
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar data={data} options={options} />;
};
