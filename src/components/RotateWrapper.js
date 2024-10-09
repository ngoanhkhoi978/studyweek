import { motion } from 'framer-motion';

function RotateWrapper({ children, isRotate = true, duration = 1, ...props }) {
    return (
        <div className="relative" {...props}>
            <motion.div
                animate={isRotate ? { rotate: [0, 360], scale: [0.5, 3, 0.5] } : { rotate: 0, scale: 1 }}
                className="absolute relative"
                transition={
                    isRotate
                        ? {
                              repeat: Infinity, // Lặp vô hạn
                              duration: duration,
                              ease: 'linear',
                          }
                        : { duration: 0 }
                }
            >
                {children}
            </motion.div>
        </div>
    );
}

export default RotateWrapper;
