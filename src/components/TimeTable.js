import React, { useEffect, useState } from 'react';
import { getCurrentWeek, getWeekDays } from "../utils/dateUtils";

const schedule = {
    "Monday": [
      { "subject": "Triết học Mác-Lênin", "periods": [8,10], "type": "all","room":"P.I.5" ,"color":"#fff"}
    ],
    "Tuesday": [
      { "subject": "Kỹ năng tạo động lực cho bản thân", "periods": [8,9], "type": "all","room":"E.II.1" ,"color":"#fff"}
    ],
    "Wednesday": [
      { "subject": "Tin học", "periods": [1,2], "type": "even","room":"B.III.6" ,"color":"#fff"},
      { "subject": "Lịch sử tâm lý học", "periods": [6,7], "type": "all","room":"C.III.3" ,"color":"#fff"},
      { "subject": "Sinh lý học thần kinh", "periods": [8,9], "type": "all","room":"C.III.5" ,"color":"#fff"}
    ],
    "Thursday": [
      { "subject": "Tin học", "periods": [3,4], "type": "odd","room":"E.II.1" ,"color":"#fff"}
    ],
    "Friday": [
      { "subject": "Giáo dục thể chất 1", "periods": [1,2], "type": "all","room":"TD.10" ,"color":"#fff"},
      { "subject": "Tâm lý học đại cương", "periods": [8,10], "type": "all","room":"P.I.5" ,"color":"#fff"}
    ],
    "Saturday": [],
    "Sunday": []
  }

const startOfWeek = [3,"2024-09-09"]
const week = getCurrentWeek(startOfWeek)

const dayOfWeek =['Hai','Ba','Tư','Năm','Sáu','Bảy','CN']
const weekDays = getWeekDays();


function TimeTable() {
    return (
        <div className="xl:px-48 md:px-16">
            <table className="w-full">
                <thead className="bg-slate-100 w-full">
                    <tr>
                        <th>Tuần {startOfWeek[0]}</th>
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
                            <td className="text-center py-3 font-bold text-[16px] font-sans text-slate-500 uppercase">{index}</td>
                            {Object.keys(schedule).map((dow, i) => {
                                let hasSubject = false; // Để kiểm tra xem có môn học không
                                
                                for (const subject of schedule[dow]) {
                                    if (subject.periods[0] === index && 
                                        (subject.type === "all" || 
                                        (subject.type === "odd" && week % 2 === 1) || 
                                        (subject.type === "even" && week % 2 === 0))) {
                                        hasSubject = true; // Đánh dấu rằng đã có môn học
                                        return (
                                            <td key={`${dow}-${subject.subject}-${index}`} className="min-h-40 max-w-px overflow-hidden bg-slate-600 text-center align-middle text-white" rowSpan={subject.periods[1] - subject.periods[0] + 1}>
                                                {subject.subject}
                                                <br />
                                                <span className="text-[12px]">{subject.room}</span>
                                            </td>
                                        );
                                    }
                                }

                                // Trả về một ô trống nếu không có môn học
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