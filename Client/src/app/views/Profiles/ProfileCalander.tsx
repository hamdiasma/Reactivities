import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useProfile } from '../../../lib/hooks/useProfile'
import { Typography } from '@mui/material'
import frLocale from '@fullcalendar/core/locales/fr';


interface Eventes {
    title: string,
    start: Date,
    id: string
}

export default function ProfileCalendar() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [events, setEvents] = useState<Eventes[] | undefined>([])
    const { loadingUserCalanderActivities, userCalanderActivities, dates, setDates } = useProfile(id, undefined, 'calander')

    useEffect(() => {
        const mappedEvents = userCalanderActivities?.map(el => ({
            title: el.title,
            start: el.date,
            id: el.id
        }))
        setEvents(mappedEvents)
    }, [userCalanderActivities]) // only run when items change

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDatesSet = (arg: any) => {
        setDates({
            startdate: arg.startStr,
            endDate: arg.endStr
        })
    }
    if (loadingUserCalanderActivities) return <Typography> Loading ...</Typography>    
    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: ''
            }}
            locale={frLocale}
            events={events}
            datesSet={handleDatesSet}
            viewDidMount={(arg) => {
                if (!dates.startdate || !dates.endDate) {
                    setDates({
                        startdate: arg.view.currentStart,
                        endDate: arg.view.currentEnd,
                    });
                }
            }}
            height="auto"
            eventClick={(info) => {
                info.jsEvent.preventDefault()
                navigate(`/activities/${info.event.id}`)
            }}
            eventDidMount={(info) => {

                info.el.style.cursor = 'pointer'
            }}
        />
    )
}
