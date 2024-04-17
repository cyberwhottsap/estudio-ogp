import * as XLSX from "xlsx";

import { AreaChart } from "~/components/area.chart";
import { ErrorMessage } from "~/components/error.message";
import Head from "next/head";
import { HiposTable } from "~/components/hipos.table";
import { Loading } from "~/components/loading";
import { PhaseChart } from "~/components/phase.chart";
import { ProjectsTable } from "~/components/projects.table";
import { type ProyectoExcel } from "~/types";
import { YearProjectsChart } from "~/components/year.projects.chart";
import { api } from "~/utils/api";
import { decimalToPercent } from "~/utils/numbers";
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import jStat from "jstat";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { DESCRIPCCIONES, INSTRUCCIONES } from "~/data/data";
import { EncuestaChart } from "~/components/encuesta.chart";

export default function Resultados() {
  const { data, error } = api.project.getAll.useQuery();
  const { data: dataEncuenta, error: errorEncuesta } =
    api.encuesta.getAll.useQuery();
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUpload, setCurrentUpload] = useState(0);
  const [currentUploadTotal, setCurrentUploadTotal] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useRef<Toast>(null);

  const create = api.project.create.useMutation();
  const utils = api.useContext();

  if (error)
    return (
      <div className="mt-32">
        <ErrorMessage>{error.message}</ErrorMessage>
      </div>
    );

  if (errorEncuesta)
    return (
      <div className="mt-32">
        <ErrorMessage>{errorEncuesta.message}</ErrorMessage>
      </div>
    );

  if (!data)
    return (
      <div className="mt-32">
        <Loading />
      </div>
    );

  if (!dataEncuenta)
    return (
      <div className="mt-32">
        <Loading />
      </div>
    );

  const phaseOne = data.projects.map(
    (project) =>
      (project?.descripcion_de_la_invencion ?? 0) +
      (project?.beneficios_del_proyecto ?? 0),
  );

  const phaseTwo = data.projects.map(
    (project) => project?.impacto_de_la_solucion ?? 0,
  );

  const phaseThree = data.projects.map(
    (project) =>
      (project?.organizacion_tematica_ ?? 0) + (project?.desenvolvimiento ?? 0),
  );

  const phaseFour = data.projects.map(
    (project) => project?.funcionamiento_del_prototipo ?? 0,
  );

  const phaseFive = data.projects.map(
    (project) => project?.grado_de_desarrollo_del_prototipo ?? 0,
  );

  const fase1ConMetodologia = data.projects.filter(
    (project) => (project.fase_1_con_metodologia__ ?? 0) >= 60,
  ).length;

  const fase2ConMetodologia = data.projects.filter(
    (project) => (project.fase_2_con_metodologia__ ?? 0) >= 60,
  ).length;

  const fase3ConMetodologia = data.projects.filter(
    (project) => (project.fase_3_con_metodologia__ ?? 0) >= 60,
  ).length;

  const fase4ConMetodologia = data.projects.filter(
    (project) => (project.fase_4_con_metodologia__ ?? 0) >= 60,
  ).length;

  const fase5ConMetodologia = data.projects.filter(
    (project) => (project.fase_5_con_metodologia__ ?? 0) >= 60,
  ).length;

  const totalConMetodologia =
    fase1ConMetodologia +
    fase2ConMetodologia +
    fase3ConMetodologia +
    fase4ConMetodologia +
    fase5ConMetodologia;

  const fase1SinMetodologia = data.projects.filter(
    (project) => (project.fase_1_sin_metodologia__ ?? 0) >= 60,
  ).length;

  const fase2SinMetodologia = data.projects.filter(
    (project) => (project.fase_2_sin_metodologia__ ?? 0) >= 60,
  ).length;

  const fase3SinMetodologia = data.projects.filter(
    (project) => (project.fase_3_sin_metodologia__ ?? 0) >= 60,
  ).length;

  const fase4SinMetodologia = data.projects.filter(
    (project) => (project.fase_4_sin_metodologia__ ?? 0) >= 60,
  ).length;

  const fase5SinMetodologia = data.projects.filter(
    (project) => (project.fase_5_sin_metodologia__ ?? 0) >= 60,
  ).length;

  const totalSinMetodologia =
    fase1SinMetodologia +
    fase2SinMetodologia +
    fase3SinMetodologia +
    fase4SinMetodologia +
    fase5SinMetodologia;

  const totalFase1 = fase1ConMetodologia + fase1SinMetodologia;
  const totalFase2 = fase2ConMetodologia + fase2SinMetodologia;
  const totalFase3 = fase3ConMetodologia + fase3SinMetodologia;
  const totalFase4 = fase4ConMetodologia + fase4SinMetodologia;
  const totalFase5 = fase5ConMetodologia + fase5SinMetodologia;

  const totalFases = totalConMetodologia + totalSinMetodologia;

  const frecuenciasObservadasData = [
    {
      tipo: "Con metodologia",
      fase1: fase1ConMetodologia,
      fase2: fase2ConMetodologia,
      fase3: fase3ConMetodologia,
      fase4: fase4ConMetodologia,
      fase5: fase5ConMetodologia,
      total: totalConMetodologia,
    },
    {
      tipo: "Sin metodologia",
      fase1: fase1SinMetodologia,
      fase2: fase2SinMetodologia,
      fase3: fase3SinMetodologia,
      fase4: fase4SinMetodologia,
      fase5: fase5SinMetodologia,
      total: totalSinMetodologia,
    },
    {
      tipo: "Total",
      fase1: totalFase1,
      fase2: totalFase2,
      fase3: totalFase3,
      fase4: totalFase4,
      fase5: totalFase5,
      total: totalConMetodologia + totalSinMetodologia,
    },
  ];

  const frecuenciasPorcentualesData = [
    {
      tipo: "Con metodologia",
      fase1: decimalToPercent(fase1ConMetodologia / totalFase1),
      fase2: decimalToPercent(fase2ConMetodologia / totalFase2),
      fase3: decimalToPercent(fase3ConMetodologia / totalFase3),
      fase4: decimalToPercent(fase4ConMetodologia / totalFase4),
      fase5: decimalToPercent(fase5ConMetodologia / totalFase5),
      total: decimalToPercent(
        totalConMetodologia / (totalConMetodologia + totalSinMetodologia),
      ),
    },
    {
      tipo: "Sin metodologia",
      fase1: decimalToPercent(fase1SinMetodologia / totalFase1),
      fase2: decimalToPercent(fase2SinMetodologia / totalFase2),
      fase3: decimalToPercent(fase3SinMetodologia / totalFase3),
      fase4: decimalToPercent(fase4SinMetodologia / totalFase4),
      fase5: decimalToPercent(fase5SinMetodologia / totalFase5),
      total: decimalToPercent(
        totalSinMetodologia / (totalConMetodologia + totalSinMetodologia),
      ),
    },
    {
      tipo: "Total",
      fase1: decimalToPercent(totalFase1 / totalFase1),
      fase2: decimalToPercent(totalFase2 / totalFase2),
      fase3: decimalToPercent(totalFase3 / totalFase3),
      fase4: decimalToPercent(totalFase4 / totalFase4),
      fase5: decimalToPercent(totalFase5 / totalFase5),
      total: decimalToPercent(
        (totalConMetodologia + totalSinMetodologia) /
          (totalConMetodologia + totalSinMetodologia),
      ),
    },
  ];

  const frecuenciaEsperadaFase1ConMetodologia =
    (totalFase1 * totalConMetodologia) / totalFases;
  const frecuenciaEsperadaFase2ConMetodologia =
    (totalFase2 * totalConMetodologia) / totalFases;
  const frecuenciaEsperadaFase3ConMetodologia =
    (totalFase3 * totalConMetodologia) / totalFases;
  const frecuenciaEsperadaFase4ConMetodologia =
    (totalFase4 * totalConMetodologia) / totalFases;
  const frecuenciaEsperadaFase5ConMetodologia =
    (totalFase5 * totalConMetodologia) / totalFases;

  const frecuenciaEsperadaFase1SinMetodologia =
    (totalFase1 * totalSinMetodologia) / totalFases;
  const frecuenciaEsperadaFase2SinMetodologia =
    (totalFase2 * totalSinMetodologia) / totalFases;
  const frecuenciaEsperadaFase3SinMetodologia =
    (totalFase3 * totalSinMetodologia) / totalFases;
  const frecuenciaEsperadaFase4SinMetodologia =
    (totalFase4 * totalSinMetodologia) / totalFases;
  const frecuenciaEsperadaFase5SinMetodologia =
    (totalFase5 * totalSinMetodologia) / totalFases;

  const frecuenciasEsperadasData = [
    {
      tipo: "Con metodologia",
      fase1: frecuenciaEsperadaFase1ConMetodologia,
      fase2: frecuenciaEsperadaFase2ConMetodologia,
      fase3: frecuenciaEsperadaFase3ConMetodologia,
      fase4: frecuenciaEsperadaFase4ConMetodologia,
      fase5: frecuenciaEsperadaFase5ConMetodologia,
      total: totalConMetodologia,
    },
    {
      tipo: "Sin metodologia",
      fase1: frecuenciaEsperadaFase1SinMetodologia,
      fase2: frecuenciaEsperadaFase2SinMetodologia,
      fase3: frecuenciaEsperadaFase3SinMetodologia,
      fase4: frecuenciaEsperadaFase4SinMetodologia,
      fase5: frecuenciaEsperadaFase5SinMetodologia,
      total: totalSinMetodologia,
    },
    {
      tipo: "Total",
      fase1:
        frecuenciaEsperadaFase1ConMetodologia +
        frecuenciaEsperadaFase1SinMetodologia,
      fase2:
        frecuenciaEsperadaFase2ConMetodologia +
        frecuenciaEsperadaFase2SinMetodologia,
      fase3:
        frecuenciaEsperadaFase3ConMetodologia +
        frecuenciaEsperadaFase3SinMetodologia,
      fase4:
        frecuenciaEsperadaFase4ConMetodologia +
        frecuenciaEsperadaFase4SinMetodologia,
      fase5:
        frecuenciaEsperadaFase5ConMetodologia +
        frecuenciaEsperadaFase5SinMetodologia,
      total: totalConMetodologia + totalSinMetodologia,
    },
  ];

  const estadisticoChiFase1ConMetodologia =
    (fase1ConMetodologia - frecuenciaEsperadaFase1ConMetodologia) ** 2 /
    frecuenciaEsperadaFase1ConMetodologia;
  const estadisticoChiFase2ConMetodologia =
    (fase2ConMetodologia - frecuenciaEsperadaFase2ConMetodologia) ** 2 /
    frecuenciaEsperadaFase2ConMetodologia;
  const estadisticoChiFase3ConMetodologia =
    (fase3ConMetodologia - frecuenciaEsperadaFase3ConMetodologia) ** 2 /
    frecuenciaEsperadaFase3ConMetodologia;
  const estadisticoChiFase4ConMetodologia =
    (fase4ConMetodologia - frecuenciaEsperadaFase4ConMetodologia) ** 2 /
    frecuenciaEsperadaFase4ConMetodologia;
  const estadisticoChiFase5ConMetodologia =
    (fase5ConMetodologia - frecuenciaEsperadaFase5ConMetodologia) ** 2 /
    frecuenciaEsperadaFase5ConMetodologia;

  const estadisticoChiFase1SinMetodologia =
    (fase1SinMetodologia - frecuenciaEsperadaFase1SinMetodologia) ** 2 /
    frecuenciaEsperadaFase1SinMetodologia;
  const estadisticoChiFase2SinMetodologia =
    (fase2SinMetodologia - frecuenciaEsperadaFase2SinMetodologia) ** 2 /
    frecuenciaEsperadaFase2SinMetodologia;
  const estadisticoChiFase3SinMetodologia =
    (fase3SinMetodologia - frecuenciaEsperadaFase3SinMetodologia) ** 2 /
    frecuenciaEsperadaFase3SinMetodologia;
  const estadisticoChiFase4SinMetodologia =
    (fase4SinMetodologia - frecuenciaEsperadaFase4SinMetodologia) ** 2 /
    frecuenciaEsperadaFase4SinMetodologia;
  const estadisticoChiFase5SinMetodologia =
    (fase5SinMetodologia - frecuenciaEsperadaFase5SinMetodologia) ** 2 /
    frecuenciaEsperadaFase5SinMetodologia;

  const totalEstadisticoChi =
    estadisticoChiFase1ConMetodologia +
    estadisticoChiFase2ConMetodologia +
    estadisticoChiFase3ConMetodologia +
    estadisticoChiFase4ConMetodologia +
    estadisticoChiFase5ConMetodologia +
    estadisticoChiFase1SinMetodologia +
    estadisticoChiFase2SinMetodologia +
    estadisticoChiFase3SinMetodologia +
    estadisticoChiFase4SinMetodologia +
    estadisticoChiFase5SinMetodologia;

  const estadisticoChiData = [
    {
      tipo: "Con metodologia",
      fase1: estadisticoChiFase1ConMetodologia,
      fase2: estadisticoChiFase2ConMetodologia,
      fase3: estadisticoChiFase3ConMetodologia,
      fase4: estadisticoChiFase4ConMetodologia,
      fase5: estadisticoChiFase5ConMetodologia,
      total: "",
    },
    {
      tipo: "Sin metodologia",
      fase1: estadisticoChiFase1SinMetodologia,
      fase2: estadisticoChiFase2SinMetodologia,
      fase3: estadisticoChiFase3SinMetodologia,
      fase4: estadisticoChiFase4SinMetodologia,
      fase5: estadisticoChiFase5SinMetodologia,
      total: "",
    },
    {
      tipo: "Total",
      fase1: "",
      fase2: "",
      fase3: "",
      fase4: "",
      fase5: "",
      total: totalEstadisticoChi,
    },
  ];

  const coeficienteDeCramer = Math.sqrt(
    totalEstadisticoChi /
      ((totalConMetodologia + totalSinMetodologia) * Math.min(1, 4)),
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      toast.current?.show({
        severity: "info",
        summary: "Info",
        detail: "Debes seleccionar un archivo",
      });
      return;
    }

    const file = event.target.files[0];

    setFile(file);
  };

  // función que lee la información del excel
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // si no existe un archivo cargado, devuelve un error
    if (!file) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Debes seleccionar un archivo",
      });
      return;
    }

    setIsSubmitting(true);

    // obtiene el archivo de excel
    const workbook = XLSX.read(await file.arrayBuffer(), { type: "binary" });

    // obtiene el nombre de la primera página
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) return;

    // obtiene la primera página en sí en base a su nombre
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) return;

    // convierte la página en información de JSON que Javascript puede leer
    const data = XLSX.utils.sheet_to_json(sheet);

    // reasignamos la información agregandole un tipo de dato ( un array de ProyectoExcel)
    const excelData = data as ProyectoExcel[];

    setCurrentUploadTotal(excelData.length);

    const errores: string[] = [];

    // recorremos cada fila del excel que ahora es información en formato JSON
    for (const item of excelData) {
      // por cada fila enviamos los datos al servidor
      try {
        setCurrentUpload((prev) => prev + 1);
        await create.mutateAsync(item, {
          // en caso de error, agregamos el error a un array
          onError: (error) => {
            if (error.data?.zodError?.fieldErrors) {
              errores.push(`Registro ${item.nombre_proyecto}:\n`);
              Object.keys(error.data?.zodError?.fieldErrors).forEach((key) => {
                const fieldError = error.data?.zodError?.fieldErrors[key];

                if (fieldError) {
                  errores.push(`${key}: ${fieldError.join(", ")}`);
                }
              });
              errores.push("\n\n");
            }
          },
        });
      } catch (error) {}
    }

    // si hay un error o más lanza una alerta
    if (errores.length > 0) {
      toast.current?.show({
        severity: "warn",
        summary: "Atención",
        detail:
          "Ocurrieron errores al subir algunos datos, se descargará un archivo de texto con los errores",
      });
      // descarga un log con los errores que existían en el array
      const element = document.createElement("a");
      const file = new Blob([errores.map((error) => error).join("\n")], {
        type: "text/plain",
      });
      element.href = URL.createObjectURL(file);
      element.download = "errores.txt";
      document.body.appendChild(element);
      element.click();
    }

    // si no hay errores, ajusta todo en caso de que se quiera subir otro archivo y envia una alerta de
    // éxito en la operación 
    setIsSubmitting(false);
    setCurrentUpload(0);
    setCurrentUploadTotal(0);
    setFile(undefined);

    fileInputRef.current?.value && (fileInputRef.current.value = "");

    await utils.project.invalidate();

    if (errores.length === 0) {
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Registros subidos correctamente",
      });
    }
  };

  const downloadEncuestas = () => {
    // se descarga en formato csv
    const element = document.createElement("a");
    const workbook = XLSX.utils.book_new();

    // Crea una hoja de trabajo
    const worksheet = XLSX.utils.json_to_sheet(dataEncuenta.encuestas);

    // Añade la hoja de trabajo al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");

    // Convierte el libro a un archivo binario
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    element.href = URL.createObjectURL(blob);
    element.download = "encuestas.xlsx";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <>
      <Toast ref={toast} />
      <Head>
        <title>Inicio</title>
        <meta name="description" content="Inicio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto mt-8 pt-8">
        <h1 className="text-center text-5xl font-bold text-black">
          Resultados
        </h1>

        <div className="mx-auto my-8 flex justify-center bg-base-200 p-4 max-w-2xl">
          <YearProjectsChart projects={data.projects} />
        </div>

        <div>
          <h2 className="text-4xl font-bold text-black text-center">Fases</h2>
          <div className="mx-auto my-8 grid max-w-5xl justify-center gap-4">
            <div className="col-12 sm:col-5 bg-base-200 p-4 max-w-2xl">
              <p>Fase 1</p>
              <PhaseChart
                labels={["Menores a 10", "Entre 11 y 20", "Mayores a 20"]}
                projectsByPhase={[
                  phaseOne.filter((value) => value <= 10).length,
                  phaseOne.filter((value) => value >= 11 && value <= 20).length,
                  phaseOne.filter((value) => value >= 21).length,
                ]}
              />
            </div>

            <div className="col-12 sm:col-5 bg-base-200 p-4">
              <p>Fase 2</p>
              <PhaseChart
                labels={["Menores a 5", "Entre 5 y 10", "Mayores a 10"]}
                projectsByPhase={[
                  phaseTwo.filter((value) => value <= 5).length,
                  phaseTwo.filter((value) => value >= 6 && value <= 10).length,
                  phaseTwo.filter((value) => value >= 11).length,
                ]}
              />
            </div>

            <div className="col-12 sm:col-5 bg-base-200 p-4">
              <p>Fase 3</p>
              <PhaseChart
                labels={["Menores a 10", "Entre 11 y 20", "Mayores a 20"]}
                projectsByPhase={[
                  phaseThree.filter((value) => value <= 10).length,
                  phaseThree.filter((value) => value >= 11 && value <= 20)
                    .length,
                  phaseThree.filter((value) => value >= 21).length,
                ]}
              />
            </div>

            <div className="col-12 sm:col-5 bg-base-200 p-4">
              <p>Fase 4</p>
              <PhaseChart
                labels={["Menores a 5", "Entre 6 y 10", "Mayores a 10"]}
                projectsByPhase={[
                  phaseFour.filter((value) => value <= 5).length,
                  phaseFour.filter((value) => value >= 6 && value <= 10).length,
                  phaseFour.filter((value) => value >= 11).length,
                ]}
              />
            </div>

            <div className="col-12 sm:col-5 bg-base-200 p-4">
              <p>Fase 5</p>
              <PhaseChart
                labels={["Menores a 5", "Entre 6 y 10", "Mayores a 10"]}
                projectsByPhase={[
                  phaseFive.filter((value) => value <= 5).length,
                  phaseFive.filter((value) => value >= 6 && value <= 10).length,
                  phaseFive.filter((value) => value >= 11).length,
                ]}
              />
            </div>
          </div>
        </div>

        <div className="mx-auto my-16 space-y-4 bg-base-200 p-4 max-w-2xl">
          <h2
            className="text-2xl
            font-bold
          "
          >
            Proyectos
          </h2>
          <div>
          <ProjectsTable projects={data.projects} />
          </div>
        </div>

        <div className="mx-auto my-16 space-y-16 bg-base-200 p-4 max-w-2xl">
          <div className="space-y-4">
            <h2 className="my-4 text-center text-3xl font-bold">
              Frecuencias obervadas
            </h2>
            <p>{DESCRIPCCIONES.frecuenciasObservadas}</p>
            <HiposTable hipos={frecuenciasObservadasData} />
          </div>
          <div className="flex justify-center">
            <AreaChart
              title="Frecuencias observadas"
              labels={["Fase 1", "Fase 2", "Fase 3", "Fase 4", "Fase 5"]}
              datasets={[
                {
                  label: "Con metodologia",
                  data: [
                    fase1ConMetodologia,
                    fase2ConMetodologia,
                    fase3ConMetodologia,
                    fase4ConMetodologia,
                    fase5ConMetodologia,
                  ],
                  borderColor: "rgba(255, 99, 132, 0.2)",
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                  fill: true,
                },
                {
                  label: "Sin metodologia",
                  data: [
                    fase1SinMetodologia,
                    fase2SinMetodologia,
                    fase3SinMetodologia,
                    fase4SinMetodologia,
                    fase5SinMetodologia,
                  ],
                  borderColor: "rgba(54, 162, 235, 0.2)",
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  fill: true,
                },
              ]}
            />
          </div>
        </div>
        <div className="mx-auto my-16 space-y-16 bg-base-200 p-4 max-w-2xl">
          <div className="space-y-4">
            <h2 className="my-4 text-center text-3xl font-bold">
              Frecuencias porcentuales
            </h2>
            <p>{DESCRIPCCIONES.frecuenciasPorcentuales}</p>
            <HiposTable hipos={frecuenciasPorcentualesData} />
          </div>
        </div>
        <div className="mx-auto my-16 space-y-16 bg-base-200 p-4 max-w-2xl">
          <div className="space-y-4">
            <h2 className="my-4 text-center text-3xl font-bold">
              Frecuencias esperadas
            </h2>
            <p>{DESCRIPCCIONES.frecuenciasEsperadas}</p>
            <HiposTable hipos={frecuenciasEsperadasData} />
          </div>
        </div>
        <div className="mx-auto my-16 space-y-16 bg-base-200 p-4 max-w-2xl">
          <div className="space-y-4">
            <h2 className="my-4 text-center text-3xl font-bold">
              Estadistico Chi
            </h2>
            <HiposTable hipos={estadisticoChiData} />
          </div>
          <div className="space-y-4">
            <p>{DESCRIPCCIONES.estadisticoChi}</p>
            <h2 className="text-2xl">
              Estadistico de prueba: {totalEstadisticoChi}
            </h2>
            <h2 className="text-2xl">Valor crítico: {4}</h2>
            <h2 className="text-2xl">Error: {0.05}</h2>
            <h2 className="text-2xl">
              Valor crítico resolución: {jStat.chisquare.inv(0.95, 4)}
            </h2>
            <div>
              <h2 className="text-2xl">
                Coeficiente de Cramer: {coeficienteDeCramer}
              </h2>
              <p>
                {coeficienteDeCramer > 0.3
                  ? "Mayor a 0.3 es aceptable, existe una asociacion aceptable entre las variables estudiadas."
                  : "Si es menor a 0.3 no existe una asociacion aceptable entre las variables aceptadas."}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl">Resultado de Chi</h2>
            <p>
              {totalEstadisticoChi > jStat.chisquare.inv(0.95, 4)
                ? "No se acepta la hipotesis nula"
                : "Se acepta la hipotesis nula"}
            </p>
          </div>
        </div>

        <div className="mx-auto my-8 flex flex-col items-center justify-center bg-base-200 p-4 max-w-2xl">
          <h2 className="text-4xl font-bold">
            Descargar resultados de encuestas
          </h2>
          <button
            className="btn btn-primary mt-4"
            onClick={downloadEncuestas}
          >
            Descargar
          </button>
        </div>

        <div className="mx-auto my-8 flex flex-col items-center justify-center bg-base-200 p-4 max-w-2xl">
          <h2 className="text-4xl font-bold">Encuestas de alumnos</h2>
          <p>{DESCRIPCCIONES.encuestasAlumnos}</p>
          <EncuestaChart
            encuestas={dataEncuenta.encuestas.filter(
              (encuesta) => encuesta.tipo_encuesta === "Alumno",
            )}
          />
        </div>

        <div className="mx-auto my-8 flex flex-col items-center justify-center bg-base-200 p-4 max-w-2xl">
          <h2 className="text-4xl font-bold">Encuestas de profesores</h2>
          <p>{DESCRIPCCIONES.encuestasProfesores}</p>
          <EncuestaChart
            encuestas={dataEncuenta.encuestas.filter(
              (encuesta) => encuesta.tipo_encuesta === "Profesor",
            )}
          />
        </div>

        <div className="mx-auto my-8 flex flex-col items-center justify-center bg-base-200 p-4 max-w-2xl">
          <h2 className="text-4xl font-bold">Carga de archivo</h2>
          <div className="mx-8 my-8 space-y-4 bg-base-200 p-4">
            <details>
              <summary className="btn btn-error">
                <span className="flex items-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-8 w-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                  <span>Instrucciones</span>
                </span>
              </summary>
              <div className="max-w-2xl p-4">
                <ul className="list-inside list-disc">
                  {INSTRUCCIONES.map((instruccion, index) => (
                    <li key={index}>{instruccion}</li>
                  ))}
                </ul>
              </div>
            </details>

            <a className="btn btn-accent" href="/files/template.xls">
              <span className="flex items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                </span>
                <span>Descargar plantilla</span>
              </span>
            </a>

            <form onSubmit={(e) => void handleSubmit(e)}>
              <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full"
                placeholder="Buscar"
                onChange={handleFileUpload}
                ref={fileInputRef}
              />
              <button
                type="submit"
                className="btn btn-primary mt-4 w-full"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? `Subiendo ${currentUpload} de ${currentUploadTotal} registros`
                  : "Subir registros"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
