import { useState } from "react";
import type { IActivity } from "../../lib/types";
import { Box, Container } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/Dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";


function App() {
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [EditMode, setEditMode] = useState(false);
  const {activities,isPending} = useActivities()

  const handleActivitySelect = (id: string) => {
    setSelectedActivity(activities?.find(activity => activity.id === id) || null);
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

  return (
    <Box bgcolor={"#eee"} minHeight={'100vh'} >
      <NavBar handleEditMode={handleEditMode} />
      <Container maxWidth="xl" sx={{ paddingTop: '80px' }}>
        {isPending || !activities ?
          (<div>Loading...</div>) :
          (<ActivityDashboard
            activities={activities}
            selectedActivity={selectedActivity}
            EditMode={EditMode}
            handelCancelSelect={handelCancelSelect}
            handleActivitySelect={handleActivitySelect}
            handelEditCancel={handelEditCancel}
            handleEditMode={handleEditMode}
          />)}
      </Container>
    </Box>
  )
}

export default App
