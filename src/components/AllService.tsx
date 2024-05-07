import Mainlayout from "../layout/Mainlayout";
import "../css/AllService.css";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Button } from "primereact/button";
import {
  useServiceQuery,
  useUpdateServiceMutation,
} from "../queries/AllService";
import { Sidebar } from "primereact/sidebar";
import { useRef, useState } from "react";
import Agtable from "./Agtable";
import { InputSwitch } from "primereact/inputswitch";
import { Chips } from "primereact/chips";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputText } from "primereact/inputtext";

interface Service {
  _id: string;
  title: string;
  description: string;
  month: Number | null;
  year: Number | null;
  users: Array<string>;
  cancel_fee_percentage: Number | null;
  expiry_date: string;
  last_cancellation_date: string;
  is_cancellable: boolean;
  maxPaid_count: Number | null;
  maxCancelCount: Number | null;
}

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const nextYear = new Date().getFullYear() + 1;
const years = Array.from(
  { length: nextYear + 1 - 2001 },
  (_, index) => index + 2001
);

const AllService = () => {
  const {
    mutate: updateservice,
    isSuccess: isUpdateSuccess,
    isError: isUpdateerror,
  } = useUpdateServiceMutation();

  const toast = useRef<Toast>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleRight, setVisibleRight] = useState<boolean>(false);
  const [editedService, setEditedService] = useState<Service | null>(null);
  const [checkeda, setCheckeda] = useState<boolean>(
    editedService?.is_cancellable || true
  );
  const { data, isPending, isError, error } = useServiceQuery();

  const [num, setNum] = useState<string[]>([]);
  const [selectedNames, setSelectedNames] = useState<Allnames[]>([]);
  const [extra, setExtra] = useState<string>("");
  interface Allnames {
    name: string;
    _id: string;
    roll: string;
  }
  const allUsers: Allnames[] =
    data?.data?.map((item: { roll: string; name: string; _id: string }) => ({
      roll: item.roll,
      name: item.roll + " " + item.name,
      _id: item._id,
    })) || [];

  const updateusers = () => {
    let x1 = 0;
    let x2 = 0;
    let i = 0;
    while (i < extra.length) {
      if (extra[i] > "9" && extra[i] < "0" && extra[i] != "-") {
        setExtra("");
        return;
      }
      i++;
    }
    i = 0;
    while (i < extra.length) {
      if (extra[i] <= "9" && extra[i] >= "0") {
        let t = parseInt(extra[i]);
        // console.log("t", t);

        x1 = x1 * 10 + t;
      } else {
        i++;
        break;
      }
      i++;
    }
    while (i < extra.length) {
      if (extra[i] <= "9" && extra[i] >= "0") {
        let t = parseInt(extra[i]);
        x2 = x2 * 10 + t;
      } else {
        i++;
        break;
      }
      i++;
    }

    for (let i = x1; i <= x2; i++) {
      setNum((prev) => [...prev, i.toString()]);
    }
  };

  const handleEdit = (service: Service) => {
    console.log(service._id);
    setEditedService({
      ...editedService!,
      _id: service._id,
    });
    setEditedService(service);
    setVisibleRight(true);
  };
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const handleuser = (id: string) => {
    setVisible(true);
    setSelectedServiceId(id);
  };

  const handleSave = async () => {
    const Servicedata: Service = {
      _id: editedService?._id || "",
      month: editedService?.month || null,
      year: editedService?.year || null,
      title: editedService?.title || "",
      description: editedService?.description || "",
      users: editedService?.users || [],
      cancel_fee_percentage: editedService?.cancel_fee_percentage || null,
      expiry_date: editedService?.expiry_date || "",
      last_cancellation_date: editedService?.last_cancellation_date || "",
      is_cancellable: editedService?.is_cancellable || false,
      maxPaid_count: editedService?.maxPaid_count || null,
      maxCancelCount: editedService?.maxCancelCount || null,
    };

    console.log(Servicedata);
    try {
      await updateservice(Servicedata);
      if (isUpdateSuccess) showSuccess();
      setVisibleRight(false);
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };
  // const showSuccess = (event: React.MouseEvent<HTMLButtonElement>, ref: React.RefObject<Toast>, severity: ToastMessage['severity']) => {
  //   const target = event.target as HTMLButtonElement;
  //   const label = target.innerText;

  //   ref.current?.show({ severity: severity, summary: label, detail: label, life: 3000 });
  // };

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Message Content",
      life: 3000,
    });
  };

  if (isPending) {
    return (
      <div className="loa">
        <div className="loader">
          <ProgressSpinner />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <Mainlayout>
      {isPending && (
        <div className="loa">
          <div className="loader">
            <ProgressSpinner />
          </div>
        </div>
      )}
      {isUpdateerror && (
        <div className="ia">
          <img
            style={{ width: "90%" }}
            src="https://motionarray.imgix.net/preview-1495654-q6kPWs8bbUiplaHn-large.jpg?w=660&q=60&fit=max&auto=Q"
            alt="Error"
          />
        </div>
      )}
      <div className="allservicecontainer">
        <h2 style={{ color: "black" }}>All Service</h2>

        {data.data.map((service: Service, index: number) => (
          <div className="feed-item">
            <div className="start_feed">
              <span className="allfeedno" style={{ marginRight: "20px" }}>
                {index + 1}.
              </span>
            </div>
            <div className="middle_feed">
              <div>
                <h3 className="h3feed">{service.title}</h3>
                <h5 className="des">{service.description}</h5>
              </div>
            </div>
            <div className="third_feed">
              <div className="card flex justify-content-center">
                <Sidebar
                  visible={visible}
                  onHide={() => setVisible(false)}
                  fullScreen
                >
                  <h2 style={{ marginTop: "0px" }}>
                    All Haribhakto {selectedServiceId}
                  </h2>
                  <Agtable sid={selectedServiceId} />
                </Sidebar>
                <Button
                  icon="pi pi-users"
                  onClick={() => handleuser(service._id)}
                />
                <button
                  style={{ marginLeft: "15px" }}
                  onClick={() => handleEdit(service)}
                  className="edit-button"
                >
                  Edit
                </button>
              </div>
              <ConfirmPopup />
            </div>
          </div>
        ))}
        <Sidebar
          style={{ width: "35%" }}
          visible={visibleRight}
          position="right"
          onHide={() => setVisibleRight(false)}
        >
          <h2>Updating Fields</h2>
          <div className="sideaa">
            <input
              type="text"
              value={editedService?.title}
              onChange={(e) =>
                setEditedService({
                  ...editedService!,
                  title: e.target.value,
                })
              }
            />
            <textarea
              value={editedService?.description}
              onChange={(e) =>
                setEditedService({
                  ...editedService!,
                  description: e.target.value,
                })
              }
            />
            <select>
              {months.map((item, index) => (
                <option
                  key={index}
                  value={item}
                  selected={editedService?.month == item}
                >
                  {item}
                </option>
              ))}
            </select>
            <select>
              {years.map((item, index) => (
                <option
                  key={index}
                  value={item}
                  selected={editedService?.year == item}
                >
                  {item}
                </option>
              ))}
            </select>
            <InputText
              onChange={(e) => {
                setExtra(e.target.value);
              }}
            />

            <button onClick={() => updateusers()}>press</button>
            <Chips
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              value={num}
              onChange={(e) => {
                setNum(e.value ? e.value : []);
                const curr = e.value;
                const abc: Allnames[] = [];
                curr?.map((d) => {
                  for (let i = 0; i < allUsers.length; i++) {
                    if (allUsers[i].roll === d) {
                      abc.push({
                        name: allUsers[i].name,
                        _id: allUsers[i]._id,
                        roll: allUsers[i].roll,
                      } as Allnames);
                    }
                  }
                });
                setEditedService({
                  ...editedService!,
                  users: e.value ?? [],
                });
                setSelectedNames(abc);
                console.log(editedService);
              }}
              separator=","
            />
            <Chips
              value={editedService?.users ?? []}
              onChange={(e) =>
                setEditedService({
                  ...editedService!,
                  users: e.value ?? [],
                })
              }
            />

            <input
              type="date"
              value={
                editedService?.expiry_date
                  ? new Date(editedService.expiry_date)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setEditedService({
                  ...editedService!,
                  expiry_date: e.target.value,
                })
              }
            />
            <input
              type="date"
              value={
                editedService?.last_cancellation_date
                  ? new Date(editedService.last_cancellation_date)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setEditedService({
                  ...editedService!,
                  last_cancellation_date: e.target.value,
                })
              }
            />
            <span className="flex align-items-center gap-4">
              <h3 style={{ marginLeft: "5px" }}>Cancel</h3>
              <InputSwitch
                onChange={(e) => {
                  console.log(editedService);
                  setEditedService({
                    ...editedService!,
                    is_cancellable: !editedService?.is_cancellable,
                  });
                  setCheckeda(!checkeda);
                }}
                checked={checkeda}
              />
            </span>
            <input
              type="number"
              value={
                editedService?.cancel_fee_percentage !== undefined
                  ? editedService.cancel_fee_percentage?.toString()
                  : ""
              }
              onChange={(e) =>
                setEditedService({
                  ...editedService!,
                  cancel_fee_percentage:
                    e.target.value !== "" ? parseInt(e.target.value) : null,
                })
              }
            />
            <input
              type="number"
              value={
                editedService?.maxPaid_count !== undefined
                  ? editedService.maxPaid_count?.toString()
                  : ""
              }
              onChange={(e) =>
                setEditedService({
                  ...editedService!,
                  maxPaid_count:
                    e.target.value !== "" ? parseInt(e.target.value) : null,
                })
              }
            />
            <input
              type="number"
              value={
                editedService?.maxCancelCount !== undefined
                  ? editedService.maxCancelCount?.toString()
                  : ""
              }
              onChange={(e) =>
                setEditedService({
                  ...editedService!,
                  maxCancelCount:
                    e.target.value !== "" ? parseInt(e.target.value) : null,
                })
              }
            />
          </div>

          <Button
            style={{ marginTop: "25px" }}
            label="Update"
            onClick={handleSave}
          />
        </Sidebar>

        <Toast ref={toast} />
      </div>
    </Mainlayout>
  );
};

export default AllService;
