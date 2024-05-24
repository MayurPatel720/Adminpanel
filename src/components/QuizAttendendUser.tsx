import { AgGridReact } from "ag-grid-react";
import { useQuizTabledata } from "../queries/Quizuser";
import { useMemo, useState } from "react";

const QuizAttendendUser = ({ id }: { id: any }) => {
  const {
    data,
    isPending: likespending,
    error: likeserror,
    isError: likeer,
  } = useQuizTabledata({ quizid: id });

  const [colDefs, setColDefs] = useState([
    { field: "user_id.roll", headerName: "Roll No" },
    { field: "user_id.name", headerName: "Name" },
    { field: "marks", headerName: "Marks" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      floatingFilter: true,
      flex: 1,
    };
  }, []);

//   const onExportClick = () => {
//     if (gridApi) {
//       gridApi.exportDataAsCsv();
//     } else {
//       console.error("Grid is not ready yet.");
//     }
//   };

  return (
    <>
      <h2 style={{ marginLeft: "20px" }}>ATTENDED QUIZ USERS</h2>
      <div className="ag-theme-alpine-dark" style={{ height: "80vh" }}>
        <AgGridReact
          rowData={data}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          rowSelection="multiple"
        />
      </div>
    </>
  );
};

export default QuizAttendendUser;
