import { Card, CardMedia, Box, Typography, Chip } from "@mui/material";
import { Link } from "react-router";
import { formatDate } from "../../../../lib/util/util";
import { useActivities } from "../../../../lib/hooks/useActivities";
import StyledButton from "../../../Shared/Components/StyledButton";
import { getCategoryColor } from "../../../../helpers/RenderColor";

interface IProps {
    activity: IActivity
}

export default function ActivityDetailsHeader({ activity }: IProps) {

    const { editAttendance } = useActivities(activity.id)
    const isCancelled = activity.isCancelled;
    const isHost = activity.isHost;
    const isGoing = activity.isGoing;

    const handleSubmit = () => {
       editAttendance.mutate(activity.id)
    }


    return (
        <Card sx={{ position: 'relative', mb: 2, backgroundColor: 'transparent', overflow: 'hidden' }}>

            <Box sx={{position: 'absolute', left: 40, top: 20, zIndex: 1000, display:'flex', gap:2,}}>
                <Chip
                sx={{
                     borderRadius: 1,
                     background: getCategoryColor(activity.category),
                     color:"white",
                      textTransform: "capitalize"
                }}
                label={activity.category}
            />
            {isCancelled && (
                <Chip
                    sx={{ borderRadius: 1 }}
                    color="error"
                    label="Cancelled"
                />
            )}
            </Box>
            <CardMedia
                component="img"
                height="300"
                image={`/images/categoryImages/${activity.category}.jpg`}
                alt={`${activity.category}_image`}
            />
            <Box sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                color: 'white',
                padding: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent)',
                boxSizing: 'border-box',
            }}>
                {/* Text Section */}
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{activity.title}</Typography>
                    <Typography variant="subtitle1">{formatDate(activity.date)}</Typography>
                    <Typography variant="subtitle2">
                        Hosted by <Link to={`/profiles/${activity.hostId}`} style={{ color: 'white', fontWeight: 'bold' }}>
                            {activity.hostDisplayName}</Link>
                    </Typography>
                </Box>
                {/* Buttons aligned to the right */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {isHost ? (
                        <>
                            <StyledButton
                                variant='contained'
                                color={isCancelled ? 'success' : 'error'}
                                onClick={handleSubmit}
                                disabled={editAttendance.isPending}
                            >
                                {isCancelled ? 'Re-activate Activity' : 'Cancel Activity'}
                            </StyledButton>
                            <StyledButton
                                variant="contained"
                                color="primary"
                                component={Link}
                                to={`/manage/${activity.id}`}
                                disabled={isCancelled}
                            >
                                Manage Event
                            </StyledButton>
                        </>
                    ) : (
                        <StyledButton
                            variant="contained"
                            color={isGoing ? 'primary' : 'info'}
                            onClick={handleSubmit}
                            disabled={editAttendance.isPending || activity.isCancelled}
                        >
                            {isGoing
                                ? 'Cancel Attendance'
                                : 'Join Activity'}
                        </StyledButton>
                    )}
                </Box>
            </Box>
        </Card>
    )
}
