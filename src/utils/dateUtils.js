export function getWeekDays() {
    const today = new Date();
    const weekDays = [];
    
    const currentDay = today.getDay();
    const mondayIndex = (currentDay === 0) ? -6 : 1 - currentDay;

    for (let i = 0; i < 7; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() + mondayIndex + i);
        const formattedDate = String(day.getDate()).padStart(2, '0') + '/' +
                              String(day.getMonth() + 1).padStart(2, '0')
        weekDays.push(formattedDate);
    }

    return weekDays;
}


export function getCurrentWeek(startOfWeek) {
    const [startWeek, startDateString] = startOfWeek;
    const startDate = new Date(startDateString);
    const current = new Date();
    const timeDifference = current - startDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    const weeksPassed = Math.floor(daysDifference / 7);
    const currentWeek = startWeek + weeksPassed;
    return currentWeek;
}

export function isToday(dateString) {
    // Lấy ngày hiện tại
    const today = new Date();
    
    // Chuyển đổi ngày thành định dạng "DD/MM"
    const currentDay = today.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });

    // So sánh
    return currentDay === dateString;
}