import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className="logo mr-auto cursor-pointer" onClick={() => navigate("/")}>
      <img src="/logo.svg" alt="Logo" className="h-8 w-auto" loading="lazy" />
    </div>
  );
};

export default Logo;
