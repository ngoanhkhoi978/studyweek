import React, { useEffect, useLayoutEffect, useState } from 'react';
import { getCurrentWeek, getWeekDays } from "../utils/dateUtils";
import data from '../datas/datas.json'


function TimeTable() {

    const [schedule, setSchedule] = useState({});
    const [startOfWeek, setStartOfWeek] = useState([0,'2024/01/01']);

    const week = getCurrentWeek(startOfWeek)
    const weekDays = getWeekDays();
    const dayOfWeek =['Hai','Ba','Tư','Năm','Sáu','Bảy','CN']

    useLayoutEffect(() => {
        setSchedule(data.schedule)
        setStartOfWeek(data.startOfWeek)
    }, []);

    

    return (
        <div className="xl:px-48 md:px-16">
            <table className="w-full">
                <thead className="bg-slate-100 w-full">
                    <tr>
                        <th className='text-rose-900'>Tuần {startOfWeek[0]}</th>
                        {dayOfWeek.map((value, index) => (
                            <th key={index} className="">
                                <div className="text-[16px] font-sans text-slate-500 uppercase">{value}<br/> {weekDays[index]}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="">
                    {Array.from({ length: 13 }, (_, index) => index + 1).map((index) => (
                        <tr className="border-b-[1px]" key={index}>
                            <td className="text-center py-3 font-bold text-[16px] font-sans text-slate-500"><span className='hidden md:inline'>Tiết</span> {index}</td>
                            {Object.keys(schedule).map((dow, i) => {
                                let hasSubject = false;
                                
                                for (const subject of schedule[dow]) {
                                    if (subject.periods[0] === index && 
                                        (subject.type === "all" || 
                                        (subject.type === "odd" && week % 2 === 1) || 
                                        (subject.type === "even" && week % 2 === 0))) {
                                        hasSubject = true;
                                        return (
                                            <td key={`${dow}-${subject.subject}-${index}`} style={{background:subject.color}} className="min-h-40 font-medium text-[18px] max-w-px overflow-hidden text-center align-middle text-white py-5 px-3" rowSpan={subject.periods[1] - subject.periods[0] + 1}>
                                                {subject.subject}
                                                <br />
                                                <span className="text-[12px]">{subject.room}</span>
                                            </td>
                                        );
                                    }
                                }

                                if (!hasSubject) {
                                    return <td key={`${dow}-empty-${index}`}></td>;
                                }
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default TimeTable;