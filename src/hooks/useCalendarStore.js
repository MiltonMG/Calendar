import { useDispatch, useSelector } from "react-redux"
import { onSetActiveState } from "../store"

export const useCalendarStore = () => {
  
    const dispatch = useDispatch()
    const { events, activeEvent } = 
    
    useSelector(state => state.calendar) // useSelector es una funcion que recibe un callback que recibe el estado y retorna la propiedad que necesitamos

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveState(calendarEvent) )
    }

    return {
        // Propiedades
        events,
        activeEvent,

        // Metodos
        setActiveEvent
    }
}

