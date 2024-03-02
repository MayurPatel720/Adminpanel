import React, { useState, useRef, useEffect, useContext } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import "../css/quiz.css";
import Mainlayout from "../layout/Mainlayout";
import { useNavigate, useParams } from "react-router-dom";
import {
  AddQuiz,
  DeleteQuiz,
  useUpdateQuiz,
  useAllQuizbyId,
} from "../queries/authentication";
import { ToastContext, useToast } from "../App";
interface QuizProps {}
interface OptionItem {
  value: string;
  isAnswer: boolean;
}

interface QuestionItem {
  question: string;
  options: OptionItem[];
}

interface QuizData {
  questions: QuestionItem[];
}

const EditQuiz: React.FC<QuizProps> = () => {
  const { id } = useParams();
  const [all, setAll] = useState<
    { question: string; options: { value: string; isAnswer: boolean }[] }[]
  >([]);
  const [numQue, setNumque] = useState("");
  const [curr, setCurr] = useState(1);
  const [starttime, setStartTime] = useState<Date>();
  const [endtime, setEndTime] = useState<Date>();
  const [title, setTitle] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const toast = useToast();

  const navigate = useNavigate();
  const {
    mutateAsync: quizadd,
    isPending: isQuizPending,
    isSuccess: isQuizSuccess,
  } = AddQuiz();
  const {
    mutateAsync: updateQuizById,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
  } = useUpdateQuiz();
  const isToastShown = useRef(false);
  const {
    data: quizdata,
    isLoading,
    isPending,
    isSuccess,
  } = useAllQuizbyId(id);

  useEffect(() => {
    handleAddcontent();
  }, [quizdata]);

  const handleAddcontent = async () => {
    if (!quizdata || !quizdata.data.questions || isLoading) return;
    setTitle(quizdata.data.title);
    setEndTime(new Date(quizdata.data.start_time));
    setStartTime(new Date(quizdata.data.end_time));
    const newArray = (quizdata.data.questions as QuestionItem[]).map(
      (questionItem) => ({
        question: questionItem.question,
        options: questionItem.options.map((optionItem: OptionItem) => ({
          value: optionItem.value,
          isAnswer: optionItem.isAnswer,
        })),
      })
    );
    setAll(newArray);
  };

  const disQuestions = () => {
    const t = parseInt(quizdata.data.questions.length);
    const buttons = [];
    for (let i = 0; i < t; i++) {
      buttons.push(
        <Button
          key={i}
          style={{ borderRadius: "50%", margin: "10px" }}
          onClick={() => {
            setCurr(i + 1);
          }}
        >
          {i + 1}
        </Button>
      );
    }
    return <>{buttons}</>;
  };

  const handleAddOption = () => {
    const updatedAll = [...all];
    updatedAll[curr - 1] = {
      question: updatedAll[curr - 1]?.question || "",
      options: updatedAll[curr - 1]?.options || [],
    };
    updatedAll[curr - 1].options.push({
      value: "",
      isAnswer: false,
    });
    setAll(updatedAll);
  };
  const handleDleleteOption = () => {
    const updatedAll = [...all];
    updatedAll[curr - 1] = {
      question: updatedAll[curr - 1]?.question || "",
      options: updatedAll[curr - 1]?.options || [],
    };
    if (updatedAll[curr - 1].options.length <= 0) return;
    updatedAll[curr - 1].options.pop();
    setAll(updatedAll);
  };
  const showContant = () => {
    return (
      <div>
        <div className="question-container">
          <label htmlFor="question">Question {curr} : </label>
          <InputTextarea
            id="question"
            rows={5}
            cols={100}
            className="p-inputtextarea"
            value={all[curr - 1]?.question || ""}
            onChange={(e) => {
              const updatedAll = [...all];
              updatedAll[curr - 1] = updatedAll[curr - 1] || {
                question: "",
                options: [{ value: "", isAnswer: false }],
              };
              updatedAll[curr - 1].question = e.target.value;
              setAll(updatedAll);
            }}
          />
        </div>
        <div className="options-container">
          {renderOptions()}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button label="Add Option" onClick={handleAddOption} />
            <Button label="Delete Option" onClick={handleDleleteOption} />
          </div>{" "}
        </div>
      </div>
    );
  };

  const renderOptions = () => {
    return all[curr - 1]?.options.map((option, index) => (
      <div className="option" key={index}>
        <label htmlFor={`option${index + 1}`}>Option {index + 1}:</label>
        <div className="flex align-items-center">
          <Checkbox
            onChange={() => {
              const updatedAll = [...all];
              updatedAll[curr - 1].options[index].isAnswer = !option.isAnswer;
              setAll(updatedAll);
            }}
            checked={!!option.isAnswer}
          ></Checkbox>
          <label className="ml-2" style={{ marginRight: "10px" }}>
            isCorrect
          </label>
          <InputText
            id={`option${index + 1}`}
            className="p-inputtext"
            placeholder={`Enter the value of option ${index + 1}`}
            value={option.value}
            onChange={(e) => {
              const updatedAll = [...all];
              updatedAll[curr - 1].options[index].value = e.target.value;
              setAll(updatedAll);
            }}
          />
        </div>
      </div>
    ));
  };
  const showHeader = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label htmlFor="title">TITLE</label>
        <InputTextarea
          id="title"
          rows={2}
          cols={10}
          value={title}
          style={{ fontSize: "20px" }}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <div style={{ display: "flex", margin: "20px" }}>
          <div style={{ marginRight: "50px" }}>
            <label htmlFor="startTime">Start Time</label>
            <Calendar
              value={starttime}
              onChange={(e) => {
                setStartTime(e.value as Date);
              }}
              showTime
              hourFormat="12"
            />
          </div>
          <div>
            <label htmlFor="endTime">End Time</label>
            <Calendar
              value={endtime}
              onChange={(e) => {
                setEndTime(e.value as Date);
              }}
              showTime
              hourFormat="12"
            />
          </div>
        </div>
      </div>
    );
  };
  const nav = () => {
    let a = new Date();
    // while (true) {
    //   let b = new Date();
    //   if (b.getSeconds() >= a.getSeconds() + 1) break;
    // }
    navigate("/allquiz");
  };
  useEffect(() => {
    if (isUpdateSuccess && toast.current) {
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Quiz Added Successfully",
        life: 3000,
      });
      nav();
    }
  }, [isUpdateSuccess]);
  const Submittodatabase = async () => {
    let x = 0;
    for (let index = 0; index < all.length; index++) {
      const data = all[index];
      if (data.question === "" || data.options.length < 2) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: `Question or All Option not Added in ${index + 1}'s Question`,
          life: 3000,
        });
        x = 1;
        return;
      }
      let y = 0;
      for (let i = 0; i < data.options.length; i++) {
        const optdata = data.options[i];

        if (optdata.value === "") {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: `Option is Empty in ${index + 1}'s Question`,
            life: 3000,
          });
          x = 1;
          return;
        }

        if (optdata.isAnswer === true) {
          y = 1;
        }
      }
      if (y === 0 && x === 0) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: `Correct option is not Selected in ${index + 1}'s Question`,
          life: 3000,
        });
        x = 1;
        return;
      }
    }
    if (x === 0) {
      if (isUpdatePending) return;
      if (!starttime || !endtime) {
        return;
      }
      // await fetchdeleteQuiz({
      //   id: quizdata.data._id,
      // });
      await updateQuizById({
        id: quizdata.data._id,
        updateData: {
          title: title,
          start_time: starttime.toISOString(),
          end_time: endtime.toISOString(),
          questions: all,
        },
      });
      // console.log(a, "a");

      // console.log(isQuizSuccess);
      // console.log("pen ", isQuizPending);
      // navigate("/allquiz");
      if (isUpdateSuccess) {
        // toast.current?.show({
        //   severity: "success",
        //   summary: "Success",
        //   detail: "Quiz Updated Successfully",
        //   life: 3000,
        // });
        // navigate("/allquiz");
      }
    }
  };
  return (
    <Mainlayout>
      <div>
        {/* {id} */}
        {isLoading ? (
          <div className="quiz-container">Loading...</div>
        ) : (
          <div className="quiz-container">
            <div>{showHeader()}</div>
            <div>{disQuestions()}</div>
            <div>{showContant()}</div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Toast ref={toast}></Toast>
              <Button onClick={Submittodatabase}>SUBMIT</Button>
            </div>
          </div>
        )}
      </div>
    </Mainlayout>
  );
};

export default EditQuiz;
