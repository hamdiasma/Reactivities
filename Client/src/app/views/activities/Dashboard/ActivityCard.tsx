import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import type { IActivity } from "../../../../lib/types";
import { formatDate } from "../../../../helpers/DateFormatter";
import { useActivities } from "../../../../lib/hooks/useActivities";
import { NavLink } from "react-router";

interface IProps {
  activity: IActivity;
}

const ActivityCard = ({ activity }: IProps) => {
  const {deleteActvity} = useActivities();

  return (
    <Card sx={{ borderRadius: 3, marginBottom: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {activity.title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1 }} >
          {formatDate(activity.date)}
        </Typography>
        <Typography variant="body2" >
          {activity.description}
        </Typography>
        <Typography variant="subtitle1" >
          {activity.city} / {activity.venue}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Chip label={activity.category} color="primary" variant="outlined" />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={NavLink} to={`/activities/${activity.id}`} size="medium" variant="contained" color="primary" onClick={() => {}}>
            VIEW
          </Button>
          <Button size="medium" variant="contained" color="error" 
          disabled={deleteActvity.isPending}
          onClick={() => deleteActvity.mutate(activity.id)}>DELETE</Button>
        </Box>
      </CardActions>
    </Card>
  )
}

export default ActivityCard