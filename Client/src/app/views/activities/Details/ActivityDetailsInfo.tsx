import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { formatDate } from "../../../../lib/util/util";
import { useState } from "react";
import MapComponent from "../../../Shared/Components/MapComponent";

interface IProps {
    activity: IActivity
}

export default function ActivityDetailsInfo({ activity }: IProps) {
    const [mapOpen, setMapOpen] = useState(true)
    return (
        <Paper sx={{ mb: 2 }}>
            <Box display={"flex"} gap={2} alignItems="center" pl={2} py={1}>
                <Info color="info" fontSize="large" />
                <Typography>{activity.description}</Typography>
            </Box>
            <Divider />
            <Box display={"flex"} gap={2} alignItems="center" pl={2} py={1}>
                <CalendarToday color="info" fontSize="large" />
                <Typography>{formatDate(activity.date)}</Typography>
            </Box>
            <Divider />
            <Box display={"flex"} gap={2} alignItems="center" pl={2} py={1}>
                <Place color="info" fontSize="large" />
                <Box sx={{ width: '100%' }} display={'flex'} justifyContent={'space-between'}>
                    <Typography>
                        {activity.venue}, {activity.city}
                    </Typography>
                    <Button sx={{ whiteSpace: 'nowrap', mr: 2 }} onClick={() => setMapOpen(!mapOpen)}>
                        {mapOpen ? 'Hide map' : 'Show map'}
                    </Button>
                </Box>
            </Box>
            {mapOpen && (<Box sx={{ height: 400, zIndex: 1000, display: 'block' }}>
                <MapComponent position={[activity.latitude, activity.langitude]} venue={activity.venue} />
            </Box>)}
        </Paper>
    )
}