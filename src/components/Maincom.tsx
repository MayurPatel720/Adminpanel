import "../css/Maincom.css";
import Mainlayout from "../layout/Mainlayout";
import React, { useEffect, useRef, useState } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Mainfun } from "../queries/authentication";

const Maincom = () => {
  const toast = useRef<Toast>(null);
  const [isDialogVisible, setDialogVisible] = useState(false); // State to manage dialog visibility
  const {
    mutateAsync: showall,
    isPending: ismainpending,
    isSuccess: ismainsuccess,
    isError: ismainerror,
  } = Mainfun();
  useEffect(() => {
    console.log(ismainsuccess, "in main success");
    if (ismainsuccess) {
      toast.current?.show({
        severity: "info",
        summary: "Confirmed",
        detail: "Quiz deleted",
        life: 3000,
      });
    }
  }, [ismainsuccess]);
  const accept = async () => {
    // console.log("done");
    await showall({ id: "abc" });
    // console.log(ismainsuccess);
    // console.log(ismainpending);

    setDialogVisible(false); // Hide the dialog after accepting
  };

  const reject = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });

    setDialogVisible(false); // Hide the dialog after rejecting
  };

  const confirm1 = () => {
    setDialogVisible(true); // Show the dialog when the button is clicked
  };

  const numbers = [0, 1, 2, 3];

  return (
    <>
      <Mainlayout>
        <div className="container">
          <h1>Welcome to the Frontend Team!</h1>
          <p>
            We're excited to have you on board. Let's create awesome user
            experiences together.
          </p>
          <Toast ref={toast} />

          {numbers.map((i) => (
            <div key={i}>
              {i}
              <ConfirmDialog
                key={i}
                visible={isDialogVisible}
                onHide={() => setDialogVisible(false)}
                message="Are you sure you want to proceed?"
                header="Confirmation"
                icon="pi pi-exclamation-triangle"
                accept={accept}
                reject={reject}
              />
              <div className="card flex flex-wrap gap-2 justify-content-center">
                <Button
                  onClick={confirm1}
                  label="Confirm"
                  className="mr-2"
                ></Button>
              </div>
            </div>
          ))}
        </div>
      </Mainlayout>
    </>
  );
};

export default Maincom;
