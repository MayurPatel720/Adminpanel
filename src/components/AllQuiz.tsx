// AllQuiz.tsx
import React, { useEffect, useRef, useState } from "react";
import Mainlayout from "../layout/Mainlayout";
import { DeleteQuiz, useAllQuiz } from "../queries/authentication";
import "../css/Allquiz.css";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

interface QuizProps {}

interface QuizData {
  _id: string;
  title: string;
}

const QuizItem: React.FC<{ quiz: QuizData }> = ({ quiz }) => {
  const toast = useRef<Toast>(null);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const navigate = useNavigate();
  const {
    mutateAsync: fetchdeleteQuiz,
    isPending: isdeletePending,
    isSuccess: isdeleteSuccess,
    isError: isdeleteError,
    status,
  } = DeleteQuiz();
  const queryClient = useQueryClient();
  const handleEdit = async () => {
    navigate(`/editquiz/${quiz._id}`);
  };
  const handleDelete = async () => {
    if (isdeletePending) return;
    await fetchdeleteQuiz({
      id: quiz._id,
    });
  };
  const Deletesuccessfully = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Message Content",
      life: 3000,
    });
  };
  useEffect(() => {
    console.log(isdeleteSuccess, "isDeletreSucces", toast.current);
    // <Toast ref={toast} />;

    if (isdeleteSuccess) {
      console.log("inside toast", toast.current ? "abc" : "bcd");
      // <Toast ref={toast} />;
      Deletesuccessfully();
      console.log("runnnnnnnnnn");
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

  const accept = async () => {
    if (isdeletePending) return;
    await fetchdeleteQuiz({
      id: quiz._id,
    });
    queryClient.invalidateQueries();
    // console.log(isdeleteSuccess);
    // console.log(status);

    if (isdeleteSuccess) {
      console.log("delete");
      toast.current?.show({
        severity: "info",
        summary: "Confirmed",
        detail: "Quiz deleted",
        life: 3000,
      });
    }
    if (isdeleteError) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Quiz Not delete",
        life: 3000,
      });
    }
  };
  const reject = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };
  const confirm1 = () => {
    setDialogVisible(true);
    Deletesuccessfully();
  };
  return (
    <div key={quiz._id} className="quiz-containeralq">
      <p className="quiz-titlealq">{quiz.title}</p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button onClick={handleEdit} style={{ margin: "18px" }}>
          EDIT
        </Button>
        <Toast ref={toast} />
        <div className="card flex flex-wrap gap-2 justify-content-center">
          <Button
            style={{ margin: "15px" }}
            onClick={confirm1}
            label="DELETE"
            className="mr-2"
          ></Button>
        </div>
      </div>
      <Toast ref={toast} />
      <ConfirmDialog
        key={quiz._id}
        visible={isDialogVisible}
        onHide={() => setDialogVisible(false)}
        message={`Are you sure you want to proceed? ${quiz._id} ${quiz.title}`}
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        reject={reject}
      />
    </div>
  );
};

const AllQuiz: React.FC<QuizProps> = () => {
  const {
    data: quizdata,
    isSuccess: isquizsuccess,
    isError: isquizerror,
    isLoading,
  } = useAllQuiz();

  return (
    <Mainlayout>
      <div className="quiz-container">
        {isLoading && <div>Loading...</div>}
        {isquizsuccess && (
          <div>
            {quizdata?.data.map((quiz: QuizData) => (
              <QuizItem key={quiz._id} quiz={quiz} />
            ))}
          </div>
        )}
        {isquizerror && <div>Error loading data</div>}
      </div>
    </Mainlayout>
  );
};

export default AllQuiz;
