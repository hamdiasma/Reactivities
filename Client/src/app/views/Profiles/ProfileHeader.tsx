import { Avatar, Box, Button, Chip, Divider, Grid, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useParams } from "react-router";
import { useProfile } from "../../../lib/hooks/useProfile";




export default function ProfileHeader() {
    const { id } = useParams()

    const { profile, isCurrentUser, updateFollowing } = useProfile(id)

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    if (!profile) return null;

    return (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Grid container spacing={2}>
                <Grid size={isSmallScreen ? 12 : 8}>
                    <Stack spacing={2} direction={'row'} alignItems={'center'}>
                        <Avatar
                            src={profile?.imageUrl || '/images/user.png'}
                            sx={{ width: 150, height: 150 }}
                            alt={profile?.displayName + '_image'}
                        />
                        <Box display={'flex'} flexDirection={'column'} gap={2}>
                            <Typography variant="h4">{profile?.displayName}</Typography>
                            {profile?.following && <Chip
                                variant="outlined"
                                color={'secondary'}
                                label="Following"
                                sx={{ borderRadius: 1 }}
                            ></Chip>}
                        </Box>
                    </Stack>
                </Grid>
                <Grid size={isSmallScreen ? 12 : 4}>
                    <Stack spacing={2} direction={'column'} alignItems={'center'}>
                        <Box display={'flex'} justifyContent={"space-around"} width={'100%'}>
                            <Box textAlign="center">
                                <Typography variant="h6">Followers</Typography>
                                <Typography variant="h3">{profile?.followerSCount}</Typography>
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h6">Followings</Typography>
                                <Typography variant="h3">{profile?.FollowingSCount}</Typography>
                            </Box>
                        </Box>
                        {
                            !isCurrentUser && (<>
                                <Divider sx={{ width: '100%' }} />
                                <Button 
                                variant="outlined"
                                 color={profile?.following ? 'error' : 'success'} 
                                 sx={{ width: 150 }}
                                 onClick={()=>updateFollowing.mutate()}
                                 disabled={updateFollowing.isPending}
                                 >
                                    {profile?.following ? 'Unfollow' : 'Follow'}
                                </Button>
                            </>)
                        }
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    )
}
