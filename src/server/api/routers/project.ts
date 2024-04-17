import { createTRPCRouter, publicProcedure } from "../trpc";

import { z } from "zod";

const proyectSchema = z.object({
  beneficios_del_proyecto: z.number({
    invalid_type_error: "El valor debe ser un número",
    required_error: "El valor es requerido",
  }),
  descripcion_de_la_invencion: z.number({
    invalid_type_error: "El valor debe ser un número",
    required_error: "El valor es requerido",
  }),
  desenvolvimiento: z.number({
    invalid_type_error: "El valor debe ser un número",
    required_error: "El valor es requerido",
  }),
  fecha: z.number({
    invalid_type_error: "El valor debe ser un número",
    required_error: "El valor es requerido",
  }),
  funcionamiento_del_prototipo: z.number({
    invalid_type_error: "El valor debe ser un número",
    required_error: "El valor es requerido",
  }),
  grado_de_desarrollo_del_prototipo: z.number({
    invalid_type_error: "El valor debe ser un número",
    required_error: "El valor es requerido",
  }),
  impacto_de_la_solucion: z.number({
    invalid_type_error: "El valor debe ser un número",
    required_error: "El valor es requerido",
  }),
  metodologia_empleada: z.number({
    invalid_type_error: "El valor debe ser un número",
    required_error: "El valor es requerido",
  }),
  nombre_proyecto: z.string({
    invalid_type_error: "El valor debe ser un texto",
    required_error: "El valor es requerido",
  }),
  organizacion_tematica: z.number({
    invalid_type_error: "El valor debe ser un número",
    required_error: "El valor es requerido",
  }),
});

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    // obtiene todos los proyectos
    const projects = await ctx.db.itszapopan.findMany();

    // generamos un array de los proyectos adjuntandoles sus fases
    // esto debido a que las fases no vienen desde la base de datos
    // sino que tenemos que generarlas en base a sus propios cálculos
    const projectsWithFases = projects.map((project) => {
      // valor de organización tematica para metodologia
      const organizacionTematicaParaMetodologia =
        (project.organizacion_tematica_ ?? 0) > 5
          ? 5
          : project.organizacion_tematica_;

      // valor de descripción para metodologia
      const descripcionDeLaInvencionParaMetodologia =
        (project.descripcion_de_la_invencion ?? 0) > 10
          ? 10
          : project.descripcion_de_la_invencion;

      return {
        // toda la info que ya teníamos del proyecto
        ...project,

        // y además, agregamos las fases una por una

        // agregamos fase 1 sin metodologia
        fase_1_sin_metodologia__:
          (((project.descripcion_de_la_invencion ?? 0) +
            (project.beneficios_del_proyecto ?? 0)) *
            100) /
          30,

        fase_2_sin_metodologia__:
          ((project.impacto_de_la_solucion ?? 0) * 100) / 15,

        fase_3_sin_metodologia__:
          (((project.desenvolvimiento ?? 0) +
            (project.organizacion_tematica_ ?? 0)) *
            100) /
          25,

        fase_4_sin_metodologia__:
          ((project.funcionamiento_del_prototipo ?? 0) * 100) / 15,

        fase_5_sin_metodologia__:
          ((project.grado_de_desarrollo_del_prototipo ?? 0) * 100) / 15,

        fase_1_con_metodologia__:
          (((descripcionDeLaInvencionParaMetodologia ?? 0) +
            (project.beneficios_del_proyecto ?? 0)) *
            100) /
          25,

        fase_2_con_metodologia__:
          ((project.impacto_de_la_solucion ?? 0) * 100) / 15,

        fase_3_con_metodologia__:
          (((project.desenvolvimiento ?? 0) +
            (organizacionTematicaParaMetodologia ?? 0)) *
            100) /
          20,

        fase_4_con_metodologia__:
          ((project.funcionamiento_del_prototipo ?? 0) * 100) / 15,

        fase_5_con_metodologia__:
          ((project.grado_de_desarrollo_del_prototipo ?? 0) * 100) / 15,
          
        fase_6_con_metodologia__:
          ((project.grado_de_desarrollo_del_prototipo ?? 0) * 100) / 15,
      };
    });

    return { projects: projectsWithFases };
  }),
  create: publicProcedure
    .input(proyectSchema)
    .mutation(async ({ ctx, input }) => {
      const { organizacion_tematica, ...rest } = input;

      const projectExists = await ctx.db.itszapopan.findFirst({
        where: { nombre_proyecto: input.nombre_proyecto.toUpperCase() },
      });

      if (projectExists) {
        // actualizar
        const project = await ctx.db.itszapopan.update({
          where: { id: projectExists.id },
          data: {
            ...rest,
            organizacion_tematica_: input.organizacion_tematica,
            fecha: input.fecha.toString(),
            nombre_proyecto: input.nombre_proyecto.toUpperCase(),
          },
        });

        return { project };
      } else {
        // crear
        const project = await ctx.db.itszapopan.create({
          data: {
            ...rest,
            organizacion_tematica_: input.organizacion_tematica,
            fecha: input.fecha.toString(),
            nombre_proyecto: input.nombre_proyecto.toUpperCase(),
          },
        });

        return { project };
      }
    }),
});
