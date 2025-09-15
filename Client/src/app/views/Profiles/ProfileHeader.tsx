import { Avatar, Box, Button, Chip, Divider, Grid, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"


interface Props {
    profile?: IProfile
}

export default function ProfileHeader({ profile }: Props) {
    const isFollowing = true
    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
                            {isFollowing && <Chip
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
                                <Typography variant="h3">5</Typography>
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h6">Following</Typography>
                                <Typography variant="h3">45</Typography>
                            </Box>
                        </Box>
                        <Divider sx={{ width: '100%' }} />
                        <Button variant="outlined" color={isFollowing ? 'error' : 'success'} fullWidth>
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    )
}
