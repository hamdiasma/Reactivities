import { Grid } from '@mui/material';
import ActivityList from './ActivityList';
import ActivityFilters from './ActivityFilters';

export default function ActivityDashboard() {

  return (
    <Grid container sx={{ marginTop: '20px', padding: '20px', width: '100%' }} spacing={{ md: 5 }}>
      <Grid size={{ md: 8 }} width={'100%'}>
        <ActivityList/>
      </Grid>
      <Grid size={{ md: 4 }} width={'100%'}>
        <ActivityFilters/>
      </Grid>
    </Grid>
  );
}
