import { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardWidgets from "./DashboardWidgets";

const DashboardHero = ({ isDashboard }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader open={open} />
      {isDashboard && <DashboardWidgets open={open} value={""} />}
    </div>
  );
};

export default DashboardHero;
