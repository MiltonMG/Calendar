import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours} from 'date-fns'
import { CalendarEventBox, Navbar } from "../"
import { localizer, getMessages } from '../../helpers'
import { useState } from 'react'


const myEventsList = [{
    title: 'Cumpleaños del jefe',
    notes: 'Comprar el regalo',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Test User'
    }
}]

export const CalendarPage = () => {

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
        console.log({ doubleClick: e });
    }
    const onSelectEvent = (e) => {
        console.log({ click: e });
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
                events={myEventsList}
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


        </>
    )
}
