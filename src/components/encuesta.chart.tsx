import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { type encuesta } from "@prisma/client";

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
      text: "Encuestas",
    },
  },
};

const labels = [
  "Pregunta 1",
  "Pregunta 2",
  "Pregunta 3",
  "Pregunta 4",
  "Pregunta 5",
  "Pregunta 6",
  "Pregunta 7",
  "Pregunta 8",
  "Pregunta 9",
  "Pregunta 10",
  "Pregunta 11",
  "Pregunta 12",
];

interface Props {
  encuestas: encuesta[];
}

export function EncuestaChart({ encuestas }: Props) {
  // obtenemos el total de "si" por cada una de las preguntas del 0 al 11
  const respondenQueSi = [
    encuestas.filter((encuesta) => encuesta.pregunta0 === "Sí").length,
    encuestas.filter((encuesta) => encuesta.pregunta1 === "Sí").length,
    encuestas.filter((encuesta) => encuesta.pregunta2 === "Sí").length,
    encuestas.filter((encuesta) => encuesta.pregunta3 === "Sí").length,
    encuestas.filter((encuesta) => encuesta.pregunta4 === "Sí").length,
    encuestas.filter((encuesta) => encuesta.pregunta5 === "Sí").length,
    encuestas.filter((encuesta) => encuesta.pregunta6 === "Sí").length,
    encuestas.filter((encuesta) => encuesta.pregunta7 === "Sí").length,
    encuestas.filter((encuesta) => encuesta.pregunta8 === "Sí").length,
    encuestas.filter((encuesta) => encuesta.pregunta9 === "Sí").length,
    encuestas.filter((encuesta) => encuesta.pregunta10 === "Sí").length,
    encuestas.filter((encuesta) => encuesta.pregunta11 === "Sí").length,
  ]

  // obtenemos el total de "no" por cada una de las preguntas del 0 al 11
  const respondenQueNo = [
    encuestas.filter((encuesta) => encuesta.pregunta0 === "No").length,
    encuestas.filter((encuesta) => encuesta.pregunta1 === "No").length,
    encuestas.filter((encuesta) => encuesta.pregunta2 === "No").length,
    encuestas.filter((encuesta) => encuesta.pregunta3 === "No").length,
    encuestas.filter((encuesta) => encuesta.pregunta4 === "No").length,
    encuestas.filter((encuesta) => encuesta.pregunta5 === "No").length,
    encuestas.filter((encuesta) => encuesta.pregunta6 === "No").length,
    encuestas.filter((encuesta) => encuesta.pregunta7 === "No").length,
    encuestas.filter((encuesta) => encuesta.pregunta8 === "No").length,
    encuestas.filter((encuesta) => encuesta.pregunta9 === "No").length,
    encuestas.filter((encuesta) => encuesta.pregunta10 === "No").length,
    encuestas.filter((encuesta) => encuesta.pregunta11 === "No").length,
  ]

  const data = {
    labels,
    datasets: [
      {
        label: "Responden que sí",
        data: respondenQueSi,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Responden que no",
        data: respondenQueNo,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
