import InfoLabel from './components/InfoLabel';
import TimeTable from './components/TimeTable';
import RotateWrapper from './components/RotateWrapper';

function App() {
    return (
        <div className="App xl:px-48 md:px-16 h-full">
            <div className="md:h-8"></div>

            <InfoLabel />
            <div>
                <RotateWrapper>
                    <TimeTable />
                </RotateWrapper>
                b
            </div>
        </div>
    );
}

export default App;
