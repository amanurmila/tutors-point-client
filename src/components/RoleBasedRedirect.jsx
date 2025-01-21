import { useNavigate } from "react-router-dom";
import Loading from "../pages/Loading";
import useRole from "../hooks/useRole";

const RoleBasedRedirect = () => {
  const [userData, , isLoading] = useRole();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  const role = userData?.role;

  // Redirect based on role
  if (role === "admin") {
    navigate("/dashboard/admin/allUsers");
  } else if (role === "student") {
    navigate("/dashboard/student/viewBookedSessions");
  } else if (role === "tutor") {
    navigate("/dashboard/tutor/createSession");
  } else {
    navigate("/login"); // Fallback for undefined roles
  }

  return null;
};

export default RoleBasedRedirect;
