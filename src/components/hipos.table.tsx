import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

interface Props {
  hipos: {
    tipo: string;
    fase1: number | string;
    fase2: number | string;
    fase3: number | string;
    fase4: number | string;
    fase5: number | string;
    total: number | string;
  }[];
}

export const HiposTable = ({ hipos }: Props) => {
  return (
    <DataTable
      size="small"
      scrollable
      scrollHeight="70vh"
      showGridlines
      stripedRows
      paginator
      rows={20}
      rowsPerPageOptions={[20, 35, 50, 100]}
      value={hipos}
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} de {last} de {totalRecords}"
    >
      <Column
        filter
        style={{ fontSize: "0.8rem" }}
        field="tipo"
        header=""
        sortable
      />
      <Column
        filter
        style={{ fontSize: "0.8rem" }}
        field="fase1"
        header="Fase 1"
        sortable
      />
      <Column
        filter
        style={{ fontSize: "0.8rem" }}
        field="fase2"
        header="Fase 2"
        sortable
      />
      <Column
        filter
        style={{ fontSize: "0.8rem" }}
        field="fase3"
        header="Fase 3"
        sortable
      />
      <Column
        filter
        style={{ fontSize: "0.8rem" }}
        field="fase4"
        header="Fase 4"
        sortable
      />
      <Column
        filter
        style={{ fontSize: "0.8rem" }}
        field="fase5"
        header="Fase 5"
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
