import { useCalendarStore } from "../../hooks"

export const FabDeleteEventButton = () => {

    const { startDeletingEvent, hasEventSelected } = useCalendarStore()
    
    const handleDelete = () => {
      startDeletingEvent();
    }


  return (
    <button className="btn btn-danger fab-danger"
        style={{ display: hasEventSelected ? 'block' : 'none' }} 
        onClick={ handleDelete }
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}
