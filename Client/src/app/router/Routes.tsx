import {
  createBrowserRouter,
} from "react-router";

import App from "../Layout/App";
import HomePage from "../views/Home/HomePage";
import { ActivityForm } from "../views/activities/Forms/ActivityForm";
import ActivityDashboard from "../views/activities/Dashboard/ActivityDashboard";
import ActivityDetails from "../views/activities/Details/ActivityDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage/> },
      { path: "/activities", element: <ActivityDashboard/> },
      { path: "/activities/:id", element: <ActivityDetails/> },
      { path: "/create-activity", element: <ActivityForm key='create' name='Create'/> },
      { path: "/manage/:id", element: <ActivityForm key='update' name='Update'/> },
    ]
  },
]);


