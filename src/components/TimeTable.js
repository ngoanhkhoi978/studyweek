import React, { useCallback, useLayoutEffect, useState } from 'react';
import clsx from 'clsx';

import { getCurrentWeek, getWeekDays, isToday } from '../utils/dateUtils';
import data from '../datas/datas.json';

function TimeTable() {
    const [schedule, setSchedule] = useState({});
    const [startOfWeek, setStartOfWeek] = useState(data.startOfWeek);

    const week = getCurrentWeek(startOfWeek);
    const weekDays = getWeekDays();
    const dayOfWeek = ['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'CN'];

    let columnSpans = new Array(7).fill(0);

    useLayoutEffect(() => {
        setSchedule(data.schedule);
        setStartOfWeek(data.startOfWeek);
    }, []);

    return (
        <div className="px-0">
            <table className="w-full">
                <thead className="bg-slate-100">
                    <tr>
                        <th></th>
                        <th className="text-rose-900 text-[22px]">
                            <span className="hidden md:inline">Tuần</span> {week}
                        </th>
                        {dayOfWeek.map((value, index) => (
                            <th
                                key={index}
                                className={clsx({
                                    'bg-[#e1e5e9]': isToday(weekDays[index]),
                                })}
                            >
                                <div className="text-[16px] font-sans text-slate-500 uppercase">
                                    {value}
                                    <br /> {weekDays[index]}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 13 }, (_, rowIndex) => {
                        let currentColumn = 0;

                        return (
                            <tr className="border-b-[1px]" key={rowIndex}>
                                <td
                                    className={clsx({
                                        'bg-blue-900': rowIndex <= 5 && rowIndex >= 1,
                                        'bg-red-800': rowIndex >= 6 && rowIndex <= 10,
                                        'bg-slate-500': rowIndex >= 11 && rowIndex <= 13,
                                    })}
                                ></td>
                                <td className="text-center py-3 font-bold text-[16px] font-sans text-slate-500">
                                    <span className="hidden md:inline">Tiết</span> {rowIndex + 1}
                                </td>
                                {Object.keys(schedule).map((dow, i) => {
                                    if (columnSpans[i] > 0) {
                                        columnSpans[i]--;
                                        currentColumn++;
                                        return null;
                                    }

                                    let hasSubject = false;

                                    for (const subject of schedule[dow]) {
                                        if (
                                            subject.periods[0] === rowIndex + 1 &&
                                            (subject.type === 'all' ||
                                                (subject.type === 'odd' && week % 2 === 1) ||
                                                (subject.type === 'even' && week % 2 === 0))
                                        ) {
                                            hasSubject = true;

                                            columnSpans[i] = subject.periods[1] - subject.periods[0];

                                            return (
                                                <td
                                                    key={`${dow}-${subject.subject}-${rowIndex}`}
                                                    style={{
                                                        background: subject.color,
                                                        textShadow: '2px 1px 2px rgba(0, 0, 0, 0.5)',
                                                    }}
                                                    className={clsx(
                                                        'min-h-40 font-medium text-[18px] max-w-px overflow-hidden text-center align-middle text-[#fff] py-5 px-3 shadow-black rounded-md',
                                                        {
                                                            'today-column': isToday(weekDays[i]),
                                                        },
                                                    )}
                                                    rowSpan={subject.periods[1] - subject.periods[0] + 1}
                                                >
                                                    {subject.subject}
                                                    <br />
                                                    <span className="text-[12px]">{subject.room}</span>
                                                </td>
                                            );
                                        }
                                    }

                                    if (!hasSubject) {
                                        currentColumn++;
                                        return (
                                            <td
                                                key={`${dow}-empty-${rowIndex}`}
                                                className={clsx({
                                                    'bg-[#f8ffdc]': isToday(weekDays[i]),
                                                })}
                                            ></td>
                                        );
                                    }
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TimeTable;
