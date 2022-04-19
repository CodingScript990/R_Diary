// DiaryList.js
import React, { useContext } from "react";
// import
import DiaryItem from "./DiaryItem";
// icons
import { AiOutlineCarryOut } from "react-icons/ai";
// url
import { DiaryStataeContext } from "../App";

const DiaryList = () => {
  // onRemove => prop drilling : 최상의 props를 하위 component에 데이터를 전달하는 방식을 말한다. React Component Tree의 한 부분이다.
  // useContext hook 으로 state => list를 관리해준다.
  const diaryList = useContext(DiaryStataeContext);
  return (
    <div className="diaryList">
      <h2>
        <AiOutlineCarryOut
          fontSize={24}
          style={{ color: "#CC70EF", marginRight: "10px" }}
        />
        Diary List
      </h2>
      <h3>{diaryList.length}개의 일기가 있습니다.</h3>
      <div>
        {/* item list => diaryitem[id, ...state] */}
        {diaryList.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

// default props![필수!]
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
