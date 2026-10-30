import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/Atoms/Card";
import { Skeleton } from "../../components/Atoms/Skeleton";
import { MainLayout } from "../../components/Layouts/MainLayout";
import { ChatWidget } from "../../components/widget";

import { overview, profilename,  classes } from "./Homepage.constants";

import backgroundImage from "../../src/assets/background1.png";
import {
  AssignmentIcon,
  Clock,
} from "../../components/Icon";

import { Button } from "../../components/Atoms/Button";



export const Homepage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setIsLoading(false), 700);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
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

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {classes.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                className="relative flex min-h-60 w-full items-end overflow-hidden bg-cover bg-center hover-mode text-white sm:min-h-64 hover:scale-[1.01]"
                style={{
                  backgroundImage: `url("${item.backgroundImage}")`,
                }}
              >
                <div className="mt-1 flex w-full flex-row items-center gap-2 text-2xl font-bold text-white/80">
                  <div className="flex w-full flex-col">
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-col">
                        <h3 className="flex flex-row gap-3 items-center">
                          {item.logo}
                          {item.title}
                        </h3>

                        {item.description && (
                          <p className="text-sm">{item.description}</p>
                        )}
                      </div>

                      <span
                        onClick={item.button ? () => navigate("/calender") : undefined}
                      >
                        {item.button}
                      </span>
                    </div>

                    <span className="text-sm text-foreground/60">
                      {item.displaydate}
                    </span>

                    <Card
                      id={`${item.id}-content`}
                      variant="outline"
                      className="mt-5 min-h-40 w-full space-y-1 backdrop-blur-md border-none"
                    >
                      {item.assignments.map((assignment) => (
                        <Button
                          key={assignment.id}
                          size="sm"
                          variant="ghost"
                          className="h-auto w-full justify-start gap-3 rounded-xl px-2 py-1.5 text-left"
                        >
                          <div
                            id={`${item.id}-${assignment.id}`}
                            className="grid w-full min-w-0 grid-cols-[32px_minmax(0,1fr)] items-center gap-3"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                              {assignment.icon}
                            </span>
                            <div className="flex min-w-0 flex-col items-start">
                              <p className="truncate text-sm font-medium">
                                {assignment.title}
                              </p>
                              <p className="text-xs text-white/60">
                                Due: {assignment.dueDate}
                              </p>
                            </div>
                          </div>
                        </Button>
                      ))}

                      {item.buttonDown && (
                        <span
                          className="ml-auto"
                          onClick={() => navigate("/classes")}
                        >
                          {item.buttonDown}
                        </span>
                      )}
                    </Card>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <section className="pt-10">
      
        <div className="flex  gap-4 justify-between ">
          <div className="flex flex-col w-full">
            <div className="flex flex-row gap-6">
          <AssignmentIcon/>
         <h2 className="font-bold text-xl mb-4">
            Upcoming Activity
          </h2>
          </div>
          <Card className="w-auto">

          </Card>
          </div>

          <div className="flex flex-col  w-full">
            <div className="flex flex-row gap-6">
            <Clock/>
         <h2 className="font-bold text-xl mb-4">
            Recent Activity
          </h2>
          </div>
          <Card className="w-auto">
            
          </Card>

          </div>
         
          </div>
       
      </section>

      <ChatWidget />
    </MainLayout>
    </>
  );
  
};

