import { Box } from "@mui/material"
import ActivityCard from "./ActivityCard";
import { useActivities } from "../../../../lib/hooks/useActivities";


function ActivityList() {
const {activities, isFetching} = useActivities()
console.log({isFetching});

if (isFetching) return <div>Loading...</div>;
if (!activities) return <div>No activities found</div>;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {activities.map((activity, index) => (
                <ActivityCard key={activity.id + index} activity={activity} 
                />))
            }
        </Box>
    )
}

export default ActivityList