import { useEffect, useState } from "react";
import type { Artwork } from "./type";
import { fetchArtworks } from "./api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { DataTablePageEvent } from "primereact/datatable";
import "./App.css";

function App() {
  const [data, setData] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const rowPerPage = 12;

  useEffect(() => {
    const getdata = async () => {
      try {
        setLoading(true);
        const response = await fetchArtworks(currentPage);
        setData(response.data);
        setTotalRecords(response.pagination.total);
        console.log(response);
      } catch (error) {
        console.log("Error :", error);
      } finally {
        setLoading(false);
      }
    };
    getdata();
  }, [currentPage]);

  const onPageChange = (event: DataTablePageEvent) => {
    const newPage = (event.page ?? 0) + 1;
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="container">
        <h2>Artworks Table</h2>
        <DataTable
          value={data}
          loading={loading}
          paginator
          paginatorTemplate="CurrentPageReport  PrevPageLink PageLinks NextPageLink "
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          rows={rowPerPage}
          first={(currentPage - 1) * rowPerPage}
          onPage={onPageChange}
          lazy
          totalRecords={totalRecords}
        >
          <Column
            header="Origin"
            body={(row: Artwork) => row.place_of_origin ?? "N/A"}
          />

          <Column
            header="Artist"
            body={(row: Artwork) => row.artist_display ?? "N/A"}
          />

          <Column
            header="Inscriptions"
            body={(row: Artwork) => row.inscriptions ?? "N/A"}
          />

          <Column
            header="Start Date"
            body={(row: Artwork) => row.date_start ?? "N/A"}
          />

          <Column
            header="End Date"
            body={(row: Artwork) => row.date_end ?? "N/A"}
          />
        </DataTable>
      </div>
    </>
  );
}

export default App;
