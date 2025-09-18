import { Paper, Typography, List, ListItem, Chip, ListItemAvatar, Avatar, ListItemText, Grid } from "@mui/material";


interface Props {
    activity: IActivity
}

export default function ActivityDetailsSideBar({ activity }: Props) {
    const hostId = activity.hostId;
    return (
        <>
            <Paper
                sx={{
                    textAlign: 'center',
                    border: 'none',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    p: 2,
                }}
            >
                <Typography variant="h6">
                    {activity.attendees.length} people going
                </Typography>
            </Paper>
            <Paper sx={{ padding: 2 }}>
                {activity.attendees.map(att => (

                    <Grid container alignItems="center" key={att.id}>
                        <Grid size={8}>
                            <List sx={{ display: 'flex', flexDirection: 'column' }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar
                                            variant="rounded"
                                            alt={att.displayName + '_image'}
                                            src={att.imageUrl || '/assets/user.png'}
                                            sx={{ width: 50, height: 50 }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText>
                                        <Typography variant="h6">{att.displayName}</Typography>
                                        {att.following && (
                                            <Typography variant="body2" color="orange">
                                                Following
                                            </Typography>
                                        )}
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                            {hostId === att.id && (
                                <Chip
                                    label="Host"
                                    color="warning"
                                    variant='filled'
                                    sx={{ borderRadius: 2 }}
                                />
                            )}

                        </Grid>
                    </Grid>
                ))}


            </Paper>
        </>
    );
}