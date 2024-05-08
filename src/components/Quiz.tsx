import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Chips, ChipsChangeEvent } from "primereact/chips";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ListBox } from "primereact/listbox";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/quiz.css";
import Mainlayout from "../layout/Mainlayout";
import {
  AddQuiz,
  useAllGroupbyId,
  useAllGroups,
} from "../queries/authentication";
import { useGetalluser } from "../queries/feed";

interface QuizProps {}
interface Allnames {
  name: string;
  _id: string;
  roll: string;
}
interface allGroup {
  name: string;
  _id: string;
}
const Quiz: React.FC<QuizProps> = () => {
  const navigate = useNavigate();
  const [all, setAll] = useState<
    { question: string; options: { value: string; isAnswer: boolean }[] }[]
  >([]);
  const [num, setNum] = useState<string[]>([]);
  const [numQue, setNumque] = useState("");
  const [curr, setCurr] = useState(1);
  const [flag, setFlag] = useState(0);
  const [starttime, setStartTime] = useState<Date>();
  const [endtime, setEndTime] = useState<Date>();
  const toast = useRef<Toast | null>(null);
  const [title, setTitle] = useState("");
  const [groupRoll, setGroupRoll] = useState<string[]>([]);
  const [fla, setfla] = useState("0");
  const [ButtonStyles, setButtonStyles] = useState<null | {
    [key: string]: React.CSSProperties;
  }>(null);
  const [selectedNames, setSelectedNames] = useState<Allnames[]>([]);
  const { data } = useGetalluser();
  const [selectedgroup, setSelectedgroup] = useState<allGroup[]>([]);
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
  // console.log(selectedGroupUsers?.data);
  // const groupUpdate = async () => {
  //   if (selectedGroupId == "") {
  //     if (fla == "1") {
  //       setfla("0");
  //       const temp: Allnames[] = [];
  //       const temp1: string[] = [];
  //       for (let i = 0; i < selectedNames.length; i++) {
  //         let f = 0;
  //         for (let j = 0; j < groupRoll.length; j++) {
  //           if (selectedNames[i].roll == groupRoll[j]) {
  //             f = 1;
  //             break;
  //           }
  //         }
  //         if (f == 0) {
  //           // console.log("run");
  //           temp.push({
  //             name: selectedNames[i].name,
  //             _id: selectedNames[i]._id,
  //             roll: selectedNames[i].roll,
  //           } as Allnames);
  //           temp1.push(selectedNames[i].roll);
  //         }
  //       }

  //       // setGroupRoll([]);
  //       setNum(temp1);
  //       setSelectedNames(temp);
  //       console.log("not selecting ", temp1);
  //       console.log("not selecting ", num);
  //     }
  //   } else {
  //     if (fla == "1") {
  //       setfla("0");
  //       if (selectedGroupUsers) {
  //         setfla("0");
  //         const temp: Allnames[] = [];
  //         const temp1: string[] = [];
  //         for (let i = 0; i < selectedNames.length; i++) {
  //           let f = 0;
  //           for (let j = 0; j < groupRoll.length; j++) {
  //             if (selectedNames[i].roll == groupRoll[j]) {
  //               f = 1;
  //               break;
  //             }
  //           }
  //           if (f == 0) {
  //             temp.push({
  //               name: selectedNames[i].name,
  //               _id: selectedNames[i]._id,
  //               roll: selectedNames[i].roll,
  //             } as Allnames);
  //             temp1.push(selectedNames[i].roll);
  //           }
  //         }
  //         setGroupRoll([]);
  //         setNum(temp1);
  //         setSelectedNames(temp);
  //         console.log(
  //           "selecting after removing previously selected in temp1 ",
  //           temp1
  //         );
  //         console.log(
  //           "selecting after removing previously selected in num ",
  //           num
  //         );

  //         const curr = selectedGroupUsers?.data?.users;
  //         for (let i = 0; i < curr.length; i++) {
  //           const temp = curr[i].roll as string;
  //           setGroupRoll((prev) => [...prev, temp]);
  //         }
  //         for (let i = 0; i < allUsers.length; i++) {
  //           for (let j = 0; j < groupRoll.length; j++) {
  //             if (groupRoll[j] == allUsers[i].roll) {
  //               let f = 0;
  //               for (let k = 0; k < selectedNames.length; k++) {
  //                 if (selectedNames[k].roll == groupRoll[j]) {
  //                   f = 1;
  //                   break;
  //                 }
  //               }
  //               if (f == 0) {
  //                 console.log(groupRoll[j]);
  //                 setNum((prev) => [...prev, groupRoll[j]]);
  //                 setSelectedNames((prev) => [...prev, allUsers[i]]);
  //               }
  //             }
  //           }
  //         }
  //         console.log("selecting after adding temp1 ", temp1);
  //         console.log("selecting after adding in num ", num);
  //         console.log(
  //           "selecting after adding in selectednames ",
  //           selectedNames
  //         );
  //         setfla("0");
  //       }
  //     }
  //   }
  // };
  // useEffect(() => {
  //   if (selectedGroupId == null) {
  //     setNum([]);
  //     setSelectedNames([]);
  //   }
  // }, [selectedGroupId]);
  // useEffect(() => {
  //   console.log("---------", num);
  // }, [num]);
  // useEffect(() => {
  //   // console.log(
  //   //   "IS LOADING: ",
  //   //   selectedGroupId,
  //   //   selectedGroupUsersLoading,
  //   //   "\n",
  //   //   selectedGroupUsers
  //   // );

  //   if (selectedGroupId == "") {
  //     if (fla == "1") {
  //       setfla("0");
  //       const temp: Allnames[] = [];
  //       const temp1: string[] = [];
  //       for (let i = 0; i < selectedNames.length; i++) {
  //         if (selectedNames.length - 1 == i) {
  //           console.log("________for end");
  //         }
  //         let f = 0;
  //         inner: for (let j = 0; j < groupRoll.length; j++) {
  //           if (selectedNames[i].roll == groupRoll[j]) {
  //             f = 1;
  //             break inner;
  //           }
  //         }
  //         if (f == 0) {
  //           // console.log("run");
  //           temp.push({
  //             name: selectedNames[i].name,
  //             _id: selectedNames[i]._id,
  //             roll: selectedNames[i].roll,
  //           } as Allnames);
  //           temp1.push(selectedNames[i].roll);
  //         }
  //       }
  //       console.log("after for end");

  //       // setGroupRoll([]);
  //       setNum((val) => temp1);
  //       setSelectedNames(temp);
  //       console.log("not selecting id at time in temp1", temp1);
  //       console.log("not selecting id at time in num ", num);
  //     }
  //   } else {
  //     if (fla == "1") {
  //       setfla("0");
  //       if (selectedGroupUsers) {
  //         setfla("0");
  //         const temp: Allnames[] = [];
  //         const temp1: string[] = [];
  //         for (let i = 0; i < selectedNames.length; i++) {
  //           let f = 0;
  //           for (let j = 0; j < groupRoll.length; j++) {
  //             if (selectedNames[i].roll == groupRoll[j]) {
  //               f = 1;
  //               break;
  //             }
  //           }
  //           if (f == 0) {
  //             temp.push({
  //               name: selectedNames[i].name,
  //               _id: selectedNames[i]._id,
  //               roll: selectedNames[i].roll,
  //             } as Allnames);
  //             temp1.push(selectedNames[i].roll);
  //           }
  //         }
  //         setGroupRoll([]);
  //         setNum(temp1);
  //         setSelectedNames(temp);
  //         console.log(
  //           "selecting after removing previously selected in temp1 ",
  //           temp1
  //         );
  //         console.log(
  //           "selecting after removing previously selected in num ",
  //           num
  //         );
  //       }
  //       const curr = selectedGroupUsers?.data?.users;
  //       console.log(curr);
  //       if (curr) {
  //         for (let i = 0; i < curr.length; i++) {
  //           const temp = curr[i].roll as string;
  //           setGroupRoll((prev) => [...prev, temp]);
  //         }
  //         for (let i = 0; i < allUsers.length; i++) {
  //           for (let j = 0; j < groupRoll.length; j++) {
  //             if (groupRoll[j] == allUsers[i].roll) {
  //               let f = 0;
  //               for (let k = 0; k < selectedNames.length; k++) {
  //                 if (selectedNames[k].roll == groupRoll[j]) {
  //                   f = 1;
  //                   break;
  //                 }
  //               }
  //               if (f == 0) {
  //                 // console.log(groupRoll[j]);
  //                 setNum((prev) => [...prev, groupRoll[j]]);
  //                 setSelectedNames((prev) => [...prev, allUsers[i]]);
  //               }
  //             }
  //           }
  //         }
  //         console.log("selecting after adding in num ", num);
  //         console.log("selecting after adding in selectedname ", selectedNames);
  //         setfla("0");
  //       }
  //     }
  //   }
  // }, [selectedGroupSuccess]);
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
  // useEffect(() => {
  //   // console.log(
  //   //   "IS LOADING: ",
  //   //   selectedGroupId,
  //   //   selectedGroupUsersLoading,
  //   //   "\n",
  //   //   selectedGroupUsers
  //   // );

  //   if (selectedGroupId == "") {
  //     if (fla == "1") {
  //       setfla("0");
  //       const temp: Allnames[] = [];
  //       const temp1: string[] = [];
  //       for (let i = 0; i < selectedNames.length; i++) {
  //         let f = 0;
  //         for (let j = 0; j < groupRoll.length; j++) {
  //           if (selectedNames[i].roll == groupRoll[j]) {
  //             f = 1;
  //             break;
  //           }
  //         }
  //         if (f == 0) {
  //           // console.log("run");
  //           temp.push({
  //             name: selectedNames[i].name,
  //             _id: selectedNames[i]._id,
  //             roll: selectedNames[i].roll,
  //           } as Allnames);
  //           temp1.push(selectedNames[i].roll);
  //         }
  //       }

  //       // setGroupRoll([]);
  //       setNum(temp1);
  //       setSelectedNames(temp);
  //       console.log("not selecting id at time in temp1", temp1);
  //       console.log("not selecting id at time in num ", num);
  //     }
  //   } else {
  //     if (fla == "1") {
  //       setfla("0");
  //       if (selectedGroupUsers) {
  //         setfla("0");
  //         const temp: Allnames[] = [];
  //         const temp1: string[] = [];
  //         for (let i = 0; i < selectedNames.length; i++) {
  //           let f = 0;
  //           for (let j = 0; j < groupRoll.length; j++) {
  //             if (selectedNames[i].roll == groupRoll[j]) {
  //               f = 1;
  //               break;
  //             }
  //           }
  //           if (f == 0) {
  //             temp.push({
  //               name: selectedNames[i].name,
  //               _id: selectedNames[i]._id,
  //               roll: selectedNames[i].roll,
  //             } as Allnames);
  //             temp1.push(selectedNames[i].roll);
  //           }
  //         }
  //         setGroupRoll([]);
  //         setNum(temp1);
  //         setSelectedNames(temp);
  //         console.log(
  //           "selecting after removing previously selected in temp1 ",
  //           temp1
  //         );
  //         console.log(
  //           "selecting after removing previously selected in num ",
  //           num
  //         );
  //       }
  //       const curr = selectedGroupUsers?.data?.users;
  //       console.log(curr);
  //       if (curr) {
  //         for (let i = 0; i < curr.length; i++) {
  //           const temp = curr[i].roll as string;
  //           setGroupRoll((prev) => [...prev, temp]);
  //         }
  //         for (let i = 0; i < allUsers.length; i++) {
  //           for (let j = 0; j < groupRoll.length; j++) {
  //             if (groupRoll[j] == allUsers[i].roll) {
  //               let f = 0;
  //               for (let k = 0; k < selectedNames.length; k++) {
  //                 if (selectedNames[k].roll == groupRoll[j]) {
  //                   f = 1;
  //                   break;
  //                 }
  //               }
  //               if (f == 0) {
  //                 // console.log(groupRoll[j]);
  //                 setNum((prev) => [...prev, groupRoll[j]]);
  //                 setSelectedNames((prev) => [...prev, allUsers[i]]);
  //               }
  //             }
  //           }
  //         }
  //         console.log("selecting after adding in num ", num);
  //         console.log("selecting after adding in selectedname ", selectedNames);
  //         setfla("0");
  //       }
  //     }
  //   }
  // }, [selectedGroupId, selectedGroupUsersLoading, num]);
  const {
    mutate: quizadd,
    isPending: isQuizPending,
    isSuccess: isQuizSuccess,
  } = AddQuiz();
  const {
    data: groupdata,
    isSuccess: isgroupSuccess,
    isError: isgroupError,
    isLoading,
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
  // console.log(allGroup);
  // const [f, setF] = useState(0);
  // useEffect(() => {
  //   if (f == 0) {
  //     for (let i = 0; i < allUsers.length; i++) {
  //       if (allUsers[i].roll === "570" || allUsers[i].roll === "834") {
  //         const c = num;
  //         c.push(allUsers[i].roll);
  //         setNum(c);

  //         const abc: Allnames[] = [];
  //         abc.push({
  //           name: allUsers[i].name,
  //           _id: allUsers[i]._id,
  //           roll: allUsers[i].roll,
  //         } as Allnames);
  //         setSelectedNames(abc);
  //       }
  //     }
  //   }
  // }, [f]);

  // const handleGroupChange = (e: { value: any }) => {
  //   setSelectedgroup(e.value);
  //   selectedgroup?.map((i) => {
  //     const currgroupdata = useAllGroupbyId(i._id);
  //     console.log(currgroupdata);
  //     return null; // map function expects a return value
  //   });
  // };
  const Generateque = () => {
    if (numQue == "0") {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Add number of question",
        life: 3000,
      });
      return;
    }
    const temp = selectedNames.map((city) => city._id);
    const abc: Allnames[] = [];
    temp.map((d, i) => {
      for (let k = 0; k < allUsers.length; k++) {
        if (allUsers[k]._id === d) {
          abc.push({
            name: allUsers[k].name,
            _id: allUsers[k]._id,
          } as Allnames);
        }
      }
    });
    // console.log(abc);
    if (numQue === "" || !title || !selectedNames || !starttime || !endtime) {
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
  useEffect(() => {
    // console.log(isQuizSuccess, "Quiz added in");
    if (isQuizSuccess) {
      <Toast ref={toast} />;
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Quiz Added Successfully",
        life: 3000,
      });
      navigate("/allquiz");
    }
  }, [isQuizSuccess]);
  const adddata = () => {
    if (!starttime || !endtime) return;

    quizadd({
      title: title,
      start_time: starttime.toISOString(),
      end_time: endtime.toISOString(),
      questions: all,
      users: selectedNames.map((city) => city._id),
    });

    // navigate("/AllQuiz");
  };
  const Submittodatabase = () => {
    let x = 0;
    for (let index = 0; index < all.length; index++) {
      const data = all[index];

      if (data.question === "" || data.options.length < 2) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Add All Questions",
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
            detail: "Add Option Properly",
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
          detail: "Select Correct Option",
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
      <div className="feed_container">
        <h3>Create Quiz</h3>
        {flag === 0 && (
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label htmlFor="question">Title</label>
              <InputText
                type="text"
                value={title}
                style={{ marginRight: "100px", height: "43px" }}
                className="p-inputtext-lg"
                onChange={(e) => setTitle(e.target.value)}
              />
              <div style={{ display: "flex", marginTop: "40px" }}>
                <div style={{ marginRight: "100px" }}>
                  <label htmlFor="question">Start Time</label>
                  <Calendar
                    value={starttime}
                    style={{ height: "43px", width: "234px" }}
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
                    style={{ height: "43px", width: "234px" }}
                    onChange={(e) => {
                      const temp = (e.value as Date) || null;
                      setEndTime(temp);
                    }}
                    showTime
                    hourFormat="12"
                  />
                </div>
              </div>
              <div style={{ marginTop: "40px" }}>
                <label htmlFor="question">
                  How many questions do you want to add ?{" "}
                </label>
                <InputText
                  style={{ width: "234px", height: "43px" }}
                  placeholder="Number"
                  onChange={(e) => {
                    setNumque(e.target.value);
                  }}
                />
              </div>
              <div style={{ marginTop: "40px" }}>
                <label htmlFor="question">Users Able to Attend Quiz</label>
                <Chips
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    // height: "80px",
                    // overflow: "scroll",
                    // marginTop: "10px",
                    // width: "100%",
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
                  // justifyContent: "space-around",
                  marginTop: "40px",
                }}
                // className="field col-12 md:col-4"
              >
                <div style={{ marginRight: "100px" }}>
                  <ListBox
                    filter
                    value={selectedgroup}
                    onChange={(e) => {
                      setSelectedgroup(e.value);
                      if (e.value == null || e.value?._id == "all") {
                        setSelectedGroupId("");
                        setSelectedgroup([]);
                        if (e.value == null && fla == "10") {
                          setSelectedGroupId("");
                          setSelectedgroup([]);
                          setSelectedNames([]);
                          setNum([]);
                          setfla("0");
                        } else if (e.value?._id == "all" && fla == "0") {
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
              <Button
                style={{ width: "200px", marginTop: "40px" }}
                onClick={Generateque}
              >
                Generate Quiz
              </Button>
            </div>
          </div>
        )}
        {flag === 1 && (
          <div>
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

export default Quiz;
