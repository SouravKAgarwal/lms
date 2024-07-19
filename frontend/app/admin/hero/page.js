"use client";

import Heading from "../../../app/@utils/Heading";
import AdminSidebar from "../../@components/admin/AdminSidebar";
import DashboardHero from "../../@components/admin/DashboardHero";
import AdminProtected from "../../@hooks/useAdminProtected";
import EditHero from "../../../app/@components/admin/layout/EditHero.jsx";

const Admin = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Hero Section - E-Learning"
          description="Platform for learning new technologies and programming."
          keywords="Programming,mern,dmbs,machine,learning"
        />
        <div className="flex h-screen">
          <div className="2xl:w-[15%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="2xl:w-[85%] w-4/5">
            <DashboardHero />
            <EditHero />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Admin;
