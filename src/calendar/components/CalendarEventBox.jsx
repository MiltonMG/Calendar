
export const CalendarEventBox = ({event}) => {
  
    const { title, user } = event

    return (
        <>
            <strong>{title}</strong>
            <br />
            <span>Usuario: {user.name}</span>
        </>
    )
}
