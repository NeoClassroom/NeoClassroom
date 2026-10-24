import { useNavigate } from "react-router-dom";
export const Homepage = () => {
  const navigate = useNavigate();
  const goAboutUs = "/aboutus";
  return (
    <>
      <button className="hover:scale-120" onClick={() => navigate(goAboutUs)}>
        testButton
      </button>
    </>
  );
};
