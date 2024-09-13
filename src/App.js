import InfoLabel from "./components/InfoLabel";
import TimeTable from "./components/TimeTable";

function App() {
  return (
    <div className="App xl:px-48 md:px-16">
      <div className="md:h-8"></div>
      <TimeTable/>
      <InfoLabel/>
    </div>
  );
}

export default App;
