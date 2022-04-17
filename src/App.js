// App.js
import React, { useState, useRef, useEffect, useMemo } from "react";
// App.css
import "./App.css";
// export url
import DiaryEditor from "./components/DiaryEditor";
import DiaryList from "./components/DiaryList";
// icons
import {
  BsFillEmojiHeartEyesFill,
  BsFillEmojiFrownFill,
  BsFillEmojiSunglassesFill,
} from "react-icons/bs";

const App = () => {
  // weather api
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=35.800&lon=128.550&appid=27d5206b6b8a3e5de6084cc0618b62bb`;
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
        <div className="weather">
          <div>location</div>
          <div>temp</div>
          <div>Clouds</div>
        </div>
        <DiaryEditor onCreate={onCreate} />
        <div className="diary__info">
          <div className="info__title">
            <h3>전체 일기 : {data.length}</h3>
          </div>
          <div className="info__emotions">
            <p className="emotion__icons">
              <BsFillEmojiHeartEyesFill
                fontSize={24}
                style={{ marginRight: "5px" }}
              />{" "}
              : {goodCount}
            </p>
            <p className="emotion__icons">
              <BsFillEmojiFrownFill
                fontSize={24}
                style={{ marginRight: "5px" }}
              />{" "}
              : {badCount}
            </p>
            <p className="emotion__icons">
              <BsFillEmojiSunglassesFill
                fontSize={24}
                style={{ marginRight: "5px" }}
              />{" "}
              : {goodRatio}
            </p>
          </div>
        </div>
        <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
      </div>
    </div>
  );
};

export default App;
