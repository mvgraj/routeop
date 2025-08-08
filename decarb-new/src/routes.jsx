import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  ChartBarIcon,
  MapIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

import * as SchoolPages from "@/pages/schooldashboard";
import * as UserPages from "@/pages/userdashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

// Shared structure, different components
const basePages = (components) => [

  {
    icon: <UserCircleIcon {...icon} />,
    name: "Fleet",
    path: "/fleet",
    element: <components.Fleet />,
  },
  {
    icon: <TableCellsIcon {...icon} />,
    name: "Assign",
    path: "/assign",
    element: <components.Assign />,
  },
{
  icon: <ChartBarIcon {...icon} />,
  name: "Reports",
  path: "/analytics",
  element: <components.Analytics />,
  matchPaths: ["/school-dashboard/analytics", "/school-dashboard/report_overview","/school-dashboard/totalbus","/school-dashboard/bus_overview"],
}
,
  {
    icon: <MapIcon {...icon} />,
    name: "Trips",
    path: "/trips",
    element: <components.Trips />,
  },
  // {
  //   icon: <UsersIcon {...icon} />,
  //   name: "Drivers",
  //   path: "/drivers",
  //   element: <components.Drivers />,
  // },
];

export const routes = [
  {
    layout: "school-dashboard",
    pages: basePages(SchoolPages),
  },
  {
    layout: "user-dashboard",
    pages: basePages(UserPages),
  },
];

export default routes;
