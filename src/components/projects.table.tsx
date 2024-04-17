import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import type { itszapopan } from "@prisma/client";
import { useState } from "react";

interface Props {
  projects: itszapopan[];
}

export const ProjectsTable = ({ projects }: Props) => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre_proyecto: { value: null, matchMode: FilterMatchMode.CONTAINS },
    metodologia_empleada: { value: null, matchMode: FilterMatchMode.CONTAINS },
    descripcion_de_la_invencion: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
    beneficios_del_proyecto: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
    impacto_de_la_solucion: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
    organizacion_tematica_: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
    desenvolvimiento: { value: null, matchMode: FilterMatchMode.CONTAINS },
    funcionamiento_del_prototipo: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
    grado_de_desarrollo_del_prototipo: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
    total: { value: null, matchMode: FilterMatchMode.CONTAINS },
    fecha: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    _filters.global.value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Busqueda global"
          className="px-4 py-2 w-full"
        />
      </div>
    );
  };

  const getTotal = (project: itszapopan) => {
    return (
      (project.metodologia_empleada ?? 0) +
      (project.descripcion_de_la_invencion ?? 0) +
      (project.beneficios_del_proyecto ?? 0) +
      (project.impacto_de_la_solucion ?? 0) +
      (project.organizacion_tematica_ ?? 0) +
      (project.desenvolvimiento ?? 0) +
      (project.funcionamiento_del_prototipo ?? 0) +
      (project.grado_de_desarrollo_del_prototipo ?? 0)
    );
  };

  return (
    <DataTable
      size="small"
      header={() => renderHeader()}
      scrollable
      scrollHeight="70vh"
      showGridlines
      stripedRows
      paginator
      rows={20}
      rowsPerPageOptions={[20, 35, 50, 100]}
      value={projects.map((project) => ({
        ...project,
        total: getTotal(project).toFixed(2),
      }))}
      filters={filters}
      globalFilterFields={[
        "id",
        "nombre_proyecto",
        "metodologia_empleada",
        "descripcion_de_la_invencion",
        "beneficios_del_proyecto",
        "impacto_de_la_solucion",
        "organizacion_tematica_",
        "desenvolvimiento",
        "funcionamiento_del_prototipo",
        "grado_de_desarrollo_del_prototipo",
        "fecha",
      ]}
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} de {last} de {totalRecords}"
    >
      <Column
        filter
        style={{ fontSize: "0.8rem" }}
        field="id"
        header="ID"
        sortable
      />
      <Column
        filter
        style={{ fontSize: "0.8rem" }}
        field="nombre_proyecto"
        header="Nombre del proyecto"
        sortable
      />
      <Column
        filter
        style={{ fontSize: "0.8rem" }}
        field="metodologia_empleada"
        header="Metodología empleada"
        sortable
      />
      <Column
        filter
        style={{ fontSize: "0.8rem" }}
        field="descripcion_de_la_invencion"
        header="Descripción de la invención"
        sortable
      />
      <Column
        filter
        style={{ fontSize: "0.8rem" }}
        field="beneficios_del_proyecto"
        header="Beneficios del proyecto"
        sortable
      />
      <Column
        filter
        style={{ fontSize: "0.8rem" }}
        field="impacto_de_la_solucion"
        header="Impacto de la solución"
        sortable
      />
      <Column
        filter
        style={{ fontSize: "0.8rem" }}
        field="organizacion_tematica_"
        header="Organización temática"
        sortable
      />
      <Column
        filter
        style={{ fontSize: "0.8rem" }}
        field="desenvolvimiento"
        header="Desenvolvimiento"
        sortable
      />
      <Column
        filter
        style={{ fontSize: "0.8rem" }}
        field="funcionamiento_del_prototipo"
        header="Funcionamiento del prototipo"
        sortable
      />
      <Column
        filter
        style={{ fontSize: "0.8rem" }}
        field="grado_de_desarrollo_del_prototipo"
        header="Grado de desarrollo del prototipo"
        sortable
      />
      <Column
        filter
        style={{ fontSize: "0.8rem" }}
        field="fecha"
        header="Fecha"
        sortable
      />
      <Column
        filter
        style={{ fontSize: "0.8rem" }}
        field="total"
        header="Total"
        sortable
      />
    </DataTable>
  );
};
