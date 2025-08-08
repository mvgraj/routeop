import { Routes, Route, Navigate } from "react-router-dom";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Vehicle_Analysis,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController } from "@/context";

import {
  Cost, Emission, Fleet, FuelHistory,
  OverView, ServiceHistory, WorkOrders, Documents
} from "@/pages/userdashboard";

export function UserDashboard() {
  const [controller] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const userRoutes = routes.find(r => r.layout === "user-dashboard")?.pages || [];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "rgba(187, 231, 254, 0.2)" }}>
      <Sidenav
        routes={[{ layout: "user-dashboard", pages: userRoutes }]}
        brandImg={sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"}
      />
      <div className="p-2 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <Routes>
          {userRoutes.map(({ path, element, children }) => (
            <Route key={path} path={path} element={element}>
              {children?.map(({ path: subPath, element: subElement }) => (
                <Route key={subPath} path={subPath} element={subElement} />
              ))}
            </Route>
          ))}

          {/* Vehicle Analysis nested route */}
          <Route path="Vehicle_analysis/*" element={<Vehicle_Analysis />}>
            <Route index element={<Navigate to="overview" />} />
            <Route path="overview" element={<OverView />} />
            <Route path="serviceHistory" element={<ServiceHistory />} />
            <Route path="fuelHistory" element={<FuelHistory />} />
            <Route path="workOrders" element={<WorkOrders />} />
            <Route path="Emission" element={<Emission />} />
            <Route path="cost" element={<Cost />} />
            <Route path="documents" element={<Documents />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
