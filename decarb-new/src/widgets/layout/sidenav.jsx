import PropTypes from "prop-types";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import img from './logo.jpeg';

export function Sidenav({ brandImg, brandName, routes }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  const handleLogout = () => {
    navigate('/');
  };

  // ✅ Match against route or custom aliases
  const isActivePath = (pathname, layout, path, matchPaths = []) => {
    const basePath = `/${layout}${path}`;
    return (
      pathname.startsWith(basePath) ||
      matchPaths.some((matchPath) => pathname.startsWith(matchPath))
    );
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className="relative">
        <Link to="/" className="py-4 px-8 flex items-center gap-4">
          <img
            src="https://mbs-data-bucket.s3.ap-south-1.amazonaws.com/website/images/Mbs_main/mbs_logo.png"
            alt="Brand Logo"
            className="w-12 h-12 object-cover rounded-full"
          />
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>

      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path, matchPaths }) => {
              const active = isActivePath(location.pathname, layout, path, matchPaths);
              return (
                <li key={name}>
                  <NavLink to={`/${layout}${path}`}>
                    <Button
                      variant={active ? "white" : "text"}
                      color={active ? "bg-[#274472]" : "blue-gray"}
                      className={`flex transition-none items-center gap-4 px-4 capitalize ${
                        active ? "bg-[#274472] text-white" : ""
                      }`}
                      style={{ opacity: active ? 1 : undefined }}
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        ))}

        {/* Logout Button */}
        <div className="absolute bottom-4 w-[200px] ms-7">
          <Button
            variant="outlined"
            color="blue"
            className="w-full"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "https://mbs-data-bucket.s3.ap-south-1.amazonaws.com/website/images/Mbs_main/mbs_logo.png",
  brandName: "Route Optimize",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidenav.jsx";

export default Sidenav;
