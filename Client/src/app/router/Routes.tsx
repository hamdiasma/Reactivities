import {
  createBrowserRouter,
  Navigate,
} from "react-router";

import App from "../Layout/App";
import HomePage from "../views/Home/HomePage";
import { ActivityForm } from "../views/activities/Forms/ActivityForm";
import ActivityDashboard from "../views/activities/Dashboard/ActivityDashboard";
import ActivityDetailsPage from "../views/activities/Details/ActivityDetailsPage";
import Counter from "../views/Counter";
import TestErrors from "../views/Errors/ErrorPage";
import NotFound from "../views/Errors/NotFound";
import ServerError from "../views/Errors/ServerError";
import LoginPage from "../views/account/LoginPage";
import RequireAuth from "./RequireAuth";
import RegisterPage from "../views/account/RegiterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
      element: <RequireAuth />,
      children: [
        { path: "/activities", element: <ActivityDashboard /> },
        { path: "/activities/:id", element: <ActivityDetailsPage /> },
        { path: "/create-activity", element: <ActivityForm key='create' name='Create' /> },
        { path: "/manage/:id", element: <ActivityForm key='update' name='Update' /> },
      ]
    },
    { path: "", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/counter", element: <Counter /> },
    { path: "/errors", element: <TestErrors /> },
    { path: "/not-found", element: <NotFound /> },
    { path: "/server-error", element: <ServerError /> },
    { path: "*", element: <Navigate replace to="/not-found" /> },
    ]
  },
]);


