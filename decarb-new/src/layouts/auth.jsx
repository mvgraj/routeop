// import { Routes, Route } from "react-router-dom";

// import routes from "@/routes";

// export function Auth() {

//   return (
//     <div className="relative min-h-screen w-full">
//       <Routes>
//         {routes.map(
//           ({ layout, pages }) =>
//             layout === "auth" &&
//             pages.map(({ path, element }) => (
//               <Route exact path={path} element={element} />
//             ))
//         )}
//       </Routes>
//     </div>
//   );
// }

// Auth.displayName = "/src/layout/Auth.jsx";

// export default Auth;

import { Routes, Route, Navigate } from "react-router-dom";

export function Auth() {
  const userType = localStorage.getItem('userType'); // 'school' or 'user'

  if (!userType) {
    return <Navigate to="/" replace />;
  }

  // Dynamically import the correct route config
  const routes =
    userType === 'school'
      ? require('@/routes/schoolRoutes').default
      : require('@/routes/userRoutes').default;

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {routes.map(({ path, element }, idx) => (
          <Route key={idx} path={path} element={element} />
        ))}
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";
export default Auth;

