import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useMemo, useRef, useState } from "react";
import { useRefundservice, useTabledata } from "../queries/AllService";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import Loading from "./Loading";

export const CustomButtonComponent = ({ data }) => {
  const {
    mutate: refundservice,
    isSuccess: isUpdateSuccess,

    isError: isUpdateerror,
  } = useRefundservice();
  const [inputValue, setInputValue] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const handleClick = () => {
    console.log(data);
    const serviceId = data?._id;
    setShowPopup(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    setShowPopup(false);
  };
  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const confirm1 = async () => {
    try {
      console.log(data);
      const refundData = {
        _id: data._id,
        userId: data.userId,
        roll: data.roll,
        inputValue: inputValue,
      };
      await refundservice(refundData);
    } catch (error) {
      console.log(error);
    }

    // refundservice(data);

    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept,
      // reject
    });
  };

  return (
    <div>
      <Dialog
        header="Percentage %"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <input onChange={handleInputChange} type="text" />
        <Button
          style={{ marginTop: "13px" }}
          onClick={confirm1}
          icon="pi pi-check"
          label="Confirm"
        ></Button>
        <p className="m-0"></p>
      </Dialog>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        Click me
      </button>
    </div>
  );
};

function App({ sid }) {
  const { data, isLoading } = useTabledata({ id: sid });
  const [gridApi, setGridApi] = useState(null);

  const [colDefs, setColDefs] = useState([
    { field: "name" },
    { field: "roll" },
    { field: "paid_on" },
    { field: "Cancel",cellRenderer: CustomButtonComponent, flex: 1 },
  ]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onExportClick = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv();
    } else {
      console.error("Grid is not ready yet.");
    }
  };

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      floatingFilter: true,
      flex: 1,
    };
  }, []);

  const paginationPageSize = 10;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="ag-theme-alpine-dark" style={{ height: "80vh" }}>
      <button
        className="edit-button"
        style={{
          position: "relative",
          top: "-10px",
          left: "95%",
          fontWeight: "800",
        }}
        onClick={() => onExportClick()}
      >
        Export
      </button>
      <AgGridReact
        rowData={data}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        pagination={true}
        paginationPageSize={paginationPageSize}
        rowSelection="multiple"
      />
    </div>
  );
}

export default App;
