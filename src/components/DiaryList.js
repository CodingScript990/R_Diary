// DiaryList.js
import React from "react";
// import
import DiaryItem from "./DiaryItem";
// icons
import { AiOutlineCarryOut } from "react-icons/ai";

const DiaryList = ({ diaryList }) => {
  // dummyList => props!
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
