import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default function adminProtected({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    const isAdmin = user?.role === "admin";
    return isAdmin ? children : redirect("/");
  }
}
