import React, { useState, useRef } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import "../css/quiz.css";
import Mainlayout from "../layout/Mainlayout";

interface QuizProps {}
const Quiz: React.FC<QuizProps> = () => {
  const toast = useRef<Toast>(null);

  const [all, setAll] = useState<
    { que: string; opt: { text: string; isAnswer: Boolean }[] }[]
  >([]);
  const [numQue, setNumque] = useState("");
  const [curr, setCurr] = useState(1);
  const [flag, setFlag] = useState(0);
  const [starttime, setStartTime] = useState<Date | null>(null);
  const [endtime, setEndTime] = useState<Date | null>(null);
  const Generateque = () => {
    if (numQue == "" || starttime == null || endtime == null) return null;
    const x = parseInt(numQue);
    const newArray = Array.from({ length: x }, () => ({
      que: "",
      opt: [],
    }));
    // console.log(newArray);
    setFlag(1);
    setAll(newArray);
    // console.log(all);
  };
  const renderOptions = () => {
    return all[curr - 1]?.opt.map((option, index) => (
      <div className="option" key={index}>
        <label htmlFor={`option${index + 1}`}>Option {index + 1}:</label>
        <div className="flex align-items-center">
          <Checkbox
            onChange={() => {
              const updatedAll = [...all];
              updatedAll[curr - 1].opt[index].isAnswer = !option.isAnswer;
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
            value={option.text}
            onChange={(e) => {
              const updatedAll = [...all];
              updatedAll[curr - 1].opt[index].text = e.target.value;
              setAll(updatedAll);
            }}
          />
        </div>
      </div>
    ));
  };

  const disQuestions = () => {
    const t = parseInt(numQue);
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
      que: updatedAll[curr - 1]?.que || "",
      opt: updatedAll[curr - 1]?.opt || [],
    };

    updatedAll[curr - 1].opt.push({
      text: "",
      isAnswer: false,
    });

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
            value={all[curr - 1]?.que || ""}
            onChange={(e) => {
              const updatedAll = [...all];
              updatedAll[curr - 1] = updatedAll[curr - 1] || {
                que: "",
                opt: { text: "", isAnswer: false },
              };
              updatedAll[curr - 1].que = e.target.value;
              setAll(updatedAll);
            }}
          />
        </div>
        <div className="options-container">
          {renderOptions()}
          <Button label="Add Option" onClick={handleAddOption} />
        </div>
      </div>
    );
  };

  const Submittodatabase = () => {
    let x = 0;
    toast?.current?.show({
      severity: "warn",
      summary: "Warning",
      detail: "Question Not Added",
      life: 3000,
    });
    all.map((data, index) => {
      if (data.que == " " || data.opt.length == 0) {
        toast?.current?.show({
          severity: "warn",
          summary: "Warning",
          detail: "Question Not Added",
          life: 3000,
        });
        console.log("question or option is not added");

        x = 1;
      }
      let y = 0;
      data.opt.map((optdata, i) => {
        if (optdata.text == "") {
          console.log("option not added", index);
          x = 1;
        }
        if (optdata.isAnswer == true) {
          y = 1;
        }
      });
      if (y == 0) {
        console.log("answer not selected");
        x = 1;
      }
    });
    if (x == 0) console.log("all content added");
  };
  return (
    <Mainlayout>
      {flag == 0 && (
        <div className="quiz-container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label htmlFor="question">
              How many questions do you want to add ?{" "}
            </label>
            <InputText
              style={{ width: "100px" }}
              placeholder="Integers"
              onChange={(e) => {
                setNumque(e.target.value);
              }}
            />
            <div style={{ display: "flex", margin: "20px" }}>
              <div style={{ marginRight: "50px" }}>
                <label htmlFor="question">Start Time</label>
                <Calendar
                  value={starttime}
                  onChange={(e) => {
                    const temp = (e.value as Date) || null; // Use e.value to get the selected date/time
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
                    const temp = (e.value as Date) || null; // Use e.value to get the selected date/time
                    setEndTime(temp);
                  }}
                  showTime
                  hourFormat="12"
                />
              </div>
            </div>
            <Button style={{ marginTop: "10px" }} onClick={Generateque}>
              Generate Quiz
            </Button>
          </div>
        </div>
      )}
      {flag == 1 && (
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
