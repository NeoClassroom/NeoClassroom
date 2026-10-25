import { useEffect, useState } from "react";
import { Card } from "../../components/Atoms/Card";
import { Skeleton } from "../../components/Atoms/Skeleton";
import { MainLayout } from "../../components/Layouts/MainLayout";
import { ChatWidget } from "../../components/widget";
import backgroundImage from "../../src/assets/background1.png";
import backgroundImage2 from "../../src/assets/bgimg2.png";

import {
  ArrowRight,
  AttendanceIcon,
  BookIcon,
  CalenderIcon,
  LearningIcon,
} from "../../components/Icon";
import { Button } from "../../components/Atoms/Button";

const overview = [
  {
    logo: <BookIcon fill="var(--color-secondary)" size={50} />,
    label: "Active classes",
    value: "06",
    icon: <ArrowRight />,
  },
  {
    logo: <LearningIcon fill="var(--color-secondary)" size={50} />,
    label: "Assignments due",
    value: "03",
    icon: <ArrowRight />,
  },
  {
    logo: <AttendanceIcon fill="var(--color-secondary)" size={50} />,
    label: "Grades",
    value: "94%",
    icon: <ArrowRight />,
  },
];
const currentDate = new Date();

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

const formattedDate = `${WEEKDAYS[currentDate.getDay()]}, ${currentDate.getDate()} ${MONTHS[currentDate.getMonth()]}`;
const classes = [
  {
    title: "OOSD",
    description: "BSE/25A/FT1",
    backgroundImage: backgroundImage,
  },
  {
    title: "ASAS",
    description: "BSE/25A/FT1",
    backgroundImage: backgroundImage2,
  },
  {
    logo: <CalenderIcon size={35} />,
    displaydate: formattedDate,
    title: "Today",
    button: (
      <Button variant="secondary" className="text-foreground/50 ml-auto">
        {" "}
        View Calendar
      </Button>
    ),
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
      <div className="space-y-6">
        <section aria-labelledby="home-heading">
          <Card
            className="min-h-52 bg-cover bg-center text-white"
            style={{
              backgroundImage: `url("${backgroundImage}")`,
            }}
          >
            <p className="text-sm font-medium text-blue-100">Your classroom</p>
            <h1
              id="home-heading"
              className="mt-1 text-2xl font-bold text-white sm:text-3xl flex flex-row gap-2"
            >
              Welcome back, <p className="text-success"> {profilename}</p>
            </h1>
            <p className="mt-2 max-w-xl text-blue-50">
              Keep track of your classes, assignments, and progress.
            </p>
            <section
              aria-label="Classroom overview"
              aria-busy={isLoading}
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 my-5 "
            >
              {overview.map((item) => (
                <Card key={item.label} className="min-h-24">
                  {isLoading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-2/5" />
                      <Skeleton className="h-8 w-1/3" rounded="sm" />
                    </div>
                  ) : (
                    <>
                      <div className=" flex flex-row gap-4">
                        <p>{item.logo}</p>
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
        <p className="font-bold text-xl">My Classes</p>
        <div className="flex flex-col sm:flex-row gap-4 w-full ">
          {classes.map((item) => (
            <Card
              key={item.title}
              className="relative flex min-h-56 w-full items-end overflow-hidden bg-cover bg-center text-white"
              style={{
                backgroundImage: ` url("${item.backgroundImage}")`,
              }}
            >
              <div className="mt-1 flex flex-row items-center gap-2 text-2xl font-bold text-white/80">
                {item.logo}
                <div className="flex w-full flex-col">
                  {" "}
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                      <span>{item.title}</span>
                      <span className="text-sm">{item.description}</span>
                    </div>
                    <span>{item.button}</span>
                  </div>
                  <span className="text-sm text-foreground/60">
                    {item.displaydate}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <ChatWidget />
    </MainLayout>
  );
};
