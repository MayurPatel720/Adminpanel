import Mainlayout from "../layout/Mainlayout";
import "../css/Feed.css";
import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";

export default function FloatLabelDemo() {
  const [value1, setValue1] = useState<string>("");
  const [value10, setValue10] = useState<string>("");
  const [value12, setValue12] = useState<string>("");
  const [value5, setValue5] = useState<any>(null);
  const level = [{ name: "level 1" }, { name: "level 2" }, { name: "level 3" }];
  const toast = useRef<Toast | null>(null);

  const onUpload = () => {
    toast.current?.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
      life: 3000,
    });
  };

  return (
    <>
      <Mainlayout>
        <div className="feed_container">
          <h3 className="feee">Creation of Feed</h3>
          <div className="field col-12 md:col-4">
            <span className="p-float-label">
              <InputText
                type="text"
                id="title"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
              />
              <label htmlFor="title">Title</label>
            </span>
          </div>
          <div
            className="field col-12 md:col-4"
            style={{ marginBottom: "8px" }}
          >
            <span className="p-float-label">
              <InputTextarea
                style={{ width: "650px", height: "150px" }}
                id="description"
                rows={3}
                value={value12}
                onChange={(e) => setValue12(e.target.value)}
              ></InputTextarea>
              <label htmlFor="description">Description</label>
            </span>
          </div>
          <div className="field col-12 md:col-4">
            <span className="p-float-label">
              <Dropdown
                id="dropdown"
                options={level}
                value={value10}
                onChange={(e) => setValue10(e.value)}
                optionLabel="name"
              ></Dropdown>
              <label htmlFor="dropdown">Dropdown</label>
            </span>
          </div>
          <div className="field col-12 md:col-4">
            <span className="p-float-label">
              <Calendar
                inputId="expiry"
                value={value5}
                onChange={(e) => setValue5(e.value ?? "")}
              ></Calendar>
              <label htmlFor="expiry">Expiry at</label>
            </span>
          </div>
          <div className="grid">
            <Toast ref={toast}></Toast>
            <div className="col-12">
              <div className="feed_card">
                <FileUpload
                  name="demo[]"
                  url="/api/upload"
                  onUpload={onUpload}
                  multiple
                  accept="image/*"
                  maxFileSize={1000000}
                />
              </div>
            </div>
          </div>

          {/* <div className="mobile-preview">
        <h3>Mobile Preview</h3>
        <div className="preview-title">{value1}</div>
        <div className="preview-description">{value12}</div>
        {/* You can add a preview for uploaded photos here */}
          {/* </div> */}
        </div>
      </Mainlayout>
    </>
  );
}
