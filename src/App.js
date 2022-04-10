// App.js
import "./App.css";
import DiaryEditor from "./components/DiaryEditor";
import DiaryList from "./components/DiaryList";

const App = () => {
  // dummyList
  const dummyList = [
    {
      id: 1,
      author: "lee jin",
      content: "hi~!",
      emotion: 5,
      created_date: new Date().getTime(),
    },
    {
      id: 2,
      author: "park kim",
      content: "hola!",
      emotion: 1,
      created_date: new Date().getTime(),
    },
    {
      id: 3,
      author: "jenny",
      content: "gogo!",
      emotion: 2,
      created_date: new Date().getTime(),
    },
    {
      id: 4,
      author: "ji woo",
      content: "come on!",
      emotion: 3,
      created_date: new Date().getTime(),
    },
    {
      id: 5,
      author: "sun mi",
      content: "nal do go ga shi na?",
      emotion: 4,
      created_date: new Date().getTime(),
    },
  ];
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList dummyList={dummyList} />
    </div>
  );
};

export default App;
