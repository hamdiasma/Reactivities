import { useEffect, useState } from "react";
import type { IActivity } from "../../lib/types";
import { Box, Container} from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/Dashboard/ActivityDashboard";


function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get<IActivity[]>("https://localhost:5112/api/activities")
      .then(res =>{
         setActivities([...res.data, ...res.data, ...res.data, ...res.data])
         setSelectedActivity(res.data[0]);
        })
      .catch(error => console.error("Error fetching activities:", error));

    return () => {
      setActivities([]);
      setSelectedActivity(null);
      
      
    }
  }, []);
  
  const handleActivitySelect = (id:string) => {
    setSelectedActivity(activities.find(activity => activity.id === id) || null);
    window.scrollTo({behavior:"instant",top:0, left:0 }); 
 }
 
 const handelCancelSelect = () => {
    setSelectedActivity(null);
    window.scrollTo({behavior:"instant",top:0, left:0 }); 
 }
 

  return (
    <Box bgcolor={"#eee"} > 
      <NavBar />
      <Container maxWidth="xl"  sx={{ paddingTop: '80px'}}>
       <ActivityDashboard activities={activities} selectedActivity={selectedActivity} handelCancelSelect={handelCancelSelect} handleActivitySelect={handleActivitySelect}/>
      </Container>
    </Box>
  )
}

export default App
