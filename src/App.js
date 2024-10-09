import InfoLabel from './components/InfoLabel';
import TimeTable from './components/TimeTable';
import RotateWrapper from './components/RotateWrapper';
import RotateTimeTable from './components/RotateTimeTable';

function App() {
    return (
        <div className="App xl:px-48 md:px-16 h-full">
            <div className="md:h-8"></div>
            <InfoLabel />
            <RotateTimeTable />
        </div>
    );
}

export default App;
