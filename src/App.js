// App.js
import React, { useState, useRef, useEffect, useMemo } from "react";
import "./App.css";
import DiaryEditor from "./components/DiaryEditor";
import DiaryList from "./components/DiaryList";

const App = () => {
  // dummyList
  // const dummyList = [{}];
  // common data state[Array]
  const [data, setData] = useState([]);
  // reference state => dataId(index number => start zero![0] => 1...)
  const dataId = useRef(0);
  // API response
  const getData = async () => {
    // response url[api]
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    // slice => 0 ~ 20 show the data
    const initData = res.slice(0, 20).map((item) => {
      // return => author[email]
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        crt_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    // setData => initData
    setData(initData);
  };
  // mount => callback getData[api => response]
  useEffect(() => {
    // callback!
    getData();
  }, []);
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

  // getDiaryAnalysis => useMemo(emotion up, down list) => computational optimization[useMemo => goodCount, badCount, goodRaito]
  const getDiaryAnalysis = useMemo(() => {
    // emotion => Show the 3 ↑ is length
    const goodCount = data.filter((item) => item.emotion >= 3).length;
    // emotion => bad count
    const badCount = data.length - goodCount;
    // emotion => good ratio
    const goodRatio = (goodCount / data.length) * 100;
    // return => goodCount, badCount, goodRatio
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  // obj calling getDiaryAnalysis value
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <div className="container">
        {/* <Lifecycle /> */}
        <DiaryEditor onCreate={onCreate} />
        <div>전체 일기 : {data.length}</div>
        <div>기분 좋은 일기 개수 : {goodCount}</div>
        <div>기분 나쁜 일기 개수 : {badCount}</div>
        <div>기분 좋은 일기 비율 : {goodRatio}</div>
        <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
      </div>
    </div>
  );
};

export default App;
