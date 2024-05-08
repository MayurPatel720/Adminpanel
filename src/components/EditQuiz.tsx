import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Chips, ChipsChangeEvent } from "primereact/chips";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ListBox } from "primereact/listbox";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../App";
import "../css/quiz.css";
import Mainlayout from "../layout/Mainlayout";
import {
  AddQuiz,
  useAllGroupbyId,
  useAllGroups,
  useAllQuizbyId,
  useUpdateQuiz,
} from "../queries/authentication";
import { useGetalluser } from "../queries/feed";
import Loading from "./Loading";
interface QuizProps {}
interface Allnames {
  name: string;
  _id: string;
  roll: string;
}
interface OptionItem {
  value: string;
  isAnswer: boolean;
  _id: string | null;
}

interface QuestionItem {
  question: string;
  _id: string | null;
  options: OptionItem[];
}

interface QuizData {
  questions: QuestionItem[];
}
interface allGroup {
  name: string;
  _id: string;
}

const EditQuiz: React.FC<QuizProps> = () => {
  const { id } = useParams();
  const [all, setAll] = useState<
    {
      question: string;
      _id: string | null;
      options: {
        _id: string | null;
        value: string;
        isAnswer: boolean;
      }[];
    }[]
  >([]);
  const [num, setNum] = useState<string[]>([]);
  const [numQue, setNumque] = useState("");
  const [curr, setCurr] = useState(1);
  const [starttime, setStartTime] = useState<Date>();
  const [endtime, setEndTime] = useState<Date>();
  const [title, setTitle] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const toast = useToast();
  const [fla, setfla] = useState("0");
  const [selectedgroup, setSelectedgroup] = useState<allGroup[]>([]);
  const [ButtonStyles, setButtonStyles] = useState<null | {
    [key: string]: React.CSSProperties;
  }>(null);
  const [selectedNames, setSelectedNames] = useState<Allnames[]>([]);
  const { data } = useGetalluser();
  const allUsers: Allnames[] =
    data?.data?.map((item: { roll: string; name: string; _id: string }) => ({
      roll: item.roll,
      name: item.roll + " " + item.name,
      _id: item._id,
    })) || [];
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const {
    data: selectedGroupUsers,
    isPending: selectedGroupUsersLoading,
    isSuccess: selectedGroupSuccess,
  } = useAllGroupbyId(selectedGroupId, selectedGroupId != "");
  const {
    data: groupdata,
    isSuccess: isgroupSuccess,
    isError: isgroupError,
    isLoading: isGroupLoading,
  } = useAllGroups();
  const allGroup: allGroup[] =
    groupdata?.data?.map((item: { name: string; _id: string }) => ({
      name: item.name,
      _id: item._id,
    })) || [];
  allGroup.push({
    name: "ALL",
    _id: "all",
  } as allGroup);
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
  // useEffect(() => {
  //   const sortedUniqueNum = Array.from(new Set(num)).sort(
  //     (a, b) => parseFloat(a) - parseFloat(b)
  //   );
  //   setNum(sortedUniqueNum);
  // }, [num]);
  useEffect(() => {
    // if (flag == 1) {
    handleAddcontent();
    // setFlag(0);
    // }
  }, [quizdata]);
  useEffect(() => {
    setSelectedNames(
      (selectedGroupUsers?.data?.users || []).map((user: any) => ({
        roll: user.roll,
        name: user.roll + " " + user.name,
        _id: user._id,
      }))
    );
    setNum(
      (selectedGroupUsers?.data?.users || []).map((user: any) => user.roll)
    );
  }, [selectedGroupUsers?.data?.users]);
  console.log(quizdata);
  const handleAddcontent = async () => {
    // if (all.length) return;
    if (!quizdata || !quizdata.data.questions || isLoading) return;
    setTitle(quizdata.data.title);
    setEndTime(new Date(quizdata.data.start_time));
    setStartTime(new Date(quizdata.data.end_time));
    const newArray = (quizdata.data.questions as QuestionItem[]).map(
      (questionItem) => ({
        question: questionItem.question,
        _id: questionItem._id,
        options: questionItem.options.map((optionItem: OptionItem) => ({
          value: optionItem.value,
          isAnswer: optionItem.isAnswer,
          _id: optionItem._id,
        })),
      })
    );
    if (quizdata?.data?.users) {
      const abc: Allnames[] = [];
      for (let i = 0; i < quizdata?.data?.users.length; i++) {
        for (let j = 0; j < allUsers.length; j++) {
          if (allUsers[j]._id == quizdata.data.users[i]) {
            abc.push({
              name: allUsers[j].name,
              _id: allUsers[j]._id,
              roll: allUsers[j].roll,
            } as Allnames);
            break;
          }
        }
      }
      const temp = abc.map((d: { roll: string }) => d.roll);
      setNum(temp);
      setSelectedNames(abc);
      console.log(num, selectedNames);
    }
    setAll(newArray);
  };
  const handleDeletequestions = async () => {
    let x = all.length;
    setCurr(x - 1);
    // setCurr((prev) => prev - 1);
    const updatedall = [...all];
    if (updatedall.length <= 0) return;
    updatedall.pop();
    setAll((prevAll) => {
      const newAll = [...prevAll];
      newAll.pop(); // Pop again to ensure consistency
      return newAll;
    });
    console.log(all);
    disQuestions();
    showContant();
    handlechangebuttonstyle();
  };
  const handleaddquestions = async () => {
    const updatedall = [...all];
    updatedall.push({
      question: "",
      options: [
        {
          value: "",
          isAnswer: false,
        } as OptionItem,
      ],
    } as QuestionItem);

    setCurr(updatedall.length); // Set current question to the newly added one
    setAll(updatedall);
    console.log(all);
    // disQuestions();
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
      // console.log(all[index].options.length);

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
    const t1: number = all.length;
    // const t2: number = quizdata.data.questions.length;

    const maxLen: number = Math.max(t1);

    const buttons = [];
    const buttonsObject: Record<string, React.CSSProperties> = {};

    for (let i = 0; i < maxLen; i++) {
      const buttonStyle = ButtonStyles?.[`questionbutton${i + 1}`] || {};
      buttons.push(
        <Button
          key={i}
          className={`questionbutton${i + 1}`}
          style={{
            borderRadius: "50%",
            margin: "10px",
            ...(buttonStyle as React.CSSProperties),
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
        ...(buttonStyle as React.CSSProperties),
      };
    }

    if (ButtonStyles == null) {
      setButtonStyles(buttonsObject);
    }

    return <>{buttons}</>;
  };
  const handleAddOption = () => {
    const updatedAll = [...all];
    updatedAll[curr - 1] = {
      question: updatedAll[curr - 1]?.question || "",
      // _id: updatedAll[curr - 1]?._id || null,
      options: updatedAll[curr - 1]?.options || [],
    } as QuestionItem;
    updatedAll[curr - 1].options.push({
      value: "",
      isAnswer: false,
    } as OptionItem);
    setAll(updatedAll);
  };
  const handleDleleteOption = () => {
    const updatedAll = [...all];
    updatedAll[curr - 1] = {
      question: updatedAll[curr - 1]?.question || "",
      options: updatedAll[curr - 1]?.options || [],
    } as QuestionItem;
    if (updatedAll[curr - 1].options.length <= 0) return;
    updatedAll[curr - 1].options.pop();
    setAll(updatedAll);
    // console.log(all);
  };
  const showContant = () => {
    return (
      <div>
        <div className="question-container">
          <label htmlFor="question">
            Question {curr ? " : " + curr : " "}{" "}
          </label>
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
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={handleaddquestions}>Add Question</Button>
            <Button onClick={handleDeletequestions}>Delete Question</Button>
          </div>
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
          flexDirection: "column",
        }}
      >
        <label htmlFor="title">TITLE</label>
        <InputText
          id="title"
          style={{ marginRight: "100px", height: "43px" }}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <div style={{ display: "flex", marginTop: "40px" }}>
          <div style={{ marginRight: "100px" }}>
            <label htmlFor="startTime">Start Time</label>
            <Calendar
              value={starttime}
              style={{ height: "43px", width: "234px" }}
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
              style={{ height: "43px", width: "234px" }}
              onChange={(e) => {
                setEndTime(e.value as Date);
              }}
              showTime
              hourFormat="12"
            />
          </div>
        </div>
        <div style={{ marginTop: "40px" }}>
          <label htmlFor="question">Users Able to Attend Quiz</label>
          <Chips
            style={{
              display: "flex",
              flexDirection: "column",
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
            width: "100%",
            display: "flex",
            marginTop: "40px",
            marginBottom: "40px",
          }}
          // className="field col-12 md:col-4"
        >
          <div style={{ marginRight: "100px" }}>
            <ListBox
              filter
              // multiple
              value={selectedgroup}
              onChange={(e) => {
                setSelectedgroup(e.value);
                if (e.value == null || e.value._id == "all") {
                  setSelectedGroupId("");
                  setSelectedgroup([]);
                  if (e.value == null && fla == "10") {
                    setSelectedGroupId("");
                    setSelectedgroup([]);
                    setSelectedNames([]);
                    setNum([]);
                    setfla("0");
                  } else if (e.value._id == "all" && fla == "0") {
                    setfla("10");
                    setSelectedNames(allUsers);
                    setSelectedgroup(e.value);
                    setNum(allUsers.map((user) => user.roll));
                  }
                } else {
                  setSelectedGroupId("");
                  setSelectedGroupId(e.value ? e.value._id : "");
                  console.log("id of selectedgroup ", selectedGroupId);
                }
                // groupUpdate();
              }}
              options={allGroup}
              optionLabel="name"
              className="w-full"
            />
          </div>
          <div
          // style={{ marginTop: "10px" }}
          // className="field col-12 md:col-4"
          >
            <>
              {/* {selectedGroupUsers?.data?.users?.map(
                      (user: any) => user.roll + ", "
                    )} */}
              {/* <ListBox
                      filter
                      multiple
                      // value={selectedNames}
                      value={selectedGroupUsers?.data?.users?.map(
                        (user: any) => {
                          return {
                            roll: user.roll,
                            name: user.roll + " " + user.name,
                            _id: user._id,
                          };
                        }
                      )}  {
                        selectedNames
                      }
                      onChange={(e) => {
                        setSelectedNames(e.value);
                        const curr = e.value;
                        const temp = curr.map((d: { roll: string }) => d.roll);
                        setNum(temp);
                      }}
                      options={allUsers}
                      optionLabel="name"
                      className="w-full"
                    /> */}
              {/* {const temp=(selectedGroupUsers?.data?.users || [])
                        .map((user: any) => ({
                          roll: user.roll,
                          name: user.roll + " " + user.name,
                          _id: user._id,
                        }))} */}
              <ListBox
                filter
                multiple
                value={(selectedGroupUsers?.data?.users || [])
                  .map((user: any) => ({
                    roll: user.roll,
                    name: user.roll + " " + user.name,
                    _id: user._id,
                  }))
                  .concat(selectedNames || [])}
                onChange={(e) => {
                  const uniqueValues = e.value.filter(
                    (v: any, i: any, a: any) =>
                      a.findIndex((t: any) => t.roll === v.roll) === i
                  );
                  setSelectedNames(uniqueValues);
                  const curr = uniqueValues;
                  const temp = curr.map((d: { roll: string }) => d.roll);
                  setNum(temp);
                }}
                options={allUsers}
                optionLabel="name"
                className="w-full"
              />
            </>
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
    if (all.length == 0) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: `Add Question`,
        life: 3000,
      });
    }
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
      // console.log(all);

      await updateQuizById({
        id: quizdata.data._id,
        updateData: {
          title: title,
          start_time: starttime.toISOString(),
          end_time: endtime.toISOString(),
          questions: all,
          // _id: "abcdsfsd",
        },
        users: selectedNames.map((city) => city._id),
      });
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
        {isLoading ? (
          <Loading />
        ) : (
          <div>
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
