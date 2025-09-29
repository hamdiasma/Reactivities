import { Grid } from '@mui/material';
import ActivityList from './ActivityList';
import ActivityFilters from './ActivityFilters';
// import { useActivities } from '../../../../lib/hooks/useActivities';

export default function ActivityDashboard() {
  // const { isFetchingNextPage, hasNextPage, fetchNextPage } = useActivities()
  return (
    <Grid container sx={{ marginTop: '20px', padding: '20px', width: '100%' }} spacing={{ md: 5 }}>
      <Grid size={{ md: 8 }} width={'100%'}>
        <ActivityList />
        {/* <Button onClick={() => fetchNextPage()}
          sx={{ my: 2, float: 'right' }}
          variant='contained'
          disabled={!hasNextPage || isFetchingNextPage}
        >
          Load more
        </Button> */}
      </Grid>
      <Grid size={{ md: 4 }}
       sx={{
        position:'sticky',
        top:112,
        alignSelf:'flex-start'

       }}
     width={'100%'}>
        <ActivityFilters />
      </Grid>
    </Grid>
  );
}
