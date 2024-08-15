

export const getMessages = () => {
    const CalendarLenguage = 'es';

    if (CalendarLenguage === 'es'){
        return {
            allDay: 'Todo el día',
            previous: '⬅',
            next: '➡',
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
            agenda: 'Agenda',
            date: 'Fecha',
            time: 'Hora',
            event: 'Evento',
            noEventsInRange: 'No hay eventos en este rango',
            showMore: total => `+ Ver más (${total})`
        }
    }
    else{
        return {
            allDay: 'All day',
            previous: '<',
            next: '>',
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day',
            agenda: 'Agenda',
            date: 'Date',
            time: 'Time',
            event: 'Event',
            noEventsInRange: 'There are no events in this range',
            showMore: total => `+ See more (${total})`
        }
    }

}