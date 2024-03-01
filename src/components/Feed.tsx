import Mainlayout from "../layout/Mainlayout";
import "../css/Feed.css";
import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { FeedParams, useCreateFeedQuery, useGetalluser } from "../queries/feed";
import { ListBox } from "primereact/listbox";


export default function FloatLabelDemo() {
  const {
    mutate: createFeed,
    isPending: isFeedCreatePending,
    isSuccess,
    isError,
  } = useCreateFeedQuery();
  const toast = useRef<Toast | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const { data } = useGetalluser();
  const [files, setFiles] = useState<any>(null);

  const level = [
    { option: "Purple", value: "p" },
    { option: "Saffron", value: "s" },
    { option: "Marron", value: "m" },
  ];

  const confirm = (event: React.MouseEvent<HTMLButtonElement>) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        const feedParams: FeedParams = {
          title: title,
          description: description,
          expires_at: expiresAt ? expiresAt.toISOString() : "",
          level: selectedLevel,
          users: selectedNames.map((city) => city._id),
          FeedImgVi: files,
        };
        createFeed(feedParams);
      },
    });
  };

  useEffect(()=>{
    if (isSuccess) {
      toast.current?.show({
        severity: "info",
        summary: "Confirmed",
        detail: "Feed Posted",
        life: 3000,
      });
    }
    if (isError) {
      toast.current?.show({
        severity: "error",
        summary: "Rejected",
        detail: "Feed Not Posted",
        life: 3000,
      });
    }
  },[isSuccess,isError]);

  const onUpload = () => {
    toast.current?.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
      life: 3000,
    });
  };

  const cities: City[] =
    data?.data?.map((item: { name: string; _id: string }) => ({
      name: item.name,
      _id: item._id,
      // roll: item.roll,
    })) || [];

  interface City {
    name: string;
    _id: string;
    // roll:string;
  }

  const [selectedNames, setSelectedNames] = useState<City[]>([]);
  return (
    <Mainlayout>
      {/* {JSON.stringify()} */}
      <div className="feed_container">
        <h3 className="feee">Creation of Feed</h3>
        <div className="field col-12 md:col-4">
          <span className="p-float-label">
            <InputText
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="title">Title</label>
          </span>
        </div>
        <div className="field col-12 md:col-4" style={{ marginBottom: "8px" }}>
          <span className="p-float-label">
            <InputTextarea
              style={{ width: "650px", height: "150px" }}
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></InputTextarea>
            <label htmlFor="description">Description</label>
          </span>
        </div>
        <div className="field col-12 md:col-4">
          <span className="p-float-label">
            <Dropdown
              id="dropdown"
              options={level}
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.value)}
              optionLabel="option"
            ></Dropdown>
            <label htmlFor="dropdown">Dropdown</label>
          </span>
        </div>
        <div className="field col-12 md:col-4">
          <ListBox
            filter
            multiple
            value={selectedNames}
            onChange={(e) => setSelectedNames(e.value)}
            options={cities}
            optionLabel="name"
            className="w-full"
          />
        </div>
        <div className="field col-12 md:col-4">
          <span className="p-float-label">
            <Calendar
              inputId="expiry"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.value as Date)}
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
                url="api/svfsdv"
                onUpload={onUpload}
                multiple
                accept="image/*"
                maxFileSize={1000000}
                onSelect={(e) => {
                  setFiles(e.files);
                }}
              />
            </div>
          </div>
          <div className="confirm_card">
            <ConfirmPopup />
            <Toast ref={toast} />
            <Button
              onClick={confirm}
              icon="pi pi-check"
              label="Confirm"
              disabled={isFeedCreatePending}
            ></Button>
          </div>
        </div>
      </div>
    </Mainlayout>
  );
}
