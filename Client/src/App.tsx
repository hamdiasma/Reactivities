import { useEffect, useState } from "react";
import type { IActivity } from "./lib/types";
import { Typography ,List, ListItem, ListItemText  } from "@mui/material";
import axios from "axios";


function App() {

const [activities, setActivities] = useState<IActivity[]>([]);
const title = "Activities";

 useEffect(() => {
    axios.get<IActivity[]>("https://localhost:5112/api/activities")
      .then(res => setActivities(res.data))
      .catch(error => console.error("Error fetching activities:", error));

      return () => {
        setActivities([]); // Cleanup function to reset activities on unmount
      }
  }, []);

  return (
    <>
     <Typography  variant="h3" component={"h3"}  className="app" style={{color:"red"}}>{title}</Typography>

     <List style={{marginTop: "20px"}}>
      {activities.map(activity => (
        <ListItem key={activity.id}>
          <ListItemText primary={activity.title} />
        </ListItem>
      ))}
     </List>
    </>
  )
}

export default App
