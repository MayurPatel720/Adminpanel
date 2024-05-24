import { useQueryClient } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import "../css/Allquiz.css";
import Mainlayout from "../layout/Mainlayout";
import QuizAttendendUser from "../components/QuizAttendendUser";
import { DeleteQuiz, useAllQuiz } from "../queries/authentication";
import EmptyView from "./EmptyView";
import Loading from "./Loading";
import { Sidebar } from "primereact/sidebar";

interface QuizData {
  _id: string;
  title: string;
}

const QuizItem: React.FC<{ quiz: QuizData; onDelete: Function }> = ({
  quiz,
  onDelete,
}) => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();

 const handlevisible = ()=>{
    setVisible(true);
    console.log(quiz._id);
 }


  const handleEdit = async () => {
    navigate(`/editquiz/${quiz._id}`);
  };
  const reject = () => {};
  const confirm1 = async () => {
    setDialogVisible(true);
  };
  const confirm2 = async () => {
    setDialogVisible(true);
    onDelete(quiz._id);
  };
  return (  
    <div key={quiz._id} className="quiz-containeraquizlist">
      <p className="quiz-titlealq">{quiz.title}</p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
          <QuizAttendendUser id={quiz._id} />
        </Sidebar>
        <Button onClick={handlevisible} style={{ margin: "18px",marginRight:"0"}}>
          USERS
        </Button>
        <Button onClick={handleEdit} style={{ margin: "18px",marginRight:"0" }}>
          EDIT
        </Button>
        <div className="card flex flex-wrap justify-content-center">
          <Button
            style={{ margin: "15px",marginLeft:"0"}}
            onClick={confirm1}
            label="DELETE"
            className="mr-2"
          ></Button>
        </div>
      </div>
      <ConfirmDialog
        key={quiz._id}
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

const AllQuiz = () => {
  const {
    data: quizdata,
    isSuccess: isquizsuccess,
    isError: isquizerror,
    isLoading,
  } = useAllQuiz();
  const {
    mutateAsync: fetchdeleteQuiz,
    isPending: isdeletePending,
    isSuccess: isdeleteSuccess,
    isError: isdeleteError,
    status,
  } = DeleteQuiz();
  const queryClient = useQueryClient();
  const toast = useRef<Toast>(null);
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

  return (
    <Mainlayout>
      <Toast ref={toast} />
      <div>
        {isLoading && <Loading />}
        {isquizsuccess && quizdata.data?.length === 0 ? (
          <EmptyView message="No Quizes Created Yet!" />
        ) : (
          <div>
            <Toast ref={toast} />
            {quizdata?.data.map((quiz: QuizData) => (
              <QuizItem
                key={quiz._id}
                quiz={quiz}
                onDelete={async (id: string) => fetchdeleteQuiz({ id })}
              />
            ))}
          </div>
        )}
        {isquizerror && <div>Error loading data</div>}
      </div>
    </Mainlayout>
  );
};

export default AllQuiz;
function onDelete(_id: string) {
  throw new Error("Function not implemented.");
}
