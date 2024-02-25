import { Button } from "primereact/button";
import Mainlayout from "../layout/Mainlayout";
import { InputText } from "primereact/inputtext";
import "../css/deletefeed.css";

const dee = () => {
  console.log("delete");
};

const DeleteFeed = () => {
  return (
    <>
      <Mainlayout>
        <div className="Deletefeed_container">
          <h3 className="feee">Deletion of Feed</h3>
          <div className="p-inputgroup flex-1">
            <InputText placeholder="Vote" />
            <Button
              onClick={dee}
              icon="pi pi-times"
              className="p-button-danger"
            />
          </div>
        </div>
      </Mainlayout>
    </>
  );
};

export default DeleteFeed;
