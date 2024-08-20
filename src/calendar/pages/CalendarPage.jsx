import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEventBox, CalendarModal, FabAddNewEventButton, FabDeleteEventButton, Navbar } from "../"
import { localizer, getMessages } from '../../helpers'
import { useState } from 'react'
import { useUiStore, useCalendarStore } from '../../hooks'


export const CalendarPage = () => {

    const { openDateModal } = useUiStore();
    const { events, setActiveEvent } = useCalendarStore();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

    const EventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    }

    const onDoubleClick = (e) => {
        openDateModal();
    }
    const onSelectEvent = (e) => {
        setActiveEvent(e)
    }
    const onViewChanged = (e) => {
        localStorage.setItem('lastView', e)
        setLastView(e)
    }

    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessages()}
                eventPropGetter={ EventStyleGetter }
                components={{
                    event: CalendarEventBox
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChanged }
            />

            <CalendarModal />

            <FabAddNewEventButton />
            <FabDeleteEventButton />

        </>
    )
}
