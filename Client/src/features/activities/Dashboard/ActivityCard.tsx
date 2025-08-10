import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import type { IActivity } from "../../../lib/types";

interface IProps {
    activity: IActivity;
    handleActivitySelect?: (id: string) => void;
}

const ActivityCard = ({activity, handleActivitySelect} : IProps) => {
  return (
   <Card sx={{borderRadius: 3, marginBottom: 2 }}>
   <CardContent>
    <Typography gutterBottom variant="h5">
      {activity.title}
    </Typography>
    <Typography sx={{color:'text.secondary', mb:1}} >
      {activity.date}
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
     <Button size="medium" variant="contained" color="primary" onClick={() => handleActivitySelect?.(activity.id)}>
      View Details
     </Button>
   </CardActions>
   </Card>
  )
}

export default ActivityCard