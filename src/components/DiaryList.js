// DiaryList.js
import React from "react";
import DiaryItem from "./DiaryItem";

const DiaryList = ({ dummyList }) => {
  // dummyList => props!
  return (
    <div className="diaryList">
      <h2>Diary List</h2>
      <h3>{dummyList.length}개의 일기가 있습니다.</h3>
      <div>
        {/* item list => diaryitem[id, ...state] */}
        {dummyList.map((item) => (
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
