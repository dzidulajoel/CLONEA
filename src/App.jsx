import { lazy, Suspense } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";

import E404 from "./pages/screens/error/E404";

// ── Pages lazy ─────────────────────────────

// TABS
const Home = lazy(() => import("./pages/screens/tabs/Home"));
const History = lazy(() => import("./pages/screens/tabs/History"));
const Scan = lazy(() => import("./pages/screens/tabs/Scan"));
const Settings = lazy(() => import("./pages/screens/tabs/Settings"));
const Templates = lazy(() => import("./pages/screens/tabs/Templates"));

// STACKS
const Analysis = lazy(() => import("./pages/screens/stacks/Analysis"));
const Creation = lazy(() => import("./pages/screens/stacks/Creation"));
const Results = lazy(() => import("./pages/screens/stacks/Results"));

// SPLASH / AUTH
const Welcome = lazy(() => import("./pages/screens/splash/Welcome"));
const Login = lazy(() => import("./pages/screens/splash/Login"));
const Signup = lazy(() => import("./pages/screens/splash/Signup"));

// LAYOUTS
const Connexion = lazy(() => import("./pages/layouts/Connexion"));
const Stack = lazy(() => import("./pages/layouts/Stack"));
const Tabs = lazy(() => import("./pages/layouts/Tabs"));

// ── Loader ────────────────────────────────
const PageLoader = () => (
    <div className="flex items-center justify-center min-h-screen">
    Loading...
  </div>
);

// ── ROUTER ────────────────────────────────
// eslint-disable-next-line react-refresh/only-export-components
export const router = createBrowserRouter([
  // redirect
  {
    path: "/",
    element: <Navigate to="/clonea" replace />,
  },

  // SPLASH
  {
    path: "/clonea",
    element: <Welcome />,
  },

  // AUTH (login / signup)
  {
    path: "/clonea/auth",
    element: <Connexion />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },

  // APP TABS
  {
    path: "/clonea/app",
    element: <Tabs />,
    children: [
      { index: true, element: <Home /> },
      { path: "history", element: <History /> },
      { path: "scan", element: <Scan /> },
      { path: "settings", element: <Settings /> },
      { path: "templates", element: <Templates /> },
    ],
  },

  // STACK (création / analyse / résultats)
  {
    path: "/clonea/stack",
    element: <Stack />,
    children: [
      { index: true, element: <Creation /> },
      { path: "analysis", element: <Analysis /> },
      { path: "results", element: <Results /> },
    ],
  },

  // 404
  {
    path: "*",
    element: <E404 />,
  },
]);

// ── EXPORT APP ROUTER ─────────────────────
export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}