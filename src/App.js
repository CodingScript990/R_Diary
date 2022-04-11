// App.js
import React, { useState, useRef } from "react";
import "./App.css";
import DiaryEditor from "./components/DiaryEditor";
import DiaryList from "./components/DiaryList";
import bgVideo from "./asset/bg-video.mp4";

const App = () => {
  // dummyList
  // const dummyList = [{}];
  // common data state[Array]
  const [data, setData] = useState([]);
  // reference state => dataId(index number => start zero![0] => 1...)
  const dataId = useRef(0);
  // create diary event handler
  const onCreate = (author, content, emotion) => {
    // props => author, content, emotion
    // create date
    const crt_date = new Date().getTime();
    // new item Obj
    const newItem = {
      author,
      content,
      emotion,
      crt_date,
      id: dataId.current,
    };
    // not same index number! add plus number one!
    dataId.current += 1;
    // save data => data, newItem
    setData([newItem, ...data]);
  };
  return (
    <div className="App">
      <div className="container">
        <DiaryEditor onCreate={onCreate} />
        <DiaryList diaryList={data} />
      </div>
    </div>
  );
};

export default App;
