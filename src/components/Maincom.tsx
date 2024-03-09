import "../css/Maincom.css";
import Mainlayout from "../layout/Mainlayout";
import React, { useEffect, useRef, useState } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Mainfun } from "../queries/authentication";

const Maincom = () => {
  return (
    <>
      <Mainlayout>
        <div className="container">
          <h1>Welcome to the Frontend Team!</h1>
          <p>
            We're excited to have you on board. Let's create awesome user
            experiences together.
          </p>
        </div>
      </Mainlayout>
    </>
  );
};

export default Maincom;
