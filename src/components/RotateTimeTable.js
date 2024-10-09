import RotateWrapper from './RotateWrapper';
import TimeTable from './TimeTable';
import { useState } from 'react';

function RotateTimeTable() {
    const [isRotate, setIsRotate] = useState(false);

    return (
        <RotateWrapper
            duration={0.5}
            isRotate={isRotate}
            onClick={() => {
                setIsRotate((pre) => !pre);
            }}
        >
            <TimeTable />
        </RotateWrapper>
    );
}

export default RotateTimeTable;
