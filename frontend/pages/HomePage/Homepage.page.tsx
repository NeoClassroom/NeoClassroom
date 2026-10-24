import { Button } from "../../components/Atoms/Button";
import {
  AssignmentIcon,
  CalenderIcon,
  Classroom,
  GradeIcon,
  HomeIcon,
  Profile,
} from "../../components/Icon";
import { ResourcesIcon } from "../../components/Icon/icons/ResourcesIcon";
import { MainLayout } from "../../components/Layouts/MainLayout";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
  const navigate = useNavigate();
  const handleGoHome = "/";
  return (
    <>
      <MainLayout
        leftLayoutTitle="Test"
        leftChildren={
          <div className="space-y-5 px-5">
            <Button
              className="w-full rounded-3xl "
              variant="ghost"
              size="lg"
              onClick={() => navigate(handleGoHome)}
            >
              <HomeIcon /> Home
            </Button>
            <Button className="w-full rounded-3xl" variant="ghost" size="lg">
              <Classroom /> Classes
            </Button>
            <Button className="w-full rounded-3xl " variant="ghost" size="lg">
              <CalenderIcon /> Calender
            </Button>
            <Button className="w-full rounded-3xl " variant="ghost" size="lg">
              <AssignmentIcon /> Assignment
            </Button>
            <Button className="w-full rounded-3xl " variant="ghost" size="lg">
              <GradeIcon /> Grades
            </Button>
            <Button className="w-full rounded-3xl " variant="ghost" size="lg">
              <ResourcesIcon /> Resources
            </Button>
          </div>
        }
        leftLayoutIcon={<Profile />}
      ></MainLayout>
    </>
  );
};
