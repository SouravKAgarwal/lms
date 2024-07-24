import { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardWidgets from "./DashboardWidgets";

const DashboardHero = ({ isDashboard }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader open={open} />
      <div className="mt-24">
        {isDashboard && <DashboardWidgets open={open} value={""} />}
      </div>
    </div>
  );
};

export default DashboardHero;
