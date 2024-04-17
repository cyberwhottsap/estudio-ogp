import { Toast } from "primereact/toast";
import { api } from "~/utils/api";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";
import { useRef } from "react";
import { z } from "zod";

export const schemaEncuesta = z.object({
  numero_control: z
    .number({
      required_error: "Debes ingresar un numero de control",
    })
    .positive(),
  pregunta0: z.string({
    required_error: "Debes responder esta pregunta",
  }),
  pregunta1: z.string({
    required_error: "Debes responder esta pregunta",
  }),
  pregunta2: z.string({
    required_error: "Debes responder esta pregunta",
  }),
  pregunta3: z.string({
    required_error: "Debes responder esta pregunta",
  }),
  pregunta4: z.string({
    required_error: "Debes responder esta pregunta",
  }),
  pregunta5: z.string({
    required_error: "Debes responder esta pregunta",
  }),
  pregunta6: z.string({
    required_error: "Debes responder esta pregunta",
  }),
  pregunta7: z.string({
    required_error: "Debes responder esta pregunta",
  }),
  pregunta8: z.string({
    required_error: "Debes responder esta pregunta",
  }),
  pregunta9: z.string({
    required_error: "Debes responder esta pregunta",
  }),
  pregunta10: z.string({
    required_error: "Debes responder esta pregunta",
  }),
  pregunta11: z.string({
    required_error: "Debes responder esta pregunta",
  }),
  tipo_encuesta: z.string({
    required_error: "Debes responder esta pregunta",
  }),
});

// cambiar para mostrar preguntas
const preguntas = [
  {
    id: "pregunta0",
    preguntaAlumno: "¿Sabes qué es una OGP?",
    preguntaMaestro: "¿Estás familiarizado con los servicios proporcionados por la Oficina de Orientación y Desarrollo Personal (OGP) de nuestra institución educativa?",
  },
  {
    id: "pregunta1",
    preguntaAlumno: "¿Conoces alguna OGP en nuestro país?",
    preguntaMaestro: "¿Has derivado a tus estudiantes a la OGP para recibir asesoramiento académico o profesional?",
  },
  {
    id: "pregunta2",
    preguntaAlumno: "¿Sabes cuál es el propósito principal de una OGP?",
    preguntaMaestro: "¿Consideras que la OGP desempeña un papel importante en el desarrollo académico de los estudiantes?",
  },
  {
    id: "pregunta3",
    preguntaAlumno: "¿Has interactuado alguna vez con una OGP?",
    preguntaMaestro: "¿Te gustaría recibir información regular de la OGP sobre recursos disponibles para apoyar a los estudiantes?",
  },
  {
    id: "pregunta4",
    preguntaAlumno: "¿Crees que las OGP son importantes para la sociedad?",
    preguntaMaestro: "¿Has notado un impacto positivo en los estudiantes que han utilizado los servicios de la OGP?",
  },
  {
    id: "pregunta5",
    preguntaAlumno: "¿Sabias que una OGP puede impactar en tu vida diaria?",
    preguntaMaestro: "¿Crees que la OGP podría mejorar la colaboración con los profesores para mejorar la experiencia académica de los estudiantes?",
  },
  {
    id: "pregunta6",
    preguntaAlumno: "¿Conoces algún proyecto o iniciativa reciente de una OGP?",
    preguntaMaestro: "¿Piensas que la OGP debería estar más involucrada en orientar a los estudiantes hacia oportunidades de investigación o prácticas profesionales?",
  },
  {
    id: "pregunta7",
    preguntaAlumno: "¿Sientes que la OGP ha sido efectiva en ayudarte a establecer metas académicas y profesionales claras?",
    preguntaMaestro: "¿Estarías interesado en recibir información de la OGP sobre tendencias actuales en orientación académica y profesional?",
  },
  {
    id: "pregunta8",
    preguntaAlumno: "¿Piensas que las OGP deberían interactuar más con los ciudadanos?",
    preguntaMaestro: "¿Consideras que los recursos y servicios de la OGP son accesibles para los profesores que buscan apoyo en orientación académica?",
  },
  {
    id: "pregunta9",
    preguntaAlumno: "¿Consideras que las OGP son necesarias para un buen gobierno? ",
    preguntaMaestro: "¿Crees que la OGP debería ofrecer oportunidades de desarrollo profesional para los profesores con el objetivo de mejorar sus habilidades en el asesoramiento a los estudiantes?",
  },
  {
    id: "pregunta10",
    preguntaAlumno: "¿Crees que las OGP deberían ser más accesibles para los ciudadanos?",
    preguntaMaestro: "¿Has participado en iniciativas conjuntas entre la OGP y el cuerpo docente para apoyar a los estudiantes?",
  },
  {
    id: "pregunta11",
    preguntaAlumno: "¿Piensas que las OGP están haciendo suficiente para involucrar a los jóvenes en su trabajo?",
    preguntaMaestro: "¿Piensas que la OGP podría tener un impacto más significativo si los profesores estuvieran más involucrados en sus actividades?",
  },
] as const;

export default function Encuesta() {
  const toast = useRef<Toast>(null);

  const create = api.encuesta.create.useMutation();

  const formik = useFormik({
    initialValues: schemaEncuesta.parse({
      numero_control: 1,
      pregunta0: "",
      pregunta1: "",
      pregunta2: "",
      pregunta3: "",
      pregunta4: "",
      pregunta5: "",
      pregunta6: "",
      pregunta7: "",
      pregunta8: "",
      pregunta9: "",
      pregunta10: "",
      pregunta11: "",
      tipo_encuesta: "Alumno",
    }),
    onSubmit: (values) => {
      create.mutate(values, {
        onSuccess: () => {
          toast.current?.show({
            severity: "success",
            summary: "Éxito",
            detail: "La encuesta se envió correctamente",
          });
          formik.resetForm();
        },
        onError: () => {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: "Ocurrió un error al enviar la encuesta",
          });
          formik.setSubmitting(false);
        },
      });
    },
    validationSchema: toFormikValidationSchema(schemaEncuesta),
  });

  return (
    <div className="card mx-auto my-32 max-w-5xl bg-[#fae6f8] p-8">
      <Toast ref={toast} />
      <h1 className="text-center text-5xl font-bold text-black">Encuesta</h1>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="numero_control">Número de control</label>
          <input
            type="number"
            className="input input-bordered"
            {...formik.getFieldProps("numero_control")}
          />
          {formik.touched.numero_control && formik.errors.numero_control ? (
            <div className="font-bold text-red-500">
              {formik.errors.numero_control}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <label htmlFor="tipo_encuesta">Selecciona tu puesto</label>
          <select
            className="select select-bordered w-full max-w-xs"
            {...formik.getFieldProps("tipo_encuesta")}
          >
            <option value="Alumno">Alumno</option>
            <option value="Profesor">Profesor</option>
          </select>
        </div>

        {preguntas.map((pregunta) => (
          <div key={pregunta.id} className="flex flex-col">
            <label htmlFor={pregunta.id}>
              {formik.values.tipo_encuesta === "Alumno"
                ? pregunta.preguntaAlumno
                : pregunta.preguntaMaestro}
            </label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  className="radio-info radio"
                  onChange={() => {
                    void formik.setFieldValue(pregunta.id, "Sí");
                  }}
                  checked={formik.values[pregunta.id] === "Sí"}
                />
                <label htmlFor="">Sí</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  className="radio-info radio"
                  onChange={() => {
                    void formik.setFieldValue(pregunta.id, "No");
                  }}
                  checked={formik.values[pregunta.id] === "No"}
                />
                <label htmlFor="">No</label>
              </div>
            </div>
            {formik.touched[pregunta.id] && formik.errors[pregunta.id] ? (
              <div className="font-bold text-red-500">
                {formik.errors[pregunta.id]}
              </div>
            ) : null}
          </div>
        ))}
        <div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
}
