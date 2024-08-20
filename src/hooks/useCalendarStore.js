import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveState, onUpdateEvent } from "../store"

export const useCalendarStore = () => {
  
    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector(state => state.calendar) // useSelector es una funcion que recibe un callback que recibe el estado y retorna la propiedad que necesitamos

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveState(calendarEvent) )
    }

    const startSavingEvent = async ( calendarEvent ) => {
        // TODO: Llegar al backend

        // TODO Todo bien

        if( calendarEvent._id ) {
            // Actualizar
            dispatch( onUpdateEvent( {...calendarEvent} ) )
        }
        else {
            // Crear
            dispatch( onAddNewEvent( { ...calendarEvent, _id: new Date().getTime() } ) )
        }

    }

    const startDeletingEvent = () => {
        dispatch( onDeleteEvent() )
    }

    return {
        // Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,// convierte el valor a booleano, si es null = false, si no es true

        // Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }
}

