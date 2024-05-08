import { Button } from "primereact/button";
import { Chips, ChipsChangeEvent } from "primereact/chips";
import { InputText } from "primereact/inputtext";
import { ListBox } from "primereact/listbox";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import { Groupaddmutation } from "../queries/authentication";
import { useGetalluser } from "../queries/feed";

interface QuizProps {}
interface Allnames {
  name: string;
  _id: string;
  roll: string;
}
const Group: React.FC<QuizProps> = () => {
  const { data } = useGetalluser();
  const [num, setNum] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const toast = useRef<Toast | null>(null);
  const [selectedNames, setSelectedNames] = useState<Allnames[]>([]);
  const allUsers: Allnames[] =
    data?.data?.map((item: { name: string; _id: string; roll: string }) => ({
      name: item.roll + " " + item.name,
      _id: item._id,
      roll: item.roll,
    })) || [];
  const navigate = useNavigate();
  const { mutate: Groupadd, isPending, isSuccess } = Groupaddmutation();
  // useEffect(() => {
  //   const sortedUniqueNum = Array.from(new Set(num)).sort(
  //     (a, b) => parseFloat(a) - parseFloat(b)
  //   );
  //   setNum(sortedUniqueNum);
  // }, [num]);
  useEffect(() => {
    if (isSuccess) {
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Group Added Successfully",
        life: 3000,
      });
      navigate("/allgroup");
    }
  }, [isSuccess]);
  const submittodatabase = () => {
    if (isPending) return;
    Groupadd({
      users: selectedNames.map((d) => d._id),
      name: title,
    });
  };

  return (
    <Mainlayout>
      <div className="feed_container">
        <h3>Create Group</h3>
        <div>
          <div>
            <div>
              <label htmlFor="title">Name</label>
              <InputText
                type="text"
                style={{ marginRight: "100px", height: "43px" }}
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div style={{ marginTop: "40px" }}>
            <label htmlFor="question">Users Able to Attend Quiz</label>
            <Chips
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
                width: "100%",
              }}
              value={num}
              onChange={(e: ChipsChangeEvent) => {
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
              }}
              separator=","
            />
          </div>
          <div
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "column",
              marginTop: "40px",
            }}
            // className="field col-12 md:col-4"
            // className="card p-fluid"
          >
            <ListBox
              filter
              multiple
              value={selectedNames}
              onChange={(e) => {
                setSelectedNames(e.value);
                const curr = e.value;
                const temp = curr.map((d: { roll: string }) => d.roll);
                setNum(temp);
              }}
              options={allUsers}
              optionLabel="name"
              className="w-full"
            />
            <Toast ref={toast} />
            <Button
              style={{
                marginTop: "40px",
              }}
              onClick={submittodatabase}
              label="Confirm"
            ></Button>
          </div>
        </div>
      </div>
    </Mainlayout>
  );
};

export default Group;
