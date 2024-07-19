"use client";

import AdminSidebar from "../../@components/admin/AdminSidebar";
import DashboardHeader from "../../@components/admin/DashboardHeader";
import AdminProtected from "../../@hooks/useAdminProtected";
import Heading from "../../@utils/Heading";
import OrderAnalytics from "../../@components/admin/analytics/OrderAnalytics.jsx";

const Page = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Order Analytics - Admin"
          description="Platform for learning new technologies and programming."
          keywords="Programming,mern,dmbs,machine,learning"
        />
        <div className="flex">
          <div className="2xl:w-[15%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="2xl:w-[85%] w-4/5">
            <DashboardHeader />
            <OrderAnalytics />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
