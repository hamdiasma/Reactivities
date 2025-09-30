import { Avatar, AvatarGroup, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material";
import { Link, NavLink } from "react-router";
import { AccessTime, Place } from "@mui/icons-material";
import { format } from 'date-fns'
import AvatarPopover from "../../../Shared/Components/AvatarPopover";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
interface IProps {
  activity: IActivity;
}

const ActivityCard = ({ activity }: IProps) => {
  const isHost = activity.isHost; // This should be replaced with actual logic to determine if the user is the host
  const isGoing = activity.isGoing; // This should be replaced with actual logic to determine if the user is going to the activity
  const label = activity.isHost ? 'You are hosting' : 'You are going';
  const isCanceled = activity.isCancelled; // This should be replaced with actual logic to determine if the activity is canceled
  const color = isHost ? 'secondary' : isGoing ? 'warning' : 'default';
  const isFull = activity.attendees.length === activity.numberOfParicipate;
  const isAlmostFull =
    activity.attendees.length >= activity.numberOfParicipate - 2 &&
    !isFull;
  return (
    <Card elevation={3} sx={{ borderRadius: 3, marginBottom: 2 }}>

      <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ padding: 2 }}>
        <CardHeader
          avatar={<Avatar src={activity.hostImageUrl} sx={{ height: 80, width: 80 }} />}
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
            Hosted by {' '} <Link to={`/profiles/${activity.hostId}`}>
              {activity.hostDisplayName}
            </Link>
            <Chip
              icon={
                isFull ? (
                  <CancelIcon fontSize="small" />
                ) : isAlmostFull ? (
                  <WarningAmberIcon fontSize="small" />
                ) : (
                  <CheckCircleIcon fontSize="small" />
                )
              }
              label={
                isFull
                  ? `Participated: (${activity.attendees.length}) / ${activity.numberOfParicipate} – Liste pleine`
                  : `Participated: (${activity.attendees.length}) / ${activity.numberOfParicipate}`
              }
              sx={{
                mt:2,
                display:"flex",
                px: 1.5,
                py: 0.5,
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "0.8rem",
               
                color: isFull
                  ? "error.main"
                  : isAlmostFull
                    ? "warning.main"
                    : "success.main",
                "& .MuiChip-icon": {
                  color: "inherit", // make the icon match text color
                },
              }}
            />


          </>}
        ></CardHeader>
        <Box display={'flex'} flexDirection={'column'} gap={2} mr={2}>
          {(isHost || isGoing) && (<Chip variant="outlined" label={label} color={color} sx={{ borderRadius: 2 }} />)}
          {isCanceled && (<Chip variant="outlined" label="Canceled" color="error" sx={{ borderRadius: 2 }} />)}
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
          <AvatarGroup max={4}>
            {activity.attendees.map(att =>
              <AvatarPopover

                key={att.id}
                profile={att}
              />
            )}
          </AvatarGroup>

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