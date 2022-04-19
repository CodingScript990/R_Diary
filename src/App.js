// App.js
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
} from "react";
// App.css
import "./App.css";
// axios
import axios from "axios";
// export url
import DiaryEditor from "./components/DiaryEditor";
import DiaryList from "./components/DiaryList";
// icons
import {
  BsFillEmojiHeartEyesFill,
  BsFillEmojiFrownFill,
  BsFillEmojiSunglassesFill,
} from "react-icons/bs";

// reducer function
const reducer = (state, action) => {
  // action type => state 별 rendering!
  switch (action.type) {
    // init
    case "INIT": {
      return action.data; // new setData => state
    }
    // create
    case "CREATE": {
      // create data time
      const crt_date = new Date().getTime();
      // newItem data
      const newItem = {
        ...action.data,
        crt_date,
      };
      return [newItem, ...state]; // create data, state
    }
    // remove
    case "REMOVE": {
      return state.filter((item) => item.id !== action.targertId); // filter => targetId !== item.id
    }
    // edit
    case "EDIT": {
      // map => item, content:aciton.newContent value
      return state.map((item) =>
        item.id === action.targertId
          ? { ...item, content: action.newContent }
          : item
      );
    }
    // default
    default:
      return state;
  }
};

// export[전역으로 사용하고자 할때] createContext function => provider => data
export const DiaryStataeContext = React.createContext();

// diaryDispatchContext로 onCreate, onRemove, onEdit을 관리하기 위함
export const DiaryDispatchContext = React.createContext();

const App = () => {
  // weather state
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("");
  // weather api
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=27d5206b6b8a3e5de6084cc0618b62bb`;
  // searchLocation eventHandler
  const searchLocation = (e) => {
    // if event key => Enter? start axios
    if (e.key === "Enter") {
      axios.get(url).then((res) => {
        setWeather(res.data);
      });
      // infinit location value
      setLocation("");
    }
  };
  // dummyList
  // const dummyList = [{}];
  // common data state[Array]
  // const [data, setData] = useState([]);
  // useReducer
  const [data, dispatch] = useReducer(reducer, []);
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
    // reducer[dispatch] action type => initData
    dispatch({ type: "INIT", data: initData });
    // setData => initData
    // setData(initData);
  };
  // mount => callback getData[api => response]
  useEffect(() => {
    // callback!
    getData();
  }, []);
  // create diary event handler
  const onCreate = useCallback((author, content, emotion) => {
    // props => author, content, emotion
    // create date
    // const crt_date = new Date().getTime();
    // new item Obj
    // const newItem = {
    //   author,
    //   content,
    //   emotion,
    //   crt_date,
    //   id: dataId.current,
    // };
    // reducer action.type => create[state]
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    // not same index number! add plus number one!
    dataId.current += 1;
    // save data => data, newItem
    // setData((data) => [newItem, ...data]);
  }, []);
  // Diary Item Delete event handler
  const onRemove = useCallback((targertId) => {
    // Parameters => targetId[매개변수]
    // filter => item id !== targetId
    // Delete 된 data를 제외
    // reducer action type => state
    dispatch({ type: "REMOVE", targertId });
    // setData((data) => data.filter((item) => item.id !== targertId));
  }, []);
  // DiaryItem parameter => Edit event handler(Modify event)
  const onEdit = useCallback((targertId, newContent) => {
    // reducer type "edit"
    dispatch({ type: "EDIT", targertId, newContent });
    // setData
    // setData(
    // data => item id, targetId 가 True이면 newContent에 값을 주고
    // data => item id, targetId  가 false이면 item data를 그대로 반환해줘라!
    //   (data) =>
    //     data.map((item) =>
    //       item.id === targertId ? { ...item, content: newContent } : item
    //     )
    // );
  }, []);

  // useMemo로 onCreate, onRemove, onEdit을 관리하기[rerendering이 되지 않게 하기 위함이다.]
  const memoizedDispatches = useMemo(() => {
    return { onEdit, onCreate, onRemove };
  }, []);

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
    // DiaryStataeContext.Provider => 공급자 Provider
    <DiaryStataeContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <div className="container">
            <div className="weather">
              <div className="weather__search">
                <input
                  type="search"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={searchLocation}
                  placeholder="Enter Location"
                />
              </div>
              <div className="weather__info">{weather.name}</div>
              <div className="weather__info__main">
                {weather.weather ? (
                  <div className="weather__info__icons">
                    {weather.weather[0].icon ? (
                      <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt="icons"
                      />
                    ) : null}
                  </div>
                ) : null}
                {weather.main ? (
                  <p className="weather__info__temp">
                    {weather.main.temp.toFixed()}℃
                  </p>
                ) : null}
              </div>
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
                  : {goodRatio.toFixed()}
                </p>
              </div>
            </div>
            <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
          </div>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStataeContext.Provider>
  );
};

export default App;
