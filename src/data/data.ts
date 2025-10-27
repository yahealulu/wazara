import type { Meeting } from "../types";

export const sections = [
    {
      title: "visitorsInformation",
      items: [
        { label: "name", value: "visitorsName" },
        { label: "contactPhoneNumber", value: "+1234567890" },
        { label: "emailAddress", value: "visitor@example.com" },
        { label: "Attendance", value: "3" },
      ],
    },
  ];
export const gols = [
    {
      title: "meetingGoalsTitle",
      text: "meetingGoalsText",
    },
    {
      title: "meetingImportanceTitle",
      text:  "meetingImportanceText",
    },
  ];
export const data: Record<string, { title: string; value: number; p : string}[]> = {
    Today: [
      { title: "meetings", p : "Complete", value: 24, },
      { title: "meetings",p: "Upcoming", value: 87, },
      { title: "visitors",p: "checkedIn", value: 48, },
    ],
    "Last Week": [
      { title: "meetings", p : "Complete", value: 234, },
      { title: "meetings",p: "Upcoming", value: 83, },
      { title: "visitors",p: "checkedIn", value: 43, },
    ],
    "Last Month": [
      { title: "meetings", p : "Complete", value: 24, },
      { title: "meetings",p: "Upcoming", value: 87, },
      { title: "visitors",p: "checkedIn", value: 48, },
    ],
  };
    export const dataState = [
    { id: 1, name: "John Doe", title: "Meeting 1", importance: "High", date: "Mon, 29 Sep, 2025", time: "1:00 PM" },
    { id: 2, name: "Jane Smith", title: "Meeting 2", importance: "Medium", date: "Tue, 30 Sep, 2025", time: "11:00 AM" },
    { id: 3, name: "Ali Ahmed", title: "Meeting 3", importance: "Low", date: "Wed, 1 Oct, 2025", time: "3:00 PM" },
  ];
export const meetingsToday: Meeting[] = [
  {
    id: 1,
    title: "Meeting 1",
    visitor: "Visitor 1",
    importance: "High",
    date: "Mon, 29 Sep, 2025",
    time: "1:00 PM",
    
  },
  {
    id: 2,
    title: "Meeting 2",
    visitor: "Visitor 2",
    importance: "Medium",
    date: "Tue, 30 Sep, 2025",
    time: "11:00 AM",
    
  },
  {
    id: 3,
    title: "Meeting 3",
    visitor: "Visitor 3",
    importance: "Low",
    date: "Wed, 1 Oct, 2025",
    time: "3:00 PM",
    
  },
];
export const meetingsLastWeek: Meeting[] = [
  {
    id: 1,
    title: "Meeting 3",
    visitor: "Visitor 1",
    importance: "High",
    date: "Mon, 29 Sep, 2025",
    time: "1:00 PM",
    
  },
  {
    id: 2,
    title: "Meeting 5",
    visitor: "Visitor 2",
    importance: "Medium",
    date: "Tue, 30 Sep, 2025",
    time: "11:00 AM",
    
  },
  {
    id: 3,
    title: "Meeting 9",
    visitor: "Visitor 3",
    importance: "Low",
    date: "Wed, 1 Oct, 2025",
    time: "3:00 PM",
    
  },
];
export const meetingsLastMonth: Meeting[] = [
  {
    id: 1,
    title: "Meeting 14",
    visitor: "Visitor 1",
    importance: "High",
    date: "Mon, 29 Sep, 2025",
    time: "1:00 PM",
    
  },
  {
    id: 2,
    title: "Meeting 22",
    visitor: "Visitor 2",
    importance: "Medium",
    date: "Tue, 30 Sep, 2025",
    time: "11:00 AM",
    
  },
  {
    id: 3,
    title: "Meeting 32",
    visitor: "Visitor 3",
    importance: "Low",
    date: "Wed, 1 Oct, 2025",
    time: "3:00 PM",
    
  },
];