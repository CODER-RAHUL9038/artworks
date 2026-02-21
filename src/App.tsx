import "./App.css";
import { useEffect, useState } from "react";
import type { Artwork } from "./type";
import { fetchArtworks } from "./api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { DataTablePageEvent } from "primereact/datatable";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";

function App() {
  const [data, setData] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const overlayRef = useRef<OverlayPanel>(null);
  const [selectCount, setSelectCount] = useState("");

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

  const handleRowToggle = (id: number) => {
    setSelectedIds((prev) => {
      const updated = new Set(prev);

      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }

      console.log("Updated Set:", updated);
      return updated;
    });
  };
  const handleSelectAll = () => {
    setSelectedIds((prev) => {
      const updated = new Set(prev);
      const allSelected =
        data.length > 0 && data.every((row) => updated.has(row.id));
      if (allSelected) {
        data.forEach((row) => updated.delete(row.id));
      } else {
        data.forEach((row) => updated.add(row.id));
      }
      return updated;
    });
  };

  const handleCustomSelect = () => {
    const count = parseInt(selectCount);
    if (!count || count <= 0) {
      alert("Enter valid number");
    }
    setSelectedIds((prev) => {
      const updated = new Set(prev);
      const pageInfo = data.map((row) => row.id);
      for (let i = 0; i < Math.min(count, pageInfo.length); i++) {
        updated.add(pageInfo[i]);
      }
      return updated;
    });
    overlayRef.current?.hide();
    setSelectCount("");
  };

  return (
    <>
      <div className="container">
        {/* <p>Selected : {selectedIds.size} rows</p> */}
        <div className="all-select">
          {selectedIds.size > 0 && (
            <span>
              Selected: <strong>{selectedIds.size}</strong> rows
            </span>
          )}
        </div>
        <DataTable
          value={data}
          loading={loading}
          paginator
          key={selectedIds.size}
          paginatorTemplate="CurrentPageReport  PrevPageLink PageLinks NextPageLink "
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          rows={rowPerPage}
          first={(currentPage - 1) * rowPerPage}
          onPage={onPageChange}
          totalRecords={totalRecords}
          lazy
        >
          <Column
            headerStyle={{ width: "6rem" }}
            header={() => {
              const allSelected =
                data.length > 0 && data.every((row) => selectedIds.has(row.id));
              return (
                <div className="checkbox">
                  {/* Selects All checkbox */}
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={allSelected}
                    aria-label={`Select all artwork `}
                  />
                  {/* Dropdown Icon */}

                  <i
                    className="pi pi-chevron-down"
                    onClick={(e) => overlayRef.current?.toggle(e)}
                  />
                </div>
              );
            }}
            body={(row: Artwork) => (
              <div className="checkbox">
                <input
                  aria-label={`Select artwork ${row.id}`}
                  type="checkbox"
                  checked={selectedIds.has(row.id)}
                  onChange={() => handleRowToggle(row.id)}
                />
              </div>
            )}
          />

          <Column header="TITLE" field="title" />
          <Column
            header="PlACE OF ORIGIN"
            body={(row: Artwork) => row.place_of_origin ?? "N/A"}
          />

          <Column
            header="ARTIST"
            body={(row: Artwork) => row.artist_display ?? "N/A"}
          />

          <Column
            header="INSCRIPTIONS"
            body={(row: Artwork) => row.inscriptions ?? "N/A"}
          />

          <Column
            header="START DATE"
            body={(row: Artwork) => row.date_start ?? "N/A"}
          />

          <Column
            header="END DATE"
            body={(row: Artwork) => row.date_end ?? "N/A"}
          />
        </DataTable>
        <OverlayPanel ref={overlayRef}>
          <div className="overlay">
            <h4>Select Multiple Rows</h4>
            <label htmlFor="select-multiple-row">
              Enter number of row to select across all pages
            </label>
            <br />

            <input
              id="select-multiple-row"
              value={selectCount}
              placeholder="e.g : 10"
              type="number"
              onChange={(e) => setSelectCount(e.target.value)}
            />
            <span>
              <button onClick={handleCustomSelect} type="button">
                Select
              </button>
            </span>
          </div>
        </OverlayPanel>
      </div>
    </>
  );
}

export default App;
