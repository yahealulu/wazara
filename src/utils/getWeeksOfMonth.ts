export interface WeekRange {
  week: number;       // رقم الأسبوع
  startDate: Date;
  endDate: Date;
  days: Date[];
}

export function getWeeksFromDate(start: Date, numberOfWeeks: number): WeekRange[] {
  const weeks: WeekRange[] = [];

  // البدء من تاريخ محدد بدلاً من الانتظار للأحد القادم
  const currentDate = new Date(start);
  
  // نبدأ من الأحد الحالي أو الماضي
  const dayOfWeek = currentDate.getDay(); // 0: الأحد, 6: السبت
  
  // الرجوع إلى الأحد الماضي أو البقاء في الأحد الحالي
  const daysFromSunday = dayOfWeek === 0 ? 0 : -dayOfWeek;
  currentDate.setDate(currentDate.getDate() + daysFromSunday);

  for (let w = 0; w < numberOfWeeks; w++) {
    const days: Date[] = [];

    // نضيف فقط الأحد إلى الخميس (5 أيام)
    for (let i = 0; i < 5; i++) {
      const day = new Date(currentDate);
      days.push(day);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    weeks.push({
      week: w + 1,
      startDate: days[0],
      endDate: days[days.length - 1],
      days,
    });

    // تخطي الجمعة والسبت
    currentDate.setDate(currentDate.getDate() + 2);
  }

  return weeks;
}