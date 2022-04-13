// App.js
import React, { useState, useRef } from "react";
import "./App.css";
import DiaryEditor from "./components/DiaryEditor";
import DiaryList from "./components/DiaryList";
import Lifecycle from "./components/Lifecycle";

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
  // Diary Item Delete event handler
  const onRemove = (targertId) => {
    // Parameters => targetId[매개변수]
    console.log(`${targertId}가 삭제 되었습니다.`);
    // filter => item id !== targetId
    const newDiaryList = data.filter((item) => item.id !== targertId);
    // Delete 된 data를 제외
    setData(newDiaryList);
  };
  // DiaryItem parameter => Edit event handler(Modify event)
  const onEdit = (targertId, newContent) => {
    // setData
    setData(
      // data => item id, targetId 가 True이면 newContent에 값을 주고
      // data => item id, targetId  가 false이면 item data를 그대로 반환해줘라!
      data.map((item) =>
        item.id === targertId ? { ...item, content: newContent } : item
      )
    );
  };

  return (
    <div className="App">
      <div className="container">
        <Lifecycle />
        <DiaryEditor onCreate={onCreate} />
        <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
      </div>
    </div>
  );
};

export default App;
