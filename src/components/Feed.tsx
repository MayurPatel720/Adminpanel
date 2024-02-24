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
import { FeedParams, useCreateFeedQuery } from "../queries/feed";

export default function FloatLabelDemo() {
  const {
    mutate: createFeed,
    isPending: isFeedCreatePending,
    isSuccess: isFeedCreateSuccess,
  } = useCreateFeedQuery();

  const accept = () => {
    toast.current?.show({
      severity: "info",
      summary: "Confirmed",
      detail: "Feed Posted",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current?.show({
      severity: "error",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<{
    option: "";
    value: "";
  }>({
    option: "",
    value: "",
  });
  const [expiresAt, setExpiresAt] = useState<any>(null);
  const level = [
    { name: "Purple", value: "p" },
    { name: "Saffrom", value: "s" },
    { name: "Marron", value: "m" },
  ];
  const toast = useRef<Toast | null>(null);
  const confirm = (event: React.MouseEvent<HTMLButtonElement>) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("expires_at", expiresAt);
        formData.append("level", selectedLevel.value);
        formData.append("users", JSON.stringify([])); // Convert to string if required

        // Create FeedParams object from FormData
        const feedParams: FeedParams = {
          title: formData.get("title") as string,
          description: formData.get("description") as string,
          expires_at: formData.get("expires_at") as string,
          level: formData.get("level") as string,
          users: JSON.parse(formData.get("users") as string) as string[],
        };

        createFeed(feedParams);
      },
      reject,
    });
  };

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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                optionLabel="name"
              ></Dropdown>
              <label htmlFor="dropdown">Dropdown</label>
            </span>
          </div>
          <div className="field col-12 md:col-4">
            <span className="p-float-label">
              <Calendar
                inputId="expiry"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.value ?? "")}
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
            <div className="confirm_card">
              <ConfirmPopup />
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
    </>
  );
}
