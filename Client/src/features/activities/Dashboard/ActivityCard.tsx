import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import type { IActivity } from "../../../lib/types";
import { formatDate } from "../../../helpers/DateFormatter";

interface IProps {
    activity: IActivity;
    handleActivitySelect?: (id: string) => void;
    handleDeleteActivity?: (id: string) => void;
}

const ActivityCard = ({activity, handleActivitySelect, handleDeleteActivity} : IProps) => {
  return (
   <Card sx={{borderRadius: 3, marginBottom: 2 }}>
   <CardContent>
    <Typography gutterBottom variant="h5">
      {activity.title}
    </Typography>
    <Typography sx={{color:'text.secondary', mb:1}} >
      {formatDate(activity.date)}
    </Typography>
    <Typography variant="body2" >
      {activity.description}
    </Typography>
    <Typography variant="subtitle1" >
      {activity.city} / {activity.venue}
    </Typography>
   </CardContent>   
   <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
     <Chip label={activity.category} color="primary"  variant="outlined"/>
      <Box sx={{display: 'flex', gap: 1}}>
        <Button size="medium" color="error" onClick={() => handleDeleteActivity?.(activity.id)}>Delete</Button>
      <Button size="medium" variant="contained" color="primary" onClick={() => handleActivitySelect?.(activity.id)}>
      View Details
     </Button>
      </Box>
   </CardActions>
   </Card>
  )
}

export default ActivityCard