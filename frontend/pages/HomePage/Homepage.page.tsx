import { useEffect, useState } from "react";
import { Card } from "../../components/Atoms/Card";
import { Skeleton } from "../../components/Atoms/Skeleton";
import { MainLayout } from "../../components/Layouts/MainLayout";
import { ChatWidget } from "../../components/widget";

import backgroundImage from "../../src/assets/background1.png";
import backgroundImage2 from "../../src/assets/bgimg2.png";
import backgroundImage3 from "../../src/assets/bgimg3.png";

import {
  ArrowRight,
  AttendanceIcon,
  BookIcon,
  CalenderIcon,
  LearningIcon,
  NoteIcon,
} from "../../components/Icon";

import { Button } from "../../components/Atoms/Button";

// Overview cards
const overview = [
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
const WEEKDAYS = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const MONTHS = [
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

const currentDate = new Date();

const formattedDate = `${
  WEEKDAYS[currentDate.getDay()]
}, ${currentDate.getDate()} ${MONTHS[currentDate.getMonth()]}`;

const classData = [
  {
    id: "assignment-1",
    icon: (
      <NoteIcon
        size={40}
        color="var(--color-tertiary)"
        className="bg-primary rounded-4xl"
        fill="blue"
      />
    ),
    title: "Lab1",
    dueDate: "1 Dec, 2026",
  },
  {
    id: "assignment-2",
    icon: <NoteIcon />,
    title: "Lab2",
    dueDate: "1 Nov, 2026",
  },
  {
    id: "assignment-3",
    icon: <NoteIcon />,
    title: "Lab3",
    dueDate: "1 Sept, 2026",
  },
];

const classes = [
  {
    id: "class-1",
    title: "OOSD",
    description: "BSE/25A/FT1",
    backgroundImage,
    assignments: classData,
    buttonDown: (
      <Button size="sm" className="ml-auto" variant="ghost">
        <p>View Classes</p>
        <ArrowRight />
      </Button>
    ),
  },
  {
    id: "class-2",
    title: "ASAS",
    description: "BSE/25A/FT1",
    backgroundImage: backgroundImage2,
    assignments: classData,
    buttonDown: (
      <Button size="sm" className="ml-auto" variant="ghost">
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
    button: <Button variant="ghost">View Calendar</Button>,
  },
];

const profilename = "Harsh";

export const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setIsLoading(false), 700);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6 overflow-hidden">
        {/* Welcome Section */}
        <section aria-labelledby="home-heading">
          <Card
            id="welcome-card"
            className="min-h-52 bg-cover bg-center text-white"
            style={{
              backgroundImage: `url("${backgroundImage}")`,
            }}
          >
            <p className="text-sm font-medium text-blue-100">Your classroom</p>

            <h1
              id="home-heading"
              className="mt-1 flex flex-row gap-2 text-2xl font-bold text-white sm:text-3xl"
            >
              Welcome back,
              <span className="text-success">{profilename}</span>
            </h1>

            <p className="mt-2 max-w-xl text-blue-50">
              Keep track of your classes, assignments, and progress.
            </p>

            {/* Overview Cards */}
            <section
              aria-label="Classroom overview"
              aria-busy={isLoading}
              className="my-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
              {overview.map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  className="min-h-24 hover:scale-102 hover-mode"
                >
                  {isLoading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-2/5" />
                      <Skeleton className="h-8 w-1/3" rounded="sm" />
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-row gap-4">
                        <span>{item.logo}</span>

                        <div className="flex flex-col">
                          <p className="text-sm text-text-secondary">
                            {item.label}
                          </p>

                          <p className="mt-3 text-2xl font-bold text-foreground">
                            {item.value}
                          </p>
                        </div>
                      </div>

                      <Button className="ml-auto" variant="ghost">
                        {item.icon}
                      </Button>
                    </>
                  )}
                </Card>
              ))}
            </section>
          </Card>
        </section>

        {/* My Classes Section */}
        <section aria-labelledby="classes-heading">
          <h2 id="classes-heading" className="font-bold text-xl mb-4">
            My Classes
          </h2>

          <div className="flex w-full flex-col gap-4 sm:flex-row">
            {classes.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                className="relative flex min-h-56 w-full items-end overflow-hidden bg-cover bg-center hover-mode text-white hover:scale-102"
                style={{
                  backgroundImage: `url("${item.backgroundImage}")`,
                }}
              >
                <div className="mt-1 flex w-full flex-row items-center gap-2 text-2xl font-bold text-white/80">
                  <div className="flex w-full flex-col">
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-col">
                        <span className="flex flex-row gap-3">
                          {item.logo}
                          {item.title}
                        </span>

                        <span className="text-sm">{item.description}</span>
                      </div>

                      <span>{item.button}</span>
                    </div>

                    <span className="text-sm text-foreground/60">
                      {item.displaydate}
                    </span>

                    <Card
                      id={`${item.id}-content`}
                      variant="outline"
                      className="mt-5 w-full min-h-40 backdrop-blur-2xl border-none"
                    >
                      {item.assignments.map((assignment) => (
                        <div
                          key={assignment.id}
                          id={`${item.id}-${assignment.id}`}
                          className="flex items-center gap-3 py-2"
                        >
                          <span>{assignment.icon}</span>

                          <div className="flex flex-col">
                            <p className="text-sm font-medium">
                              {assignment.title}
                            </p>

                            <p className="text-xs text-white/60">
                              Due: {assignment.dueDate}
                            </p>
                          </div>
                        </div>
                      ))}

                      {item.buttonDown}
                    </Card>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <ChatWidget />
    </MainLayout>
  );
};
