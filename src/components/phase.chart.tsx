import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";

import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

interface Props {
  projectsByPhase: number[];
  labels: string[];
}

export const PhaseChart = (props: Props) => {
  const { projectsByPhase, labels } = props;

  const data = {
    labels,
    datasets: [
      {
        label: "Número de proyectos",
        data: projectsByPhase,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132)",
        borderWidth: 1,
      },
    ],
  };

  const total = projectsByPhase.reduce((a, b) => a + b, 0);

  return (
    <div>
      <div className="my-4">
        <p className="font-bold">
          Número de proyectos por fase con porcentaje
        </p>
        {projectsByPhase.map((value, index) => {
          return (
            <ul
              key={index}
              className="list-inside list-disc text-sm text-gray-500"
            >
              <li>
                {labels[index]}: {value} ({((value / total) * 100).toFixed(2)}%)
              </li>
            </ul>
          );
        })}
      </div>
      <Radar data={data} options={options} />
    </div>
  );
};
