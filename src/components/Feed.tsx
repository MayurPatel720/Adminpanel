import Mainlayout from "../layout/Mainlayout";
import "../css/Feed.css";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
export default function FloatLabelDemo() {
  const [value, setValue] = useState<string>("");
  const [textvalue, settextValue] = useState<string>("");

  return (
    <>
      <Mainlayout>
        <div className="Feed_container">
          <div className="card flex ">
            <span className="p-float">
              <label htmlFor="title">Title</label>
              <InputText
                id="title"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </span>
          </div>
          <div className="motoarea">
            <label htmlFor="description">description</label>
            <InputTextarea
              id="description"
              value={textvalue}
              onChange={(e) => settextValue(e.target.value)}
              rows={5}
              cols={30}
            />
          </div>
        </div>
      </Mainlayout>
    </>
  );
}
