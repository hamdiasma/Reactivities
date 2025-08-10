import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import type { IActivity } from "../../../lib/types";

interface IProps {
    activity: IActivity;
    handelCancelSelect?: () => void;
}

function ActivityDetails({ activity,handelCancelSelect }: IProps) {
    return (
        <Card sx={{ borderRadius: 3, marginBottom: 2 }}>
            <CardMedia component='img'
                src={`/images/categoryImages/${activity.category}.jpg`}
            />

            <CardContent >
                <Typography variant="h5">{activity.title}</Typography>
                <Typography variant="subtitle1" fontWeight='light'>{activity.date}</Typography>
                <Typography variant="body1">{activity.description}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size="medium" color="primary">
                   Edit
                </Button>
                <Button size="medium" color="inherit" onClick={handelCancelSelect}>
                   Cancel
                </Button>
            </CardActions>
        </Card>
    )
}

export default ActivityDetails