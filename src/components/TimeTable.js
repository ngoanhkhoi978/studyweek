import React, {useCallback, useLayoutEffect, useState } from 'react';
import clsx from 'clsx';

import { getCurrentWeek, getWeekDays, isToday } from "../utils/dateUtils";
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
        <div className="px-0">
            <table className="w-full">
                <thead className="bg-slate-100">
                    <tr className=''>
                        <th></th>
                        <th className='text-rose-900 text-[22px]'><span className='hidden md:inline'>Tuần</span> {startOfWeek[0]}</th>
                        {dayOfWeek.map((value, index) => (
                            <th key={index} className={clsx({
                                "bg-[#bfc2c5]":isToday(weekDays[index])
                            })}>
                                <div className="text-[16px] font-sans text-slate-500 uppercase">{value}<br/> {weekDays[index]}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="">
                    {Array.from({ length: 13 }, (_, index) => index + 1).map((index) => (
                        <tr className="border-b-[1px]" key={index}>
                            <td className={clsx({
                                "bg-blue-900 ":(index<=5 && index>=1),
                                "bg-red-800":(index>=6 && index<=10),
                                "bg-slate-500":(index>=11 && index<=13)
                            })}></td>
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
                                            <td
                                                key={`${dow}-${subject.subject}-${index}`}
                                                style={{background:subject.color, textShadow:"2px 1px 2px rgba(0, 0, 0, 0.5)"}}
                                                className="min-h-40 font-medium text-[18px] max-w-px overflow-hidden text-center align-middle text-[#fff] py-5 px-3 shadow-black rounded-md"
                                                rowSpan={subject.periods[1] - subject.periods[0] + 1}
                                                    >{subject.subject}
                                                    <br />
                                                    <span className="text-[12px]">{subject.room}</span>
                                            </td>
                                        );
                                    }
                                }
                                

                                if (!hasSubject) {
                                    return (<td key={`${dow}-empty-${index}`}></td>)
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