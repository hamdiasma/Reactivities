import {  Grid, useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "react-router";
import { useActivities } from "../../../../lib/hooks/useActivities";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChats from "./ActivityDetailsChats";
import ActivityDetailsSideBar from "./ActivityDetailsSideBar";



function ActivityDetailsPage() {
      const theme = useTheme();
      const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
      
      const { id } = useParams<{ id: string }>();
      const { activity, isLoadinActivity } = useActivities(id);
      if (isLoadinActivity) return <div>Loading...</div>;
      if (!activity) return <div>Activity not found</div>;


    return (
        <Grid container spacing={3}>
            <Grid size={isSmallScreen ? 12 :8}>
                <ActivityDetailsHeader activity={activity}/>
                <ActivityDetailsInfo  activity={activity}/>
                <ActivityDetailsChats  />
            </Grid>
            {!isSmallScreen && <Grid size={4}>
                <ActivityDetailsSideBar  activity={activity}/>
            </Grid>}
        </Grid>
    )
}

export default ActivityDetailsPage
