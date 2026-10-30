
import backgroundImage from "../../src/assets/background1.png";
import backgroundImage2 from "../../src/assets/bgimg2.png";
import backgroundImage3 from "../../src/assets/bgimg3.png";
import {
  ArrowRight,
  AssignmentIcon,
  AttendanceIcon,
  BookIcon,
  CalenderIcon,
  LearningIcon,
  ResourcesIcon,
  TeamIcon,
} from "../../components/Icon";

import { Button } from "../../components/Atoms/Button";
export const overview = [
  {
    id: "overview-1",
    logo: <BookIcon fill="var(--color-secondary)" size={50} />,
    label: "Active classes",
    value: "06",
    icon: <ArrowRight />,
  },
  {
    id: "overview-2",
    logo: <LearningIcon fill="var(--color-secondary)" size={50} />,
    label: "Assignments due",
    value: "03",
    icon: <ArrowRight />,
  },
  {
    id: "overview-3",
    logo: <AttendanceIcon fill="var(--color-secondary)" size={50} />,
    label: "Grades",
    value: "94%",
    icon: <ArrowRight />,
  },
];

// Date formatting
export const WEEKDAYS = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const currentDate = new Date();

export const formattedDate = `${
  WEEKDAYS[currentDate.getDay()]
}, ${currentDate.getDate()} ${MONTHS[currentDate.getMonth()]}`;

export const classData = [
  {
    id: "assignment-1",
    icon: (
      <ResourcesIcon
        size={25}
        color="var(--color-primary-light)"
        fill="blue"
      />
    ),
    title: "Lab1",
    dueDate: "1 Dec, 2026",
  },
  {
    id: "assignment-2",
    icon: <AssignmentIcon size={32} color="var(--color-tertiary)" />,
    title: "Lab2",
    dueDate: "1 Nov, 2026",
  },
  {
    id: "assignment-3",
    icon: <TeamIcon size={30} color="var(--color-primary-light)" />,
    title: "Group Work",
    dueDate: "1 Sept, 2026",
  },
];

export const asasClassData = [
  {
    id: "assignment-1",
    icon: <AssignmentIcon size={32} color="var(--color-tertiary)" />,
    title: "Essay draft",
    dueDate: "14 Nov, 2026",
  },
  {
    id: "assignment-2",
    icon: (
      <ResourcesIcon
        size={25}
        color="var(--color-primary-light)"
        fill="blue"
      />
    ),
    title: "Case study",
    dueDate: "22 Nov, 2026",
  },
  {
    id: "assignment-3",
    icon: <TeamIcon size={30} color="var(--color-primary-light)" />,
    title: "Presentation",
    dueDate: "5 Dec, 2026",
  },
];

export const classes = [
  {
    id: "class-1",
    title: "OOSD",
    description: "Continue learning in your class workspace.",
    backgroundImage,
    assignments: classData,
    buttonDown: (
      <Button key="view-oosd" size="sm" className="ml-auto" variant="ghost">
        <p>View Classes</p>
        <ArrowRight />
      </Button>
    ),
  },
  {
    id: "class-2",
    title: "ASAS",
    description: "Continue learning in your class workspace.",
    backgroundImage: backgroundImage2,
    assignments: asasClassData,
    buttonDown: (
      <Button key="view-asas" size="sm" className="ml-auto" variant="ghost">
        <p>View Classes</p>
        <ArrowRight />
      </Button>
    ),
  },
  {
    id: "calendar-1",
    logo: <CalenderIcon size={35} />,
    displaydate: formattedDate,
    title: "Today",
    backgroundImage: backgroundImage3,
    assignments: [],
    button: <Button key="view-calendar" variant="ghost">View Calendar</Button>,
  },
];

export const profilename = "Harsh";