import type { JSX } from "react";

export type TabId = "Goals & Importance" | "Attendance" | "Links & Attachments" | "Notes";
export type InfoItemProps = {
  label: string;
  value: string;
};
export interface TabDef {
  id: TabId;
  label: string;
  component: JSX.Element;
  show?: (path: string) => boolean;
}
export interface MeetingCalender {
  id: number;
  title: string;
  visitor: string;
  time: string; // "09:00"
  date: string; // "Sunday"
  status: "Accepted" | "Canceled" | "Pending";
  week: number;
  day : string
}

export interface MeetingCardProps {
  meeting: MeetingCalender;
}
export type InfoItemType = {
  label: string;
  value: string;
};

export type SectionProps = {
  title: string;
  items: InfoItemType[];
};
export interface Column {
  key: keyof Meeting;
  label: string;
}

export interface TableOverProps {
  columns: Column[]; // الأعمدة الديناميكية
  data: Meeting[];
  hideActions?: boolean;
  onRowClick?: (id: string | number) => void;
  renderActions?: (meeting: Meeting) => React.ReactNode; // لتمرير أزرار مخصصة
}

export interface Meeting {
  id: string | number;
  title?: string;
  visitor?: string;
  importance?: string;
  date?: string;
  time?: string;
  state?: string;
  stateOriginal?: string;
  duration?: number;
  [key: string]: string | number | undefined;
}