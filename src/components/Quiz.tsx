import React, { useState, useRef, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import "../css/quiz.css";
import Mainlayout from "../layout/Mainlayout";
import { AddQuiz } from "../queries/authentication";
import { useNavigate } from "react-router-dom";

interface QuizProps {}

const Quiz: React.FC<QuizProps> = () => {
  const navigate = useNavigate();
  const [all, setAll] = useState<
    { question: string; options: { value: string; isAnswer: boolean }[] }[]
  >([]);
  const [numQue, setNumque] = useState("");
  const [curr, setCurr] = useState(1);
  const [flag, setFlag] = useState(0);
  const [starttime, setStartTime] = useState<Date>();
  const [endtime, setEndTime] = useState<Date>();
  const toast = useRef<Toast | null>(null);
  const [title, setTitle] = useState("");
  const [ButtonStyles, setButtonStyles] = useState<null | {
    [key: string]: React.CSSProperties;
  }>(null);
  const {
    mutate: quizadd,
    isPending: isQuizPending,
    isSuccess: isQuizSuccess,
  } = AddQuiz();

  const Generateque = () => {
    if (numQue === "" || !title || !starttime || !endtime) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Add All Details",
        life: 3000,
      });
      return null;
    }
    const x = parseInt(numQue);

    const newArray = Array.from({ length: x }, () => ({
      question: "",
      options: [],
    }));
    setFlag(1);
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Quiz generated Successfully",
      life: 3000,
    });
    setAll(newArray);
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
  const handlechangebuttonstyle = () => {
    const defaultStyle: React.CSSProperties = {
      backgroundColor: "#2196f3",
      color: "white",
    };
    // console.log(defaultStyle);

    const invalidStyle: React.CSSProperties = {
      backgroundColor: "green",
      color: "white",
    };

    const validStyle: React.CSSProperties = {
      backgroundColor: "green",
      color: "white",
    };

    // Create a copy of the current button styles
    const updatedStyles: { [key: string]: React.CSSProperties } = {
      ...ButtonStyles,
    };

    // Loop through the questions
    for (let index = 0; index < all.length; index++) {
      let x = 0;
      if (all[index].question !== " " && all[index].options.length >= 2) {
        for (let i = 0; i < all[index].options.length; i++) {
          if (all[index].options[i].isAnswer === true) {
            x = 1;
          }
        }
        // Update the style based on the condition
      }
      updatedStyles[`questionbutton${index + 1}`] =
        x === 1 ? validStyle : defaultStyle;
    }
    // console.log(updatedStyles);
    // console.log("run", updatedStyles);

    // Set the updated styles in the state
    setButtonStyles(updatedStyles);
  };

  const disQuestions = () => {
    const t = parseInt(numQue);
    const buttons = [];
    const buttonsObject: Record<string, React.CSSProperties> = {}; // Explicitly type buttonsObject

    for (let i = 0; i < t; i++) {
      const buttonStyle = ButtonStyles?.[`questionbutton${i + 1}`] || {};

      buttons.push(
        <Button
          key={i}
          className={`questionbutton${i + 1}`}
          style={{
            borderRadius: "50%",
            margin: "10px",
            ...(buttonStyle as React.CSSProperties), // Type assertion to indicate it's a CSSProperties
          }}
          onClick={() => {
            handlechangebuttonstyle();
            setCurr(i + 1);
          }}
        >
          {i + 1}
        </Button>
      );
      buttonsObject[`questionbutton${i + 1}`] = {
        borderRadius: "50%",
        margin: "10px",
        ...(buttonStyle as React.CSSProperties), // Type assertion to indicate it's a CSSProperties
      };
    }

    if (ButtonStyles == null) {
      // console.log("run");
      // console.log(buttons);
      setButtonStyles(buttonsObject);
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
          </div>
        </div>
      </div>
    );
  };
  // useEffect(() => {
  //   // console.log(isQuizSuccess, "Quiz added in");
  //   if (isQuizSuccess) {
  //     <Toast ref={toast} />;
  //     toast.current?.show({
  //       severity: "success",
  //       summary: "Success",
  //       detail: "Quiz Added Successfully",
  //       life: 3000,
  //     });
  //     navigate("/allquiz");
  //   }
  // }, [isQuizSuccess]);
  const adddata = () => {
    if (!starttime || !endtime) return;
    quizadd({
      title: title,
      start_time: starttime.toISOString(),
      end_time: endtime.toISOString(),
      questions: all,
    });
  };
  const Submittodatabase = () => {
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
      if (isQuizPending) return;
      if (!starttime || !endtime) {
        return;
      }
      adddata();
      // console.log(a);
    }
  };

  return (
    <Mainlayout>
      {flag === 0 && (
        <div className="quiz-container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label htmlFor="question">Title</label>
            <InputText
              type="text"
              value={title}
              style={{ width: "300px", marginBottom: "0px" }}
              className="p-inputtext-lg"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div style={{ display: "flex", margin: "20px" }}>
              <div style={{ marginRight: "50px" }}>
                <label htmlFor="question">Start Time</label>
                <Calendar
                  value={starttime}
                  onChange={(e) => {
                    const temp = (e.value as Date) || null;
                    setStartTime(temp);
                  }}
                  showTime
                  hourFormat="12"
                />
              </div>
              <div>
                <label htmlFor="question">End Time</label>
                <Calendar
                  value={endtime}
                  onChange={(e) => {
                    const temp = (e.value as Date) || null;
                    setEndTime(temp);
                  }}
                  showTime
                  hourFormat="12"
                />
              </div>
            </div>
            <label htmlFor="question">
              How many questions do you want to add ?{" "}
            </label>
            <InputText
              style={{ width: "100px" }}
              placeholder="Number"
              onChange={(e) => {
                setNumque(e.target.value);
              }}
            />
            <Button style={{ marginTop: "10px" }} onClick={Generateque}>
              Generate Quiz
            </Button>
          </div>
        </div>
      )}
      {flag === 1 && (
        <div className="quiz-container">
          <div>{disQuestions()}</div>
          <div>{showContant()}</div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button onClick={Submittodatabase}>SUBMIT</Button>
          </div>
        </div>
      )}
    </Mainlayout>
  );
};

export default Quiz;
