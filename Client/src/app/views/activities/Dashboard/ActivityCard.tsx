import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material";
import { Link, NavLink } from "react-router";
import { AccessTime, Place } from "@mui/icons-material";
import { format } from 'date-fns'

interface IProps {
  activity: IActivity;
}

const ActivityCard = ({ activity }: IProps) => {
  const isHost = false; // This should be replaced with actual logic to determine if the user is the host
  const isGoing = false; // This should be replaced with actual logic to determine if the user is going to the activity
  const label = isHost ? 'You are hosting this activity' : 'You are going to this activity';
  const isCanceled = false; // This should be replaced with actual logic to determine if the activity is canceled
  const color = isHost ? 'primary' : isCanceled ? 'error' : isGoing ? 'warning' : 'primary';

  return (
    <Card elevation={3} sx={{ borderRadius: 3, marginBottom: 2 }}>

      <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ padding: 2 }}>
        <CardHeader
          avatar={<Avatar sx={{ height: 80, width: 80 }} />}
          title={activity.title}
          slotProps={{
            title: {
              sx: {
                fontWeight: 'bold',
                fontSize: 20,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }, // أو 700
            },
            // subheader: { variant: 'body2', color: 'text.secondary' }
          }}

          subheader={<>
            Hosted by {' '} <Link to={`/profile/hamdi`} >
              Hamdi
            </Link>
          </>}
        ></CardHeader>
        <Box display={'flex'} flexDirection={'column'} gap={2} mr={2}>
          {isHost || isGoing && (<Chip label={label} color={color} variant="outlined" sx={{ borderRadius: 2 }} />)}
          {isCanceled && (<Chip label="Canceled" color="error" variant="outlined" sx={{ borderRadius: 2 }} />)}
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <CardContent sx={{ p: 0 }}>
        <Box display={'flex'} alignItems={'center'} px={2} mb={2}>
          <Box display={'flex'} flexGrow={0} alignItems={'center'}>
            <AccessTime sx={{ color: 'text.secondary', mr: 1 }} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {format(activity.date, 'dd MMM yyyy h:mm a')}
            </Typography>
          </Box>
          <Place sx={{ ml: 3, mr: 1 }} />
          <Typography variant="body2">
            {activity.venue}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />
        <Box display={'flex'} sx={{ backgroundColor: 'grey.200', py: 3, pl: 3 }}>
          Attendees go here
        </Box>
      </CardContent>
      <CardContent sx={{ pb: 2 }}>
        <Typography variant="body2" >
          {activity.description}
        </Typography>
        <Button
          component={NavLink}
          to={`/activities/${activity.id}`}
          size="medium"
          variant="contained"
          color="primary"
          sx={{ display: 'flex', justifySelf: 'self-end', borderRadius: 3, textTransform: 'none' }}
        >
          VIEW
        </Button>
      </CardContent>
    </Card>
  )
}

export default ActivityCard