import type { Meeting, MeetingCalender } from "../types";

export const meetings: Meeting[] = [
  // === اليوم ===
  { id: 1, title: "Meeting 1", visitor: "Visitor 1", importance: "High", date: "2025-10-14T09:00:00", time: "9:00 AM", state: "Accepted", week: 1 },
  { id: 2, title: "Meeting 2", visitor: "Visitor 2", importance: "Medium", date: "2025-10-14T11:00:00", time: "11:00 AM", state: "Pending", week: 1 },
  { id: 3, title: "Meeting 3", visitor: "Visitor 3", importance: "Low", date: "2025-10-14T14:00:00", time: "2:00 PM", state: "Canceled", week: 1 },

  // === غدًا ===
  { id: 4, title: "Meeting 4", visitor: "Visitor 4", importance: "High", date: "2025-10-15T10:00:00", time: "10:00 AM", state: "Accepted", week: 1 },
  { id: 5, title: "Meeting 5", visitor: "Visitor 5", importance: "Low", date: "2025-10-15T13:00:00", time: "1:00 PM", state: "Pending", week: 1 },
  { id: 6, title: "Meeting 6", visitor: "Visitor 6", importance: "Medium", date: "2025-10-15T15:30:00", time: "3:30 PM", state: "Canceled", week: 1 },

  // === هذا الأسبوع ===
  { id: 7, title: "Meeting 7", visitor: "Visitor 7", importance: "High", date: "2025-10-16T09:30:00", time: "9:30 AM", state: "Accepted", week: 1 },
  { id: 8, title: "Meeting 8", visitor: "Visitor 8", importance: "Medium", date: "2025-10-17T11:15:00", time: "11:15 AM", state: "Pending", week: 1 },
  { id: 9, title: "Meeting 9", visitor: "Visitor 9", importance: "Low", date: "2025-10-18T14:45:00", time: "2:45 PM", state: "Canceled", week: 1 },
  { id: 10, title: "Meeting 10", visitor: "Visitor 10", importance: "High", date: "2025-10-19T10:30:00", time: "10:30 AM", state: "Accepted", week: 1 },

  // === هذا الشهر ===
  { id: 11, title: "Meeting 11", visitor: "Visitor 11", importance: "Medium", date: "2025-10-21T09:45:00", time: "9:45 AM", state: "Pending", week: 3 },
  { id: 12, title: "Meeting 12", visitor: "Visitor 12", importance: "Low", date: "2025-10-23T15:15:00", time: "3:15 PM", state: "Canceled", week: 3 },
  { id: 13, title: "Meeting 13", visitor: "Visitor 13", importance: "High", date: "2025-10-25T11:00:00", time: "11:00 AM", state: "Accepted", week: 4 },
  { id: 14, title: "Meeting 14", visitor: "Visitor 14", importance: "Medium", date: "2025-10-27T14:30:00", time: "2:30 PM", state: "Pending", week: 4 },
  { id: 15, title: "Meeting 15", visitor: "Visitor 15", importance: "Low", date: "2025-10-30T10:00:00", time: "10:00 AM", state: "Canceled", week: 5 },
];
export const meetingsData: MeetingCalender[] = [

  // بيانات للأسبوع الحالي
  { id: 1, date: "2025-10-12", title: "Client Call", visitor: "Visitor 1", time: "09:00", day: "Sunday", week: 1, status: "Accepted" },
  { id: 2, date: "2025-10-14", title: "Client Call", visitor: "Visitor 1", time: "10:30", day: "Sunday", week: 1, status: "Accepted" },
  { id: 3, date: "2025-10-15", title: "Sprint Planning", visitor: "Visitor 2", time: "10:00", day: "Monday", week: 1, status: "Accepted" },
  { id: 4, date: "2025-10-16", title: "Team Sync", visitor: "Visitor 3", time: "09:30", day: "Tuesday", week: 1, status: "Pending" },
  { id: 5, date: "2025-10-17", title: "Demo Meeting", visitor: "Visitor 4", time: "11:00", day: "Wednesday", week: 1, status: "Canceled" },
  { id: 6, date: "2025-10-18", title: "Client Call", visitor: "Visitor 5", time: "09:00", day: "Thursday", week: 1, status: "Accepted" },

  // الأسبوع الثاني
  { id: 7, date: "2025-10-21", title: "Client Call", visitor: "Visitor 6", time: "09:00", day: "Sunday", week: 2, status: "Accepted" },
  { id: 8, date: "2025-10-22", title: "Sprint Planning", visitor: "Visitor 7", time: "10:00", day: "Monday", week: 2, status: "Accepted" },
];
