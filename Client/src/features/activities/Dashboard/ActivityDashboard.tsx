import { Grid } from '@mui/material';
import type { IActivity } from '../../../lib/types';
import ActivityList from './ActivityList';
import ActivityDetails from '../Details/ActivityDetails';
import { ActivityForm } from '../Forms/ActivityForm';


type IProps = {
  activities: IActivity[];
  selectedActivity?: IActivity | null;
  EditMode: boolean;
  handleActivitySelect?: (id: string) => void;
  handelCancelSelect?: () => void;
  handelEditCancel: () => void;
  handleEditMode?: (id?: string) => void;
};

export default function ActivityDashboard(props: IProps) {
  return (
    <Grid container sx={{ marginTop: '20px', padding: '20px', width: '100%' }} spacing={{ md: 5 }}>
      <Grid size={{ md: 8 }} width={'100%'}>
        <ActivityList
          activities={props?.activities}
          handleActivitySelect={props.handleActivitySelect}
        />
      </Grid>
      <Grid size={{ md: 4 }} width={'100%'}>
        {props.EditMode && <ActivityForm
         selectedActivity={props.selectedActivity || undefined } 
         handelEditCancel={props.handelEditCancel} 
         />}
        {props.selectedActivity && <ActivityDetails selectedActivity={props.selectedActivity}
          handelCancelSelect={props.handelCancelSelect}
          handleEditMode={props.handleEditMode}
        />}
      </Grid>
    </Grid>
  );
}
