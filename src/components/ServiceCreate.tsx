import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Chips } from "primereact/chips";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ListBox } from "primereact/listbox";
import { Slider, SliderChangeEvent } from "primereact/slider";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import "../css/Servicecreate.css";
import Mainlayout from "../layout/Mainlayout";
import { useGetalluser } from "../queries/feed";
import { useCreateQuery } from "../queries/Servicecreate";
import { formFactory, yup } from "../utils/formFactory";
import FieldInfo from "./FieldInfo";

const ServiceCreate = () => {
  const [title, setTitle] = useState("");
  const [num, setNum] = useState<string[]>([]);
  const [selectedNames, setSelectedNames] = useState<Allnames[]>([]);
  const [description, setDescription] = useState("");
  const [value1, setValue1] = useState<number>(50);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [switchValue, setSwitchValue] = useState(false);
  const [value3, setValue3] = useState<number>();
  const [extra, setExtra] = useState<string>("");
  const [lastCancellationDate, setlastCancellationDate] = useState<Date | null>(
    null
  );
  const [inputNumberValue, setInputNumberValue] = useState<number | null>(null);
  const [year, setyear] = useState<number | null>(null);
  const [Maxenroll, setMaxenroll] = useState<number | null>(null);
  const [Maxcanceluser, setMaxcanceluser] = useState<number | null>(null);

  const toast = useRef<Toast>(null);

  const {
    mutate: createService,
    // isSuccess: isUpdateSuccess,
    // isError: isUpdateerror,
  } = useCreateQuery();

  const accept = () => {
    // Createser();
  };

  const reject = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };
  const { data } = useGetalluser();
  const allUsers: Allnames[] =
    data?.data?.map((item: { roll: string; name: string; _id: string }) => ({
      roll: item.roll,
      name: item.roll + " " + item.name,
      _id: item._id,
    })) || [];

  const confirm1 = (event: { currentTarget: any }) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept,
      reject,
    });
  };

  interface Servicecreate {
    month: Number;
    year: Number;
    title: string;
    amount: Number;
    users: Array<string>;
    cancel_fee_percentage: Number;
    expiry_date: string;
    last_cancellation_date: string;
    is_cancellable: boolean;
    description: string;
    maxPaid_count: Number;
    maxCancelCount: Number;
  }

  interface Allnames {
    name: string;
    _id: string;
    roll: string;
  }

  const Createser = async (value: any) => {
    const serviceData: Servicecreate = {
      month: value.month || 0,
      year: value.year || 0,
      title: value.title,
      amount: value.amount || 0,
      maxCancelCount: value.max_enroll || 0,
      users: selectedNames.map((s) => s.roll),
      cancel_fee_percentage: value1,
      expiry_date: value.expiry || "",
      last_cancellation_date: value.lastCancellationDate || "",
      is_cancellable: switchValue || false,
      description: value.description,
      maxPaid_count: value.max_enroll || 0,
    };

    try {
      console.log(serviceData);

      createService(serviceData);
      toast.current?.show({
        severity: "success",
        summary: "Service Created",
        detail: "Service has been successfully created.",
        life: 3000,
      });
    } catch (error) {
      console.error("Error creating service:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to create service. Please try again later.",
        life: 3000,
      });
    }
  };

  const form = formFactory.useForm({
    defaultValues: { title: "", description: "" },
    onSubmit: async ({ value }) => {
      Createser(value);
    },
  });

  const updateusers = () => {
    let x1 = 0;
    let x2 = 0;
    let t = 0;
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
  return (
    <>
      <Mainlayout>
        <form
          className="form-style1"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="container_service">
            <h3 className="feee">Create Service</h3>
            <div className="field col-12 md:col-4">
              <span className="p-float-label">
                <form.Field
                  name="title"
                  validators={{
                    onChange: yup
                      .string()
                      .trim()
                      .required("Title field is required!")
                      .min(
                        3,
                        "Oops! prepaid service title seems a bit too short. It should be at least 3 characters long."
                      ),
                  }}
                  children={(field: any) => (
                    <>
                      <InputText
                        type="text"
                        id="title"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <label htmlFor="title">Title</label>
                      <FieldInfo field={field} />
                    </>
                  )}
                />
              </span>
            </div>
            <div
              className="field col-12 md:col-4"
              style={{ marginBottom: "8px" }}
            >
              <span className="p-float-label">
                <form.Field
                  name="description"
                  validators={{
                    onChange: yup
                      .string()
                      .trim()
                      .required("Description field is required!"),
                  }}
                  children={(field: any) => (
                    <>
                      <InputTextarea
                        style={{ width: "650px", height: "150px" }}
                        id="description"
                        rows={3}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      ></InputTextarea>
                      <label htmlFor="description">Description</label>
                      <FieldInfo field={field} />
                    </>
                  )}
                />
              </span>
            </div>
            <div className="flex gap-3 field col-12 md:col-4">
              <span className="p-float-label">
                <form.Field
                  name="expiry"
                  validators={{
                    onChange: yup
                      .string()
                      .trim()
                      .required("expiry field is required!"),
                  }}
                  children={(field: any) => (
                    <>
                      <Calendar
                        inputId="expiry"
                        value={field.state.value}
                        dateFormat="dd/mm/yy"
                        onChange={(e) => field.handleChange(e.target.value)}
                      ></Calendar>
                      <label htmlFor="expiry">Expiry at</label>
                      <FieldInfo field={field} />
                    </>
                  )}
                />
              </span>
              <span className="p-float-label">
                <form.Field
                  name="lastCancellationDate"
                  validators={{
                    onChange: yup
                      .string()
                      .trim()
                      .required("last date is required!"),
                  }}
                  children={(field: any) => (
                    <>
                      <Calendar
                        inputId="lastCancellationDate"
                        value={field.state.value}
                        dateFormat="dd/mm/yy"
                        onChange={(e) => field.handleChange(e.target.value)}
                      ></Calendar>
                      <label htmlFor="lastCancellationDate">Last date</label>
                      <FieldInfo field={field} />
                    </>
                  )}
                />
              </span>
            </div>
            <div className="flex gap-3 field col-12 md:col-4">
              <span className="p-float-label">
                <form.Field
                  name="month"
                  validators={{
                    onChange: yup
                      .string()
                      .trim()
                      .required("Month is required!"),
                  }}
                  children={(field: any) => (
                    <>
                      <InputNumber
                        id="month"
                        value={field.state.value}
                        onValueChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                        mode="decimal"
                        min={1}
                        max={12}
                        style={{ width: "180px" }}
                      ></InputNumber>
                      <label htmlFor="month">Month</label>
                      <FieldInfo field={field} />
                    </>
                  )}
                />
              </span>
              <span className="p-float-label">
                <form.Field
                  name="year"
                  validators={{
                    onChange: yup.string().trim().required("year is required!"),
                  }}
                  children={(field: any) => (
                    <>
                      <InputNumber
                        id="year"
                        value={field.state.value}
                        onValueChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                        mode="decimal"
                        style={{ width: "180px" }}
                      ></InputNumber>
                      <label htmlFor="year">year</label>
                      <FieldInfo field={field} />
                    </>
                  )}
                />
              </span>
            </div>
            <div style={{ marginTop: "40px" }}>
              <label htmlFor="question">Users Able to Attend</label>
              <InputText
                onChange={(e) => {
                  setExtra(e.target.value);
                  console.log(e);
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
                  setSelectedNames(abc);
                  console.log(selectedNames);
                }}
                separator=","
              />
            </div>
            <ListBox
              filter
              multiple
              value={selectedNames}
              onChange={(e) => {
                const uniqueValues = e.value.filter(
                  (v: any, i: any, a: any) =>
                    a.findIndex((t: any) => t.roll === v.roll) === i
                );
                setSelectedNames(uniqueValues);
                const curr = uniqueValues;
                const temp = curr.map((d: { roll: string }) => d.roll);
                setNum(temp);
              }}
              options={allUsers}
              optionLabel="name"
              className="w-full"
            />
            <div className="oene">
              <div className="flex gap-3 align-items-center field col-3">
                <h3 style={{ color: "#6C757D" }}>Cancellable</h3>
                <InputSwitch
                  checked={switchValue}
                  onChange={(e) => setSwitchValue(e.value ?? false)}
                />
              </div>
              {switchValue && (
                <div className="field col-12 md:col-4">
                  <span className="p-float-label">
                    <InputText
                      value={value1.toString()}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setValue1(parseFloat(e.target.value))
                      }
                      className="w-full"
                    />
                    <Slider
                      value={value1}
                      onChange={(e: SliderChangeEvent) =>
                        setValue1(e.value as number)
                      }
                      className="w-full"
                    />
                    <label htmlFor="cancel">Cancel Charge %</label>
                  </span>
                </div>
              )}
            </div>

            <div
              className="flex gap-6 field col-12"
              style={{ marginTop: "10px" }}
            >
              <span className="p-float-label">
                <form.Field
                  name="amount"
                  validators={{
                    onChange: yup
                      .string()
                      .trim()
                      .required("amount is required!"),
                  }}
                  children={(field: any) => (
                    <>
                      <InputNumber
                        inputId="amount"
                        value={inputNumberValue}
                        onValueChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                        mode="decimal"
                        style={{ width: "180px" }}
                      ></InputNumber>
                      <label htmlFor="amount">Amount</label>
                      <FieldInfo field={field} />
                    </>
                  )}
                />
              </span>

              <span className="p-float-label">
                <form.Field
                  name="max_enroll"
                  validators={{
                    onChange: yup
                      .string()
                      .trim()
                      .required("max_enroll is required!"),
                  }}
                  children={(field: any) => (
                    <>
                      <InputNumber
                        inputId="max_enroll"
                        value={inputNumberValue}
                        onValueChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                        mode="decimal"
                        style={{ width: "180px" }}
                      ></InputNumber>
                      <label htmlFor="max_enroll">max enroll</label>
                      <FieldInfo field={field} />
                    </>
                  )}
                />
              </span>

              <span className="p-float-label">
                <form.Field
                  name="Max_User_cancel"
                  validators={{
                    onChange: yup
                      .string()
                      .trim()
                      .required("Max_User_cancel is required!"),
                  }}
                  children={(field: any) => (
                    <>
                      <InputNumber
                        inputId="Max_User_cancel"
                        value={Maxcanceluser}
                        onValueChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                        mode="decimal"
                        style={{ width: "180px" }}
                      ></InputNumber>
                      <label htmlFor="Max_User_cancel">Max_User_cancel</label>
                      <FieldInfo field={field} />
                    </>
                  )}
                />
              </span>
            </div>
            <div className="field col-12 md:col-4">
              <Toast ref={toast} />
              <ConfirmPopup />
              <div className="flex gap-3" style={{ marginTop: "25px" }}>
                <Button
                  onClick={() => {
                    form.handleSubmit();
                  }}
                  // onClick={confirm1}
                  icon="pi pi-check"
                  label="Confirm"
                ></Button>
              </div>
            </div>
          </div>
        </form>
      </Mainlayout>
    </>
  );
};

export default ServiceCreate;
