import { useQueryClient } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Mainlayout from "../layout/Mainlayout";
import { DeleteGroup, useAllGroups } from "../queries/authentication";
import EmptyView from "./EmptyView";
import Loading from "./Loading";

interface groupdata {
  users: string[];
}
interface groupmain {
  name: string;
  _id: string;
}
const GroupItems: React.FC<{ group: groupmain }> = ({ group }) => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const {
    mutate: fetchdeleteGroup,
    isPending: isdeletePending,
    isSuccess: isdeleteSuccess,
    isError: isdeleteError,
  } = DeleteGroup();
  const confirm1 = async () => {
    setDialogVisible(true);
  };
  const reject = () => {};
  const queryClient = useQueryClient();
  useEffect(() => {
    if (isdeleteSuccess) {
      <Toast ref={toast} />;
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Quiz Deleted",
        life: 3000,
      });
      queryClient.invalidateQueries();
    }
    if (isdeleteError) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Quiz Not delete",
        life: 3000,
      });
    }
  }, [isdeleteSuccess, isdeleteError]);
  const toast = useRef<Toast>(null);
  const confirm2 = async () => {
    setDialogVisible(true);
    if (isdeletePending) return;
    <Toast ref={toast} />;
    fetchdeleteGroup({ id: group._id });
  };
  const navigate = useNavigate();
  const handleEdit = async () => {
    navigate(`/editgroup/${group._id}`);
  };
  return (
    <div key={group._id} className="quiz-containeraquizlist">
      <p className="quiz-titlealq">{group.name}</p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button onClick={handleEdit} style={{ margin: "18px" }}>
          EDIT
        </Button>
        <div className="card flex flex-wrap gap-2 justify-content-center">
          <Button
            style={{ margin: "15px" }}
            onClick={confirm1}
            label="DELETE"
            className="mr-2"
          ></Button>
        </div>
      </div>
      <ConfirmDialog
        key={group._id}
        visible={isDialogVisible}
        onHide={() => setDialogVisible(false)}
        message={`Are you sure you want to proceed?`}
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={confirm2}
        reject={reject}
      />
    </div>
  );
};
interface QuizProps {}
const AllGroups: React.FC<QuizProps> = () => {
  const {
    data: groupdata,
    isSuccess: isgroupSuccess,
    isError: isgroupError,
    isLoading,
  } = useAllGroups();

  //   console.log(groupdata);
  const toast = useRef<Toast>(null);

  // For Empty Data
  if (isgroupSuccess && groupdata?.data?.length === 0) {
    return (
      <Mainlayout>
        <EmptyView />
      </Mainlayout>
    );
  }

  // For Success
  return (
    <Mainlayout>
      <div>
        {isLoading && <Loading />}
        {isgroupSuccess && (
          <div>
            <Toast ref={toast} />
            {groupdata?.data.map((group: groupmain) => (
              <GroupItems
                key={group._id}
                group={group}
                // onDelete={async (id: string) => fetchdeleteGroup({ id })}
              />
            ))}
          </div>
        )}
        {isgroupError && <div>Error loading data</div>}
      </div>
    </Mainlayout>
  );
};

export default AllGroups;
