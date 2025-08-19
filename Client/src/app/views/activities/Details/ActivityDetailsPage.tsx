import {  Grid } from "@mui/material";
import { useParams } from "react-router";
import { useActivities } from "../../../../lib/hooks/useActivities";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChats from "./ActivityDetailsChats";
import ActivityDetailsSideBar from "./ActivityDetailsSideBar";



function ActivityDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { activity, isLoadinActivity } = useActivities(id);

    if (isLoadinActivity) return <div>Loading...</div>;
    if (!activity) return <div>Activity not found</div>;
    return (
        <Grid container spacing={3}>
            <Grid size={8}>
                <ActivityDetailsHeader activity={activity}/>
                <ActivityDetailsInfo  activity={activity}/>
                <ActivityDetailsChats  activity={activity}/>
            </Grid>
            <Grid size={4}>
                <ActivityDetailsSideBar />
            </Grid>
        </Grid>
    )
}

export default ActivityDetailsPage
{/* <Card sx={{ borderRadius: 3, marginBottom: 2 }}>
            <CardMedia component='img'
                src={`/images/categoryImages/${activity.category}.jpg`}
            />
            <CardContent >
                <Typography variant="h5">{activity.title}</Typography>
                <Typography variant="subtitle1" fontWeight='light'>{formatDate(activity.date)}</Typography>
                <Typography variant="body1">{activity.description}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Chip label={activity.category} color="primary" variant="outlined" />
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button component={NavLink} to={`/manage/${activity.id}`} size="medium" color="primary" >
                   Edit
                </Button>
                <Button size="medium" color="inherit" onClick={()=>navigate('/activities')}>
                   Cancel
                </Button>
                </Box>
            </CardActions>
        </Card> */}