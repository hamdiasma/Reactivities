import { useEffect, useState } from "react";
import type { IActivity } from "../../lib/types";
import { Box, Container } from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/Dashboard/ActivityDashboard";


function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [EditMode, setEditMode] = useState(false);

  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get<IActivity[]>("https://localhost:5112/api/activities")
      .then(res => {
        setActivities(res.data)
        // setSelectedActivity(res.data[0]);
      })
      .catch(error => console.error("Error fetching activities:", error));

    return () => {
      setActivities([]);
      setSelectedActivity(null);
    }
  }, []);

  const handleActivitySelect = (id: string) => {
    setSelectedActivity(activities.find(activity => activity.id === id) || null);
    window.scrollTo({ behavior: "instant", top: 0, left: 0 });
  }

  const handelCancelSelect = () => {
    setSelectedActivity(null);
    window.scrollTo({ behavior: "instant", top: 0, left: 0 });
  }

  const handleEditMode = (id?: string) => {
    if (id) handleActivitySelect(id);
    else handelCancelSelect();
    setEditMode(true);
  }

  const handelEditCancel = () => {
    setEditMode(false);
  }

  const handleSubmitForm = (activity: IActivity) => {
    if (activity?.id) {
      //todo: update activity
      const updatedActivities = activities.map(a => a.id === activity.id ? activity : a);
      setActivities(updatedActivities);
      setSelectedActivity(activity);
    }
    else {
      // create new activity
      const newActivity = { ...activity, id: (Math.random() * 1000).toString() };
      setActivities([newActivity, ...activities]);
      // setSelectedActivity(newActivity);

    }
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    const findIndex = activities.findIndex(a => a.id === id);
    if (findIndex >= 0) {
      const updatedActivities = [...activities];
      updatedActivities.splice(findIndex, 1);
      setActivities(updatedActivities);
      if (selectedActivity?.id === id) {
        setSelectedActivity(null);
      }
    }
  }
  return (
    <Box bgcolor={"#eee"} >
      <NavBar handleEditMode={handleEditMode} />
      <Container maxWidth="xl" sx={{ paddingTop: '80px' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          EditMode={EditMode}
          handelCancelSelect={handelCancelSelect}
          handleActivitySelect={handleActivitySelect}
          handelEditCancel={handelEditCancel}
          handleEditMode={handleEditMode}
          handleSubmitForm={handleSubmitForm}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Container>
    </Box>
  )
}

export default App
