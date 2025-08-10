import { Box } from "@mui/material"
import type { IActivity } from "../../../lib/types";
import ActivityCard from "./ActivityCard";

interface IProps {
    activities: IActivity[];
    handleActivitySelect?: (id: string) => void;
}

function ActivityList({ activities,handleActivitySelect }: IProps) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {activities.map((activity, index) => (
                <ActivityCard key={activity.id + index} activity={activity} handleActivitySelect={handleActivitySelect} />))
            }
        </Box>
    )
}

export default ActivityList