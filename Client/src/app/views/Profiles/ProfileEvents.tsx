
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, useParams } from 'react-router';
import { useProfile } from '../../../lib/hooks/useProfile';
import { Grid } from '@mui/system';
import { Card, CardContent, CardMedia, Pagination, Typography } from '@mui/material';
import { format } from 'date-fns';


export default function ProfileEvents() {
    const [activiteTab, setActiveTab] = React.useState(0);

    const { id } = useParams();

    const { userActivities, setFilter, loadingUserActivities,page, setPage } = useProfile(id)


    React.useEffect(() => {
        setFilter('future')
    }, [setFilter])

    const tabs = [
        { muniItem: 'future events', key: 'future' },
        { muniItem: 'past events', key: 'past' },
        { muniItem: 'hosting', key: 'hosting' },
    ]

    const handletabChange = (_: React.SyntheticEvent, newValue: number) => {
        if(page!=1) setPage(1)
        setActiveTab(newValue)
        setFilter(tabs[newValue].key)
    }
    const handlePage = (_: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);
    }
    return (
        <Box >
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Tabs
                        value={activiteTab}
                        onChange={handletabChange}
                    >
                        {tabs.map((tab, index) => <Tab label={tab.muniItem.toUpperCase()} key={index} />)}

                    </Tabs>
                </Grid>
            </Grid>

            {
                (!userActivities || React.use.length === 0) && !loadingUserActivities ? (
                    <Typography mt={2}>
                        No Activities to show
                    </Typography>
                ) : null
            }

            <Grid container spacing={2} sx={{
                mt: 2, height: 400, overflow: "auto"
            }}>
                {userActivities && userActivities.items.map((activity: IActivity) => (
                    <Grid size={2} key={activity.id}>
                        <Link to={`/activities/${activity.id}`} style={{ textDecoration: 'none' }}>
                            <Card elevation={4}>
                                <CardMedia
                                    component={'img'}
                                    height={'100'}
                                    image={`/images/categoryImages/${activity.category}.jpg`}
                                    alt={activity.title}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography variant='h6' textAlign={"center"} mb={1}>
                                        {activity.title}
                                    </Typography>

                                    <Typography variant='body2' textAlign={"center"} mb={1}
                                        display={'flex'}
                                        flexDirection={'column'}
                                    >
                                        <span>{format(activity.date, 'do LLL yyyy')}</span>
                                        <span>{format(activity.date, 'h:mm a')}</span>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                )
                )}

            </Grid>
            <Box display={'flex'} justifyContent={'center'}>
                {userActivities && userActivities.totalPages > 0 && <Pagination
                    page={page}
                    count={userActivities.totalPages}
                    onChange={handlePage}
                    color="primary" />}
            </Box>
        </Box>
    );
}