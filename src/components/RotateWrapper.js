import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

function RotateWrapper({ children }) {
    const [rotation, setRotation] = useState(0);
    const [speed, setSpeed] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('bo m dang chay');
            setRotation((pre) => pre + speed);
        }, 100);
        return () => {
            clearInterval(interval);
        };
    });

    return (
        <div
            className="relative"
            onClick={() => {
                setSpeed(100);
            }}
        >
            <motion.div animate={{ rotate: rotation }} className="absolute relative">
                {children}
            </motion.div>
        </div>
    );
}

export default RotateWrapper;
