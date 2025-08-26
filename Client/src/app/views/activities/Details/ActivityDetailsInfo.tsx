import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import type { IActivity } from "../../../../lib/types";
import { formatDate } from "../../../../lib/util/util";
import { useState } from "react";
import MapComponent from "../../../Shared/Components/MapComponent";


interface IProps {
    activity: IActivity
}

export default function ActivityDetailsInfo({activity}:IProps) {
const [mapOpen,setMapOpen] = useState(true)

    return (
        <Paper sx={{ mb: 2 }}>
            <Grid container alignItems="center" pl={2} py={1}>
                <Grid size={1}>
                    <Info color="info" fontSize="large" />
                </Grid>
                <Grid size={11}>
                    <Typography>{activity.description}</Typography>
                </Grid>
            </Grid>
            <Divider />
            <Grid container alignItems="center" pl={2} py={1}>
                <Grid size={1}>
                    <CalendarToday color="info" fontSize="large" />
                </Grid>
                <Grid size={11}>
                    <Typography>{formatDate(activity.date)}</Typography>
                </Grid>
            </Grid>
            <Divider />
            <Grid container alignItems="center" pl={2} py={1}>
                <Grid size={1}>
                    <Place color="info" fontSize="large" />
                </Grid>
                <Grid size={11} display={'flex'} justifyContent={'space-between'}>
                    <Typography>
                        {activity.venue}, {activity.city}
                    </Typography>
                    <Button sx={{whiteSpace:'nowrap'}} onClick={()=>setMapOpen(!mapOpen)}>
                        {mapOpen ?  'Hide map' : 'Show map'}
                    </Button>
                </Grid>
            </Grid>
            {mapOpen &&(<Box sx={{height:400, zIndex:1000, display:'block'}}>
                <MapComponent position={[activity.latitude, activity.langitude]} venue={activity.venue}/>
            </Box>)}
        </Paper>
    )
}