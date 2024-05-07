import React, { useState, useRef, useEffect, useContext } from "react";
import Mainlayout from "../layout/Mainlayout";
import {
  GroupUpdatemutation,
  useAllGroupbyId,
} from "../queries/authentication";
import { useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { useGetalluser } from "../queries/feed";
import { Button } from "primereact/button";
import { Chips, ChipsChangeEvent } from "primereact/chips";
import { ListBox } from "primereact/listbox";
import { InputText } from "primereact/inputtext";

interface Allnames {
  name: string;
  _id: string;
  roll: string;
}
interface QuizProps {}
const EditGroups: React.FC<QuizProps> = () => {
  const { data } = useGetalluser();
  const { id } = useParams();
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
  const {
    data: groupdata,
    isLoading,
    isPending,
    isSuccess,
  } = useAllGroupbyId(id);
  // console.log(data);

  const {
    mutate: GroupUpdate,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
  } = GroupUpdatemutation();
  // useEffect(() => {
  //   const sortedUniqueNum = Array.from(new Set(num)).sort(
  //     (a, b) => parseFloat(a) - parseFloat(b)
  //   );
  //   setNum(sortedUniqueNum);
  // }, [num]);
  console.log(groupdata);

  const [f, setF] = useState(0);
  useEffect(() => {
    if (groupdata?.data && f === 0) {
      const initialSelection =
        groupdata.data.users.map(
          (d: { roll: string; name: string; _id: string }) => ({
            name: d.roll + " " + d.name, // Adjust this according to your data structure
            _id: d._id,
            roll: d.roll,
          })
        ) || [];

      setSelectedNames(initialSelection);
    }
  }, [groupdata?.data]);
  useEffect(() => {
    if (groupdata?.data && f == 0) {
      setF(1);
      setTitle(groupdata.data.name);
      const temp = groupdata.data.users.map((d: { roll: string }) => d.roll);
      setNum(temp);
    }
  });
  useEffect(() => {
    if (isUpdateSuccess) {
      navigate("/allgroup");
    }
  });
  const submittodatabase = () => {
    if (isUpdatePending) return;
    GroupUpdate({
      users: selectedNames.map((d) => d._id),
      name: title,
      id: groupdata.data._id,
    });
  };
  return (
    <Mainlayout>
      {isLoading ? (
        <div className="quiz-container">Loading...</div>
      ) : (
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
      )}
      {/* } */}
    </Mainlayout>
  );
};
export default EditGroups;
