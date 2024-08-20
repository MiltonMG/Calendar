import { useMemo, useState, useEffect } from 'react';
import Modal from 'react-modal';
import './CalendarModalStyles.css';
import { addHours, addMonths, differenceInSeconds } from 'date-fns';
import DatePicker, {
    registerLocale
} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarStore, useUiStore } from '../../../hooks';

registerLocale('es', es)


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const CalendarModal = () => {

    //Custom hook para manejar la store
    const { isDateModalOpen, closeDateModal } = useUiStore();
    
    // State
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { activeEvent, startSavingEvent } = useCalendarStore();

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)
    });

    // UseMemo
    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';
        return (formValues.title.trim().length < 2) ? 'is-invalid' : 'is-valid';
    }, [formValues.title, formSubmitted]);

    //useEfect
    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({
                ...activeEvent,
            })
        }
    }, [activeEvent])

    // Eventos
    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }
    const onDateChange = (event, changing ) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        closeDateModal();
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        // Validar que la fecha de inicio sea menor a la fecha de fin
        // el metodo differenceInSeconds devuelve la diferencia en segundos, el primer parametro es la fecha mayor y el segundo la fecha menor
        const difference = differenceInSeconds(formValues.end, formValues.start);
        
        if (difference <= 0 || isNaN(difference)) {
            Swal.fire('Fechas incorrectas', 'La fecha de fin debe ser mayor a la fecha de inicio', 'error');
            return;
        }
        if (formValues.title.trim().length < 2) {
            Swal.fire('Titulo incorrecto', 'El titulo debe tener al menos 2 caracteres', 'error');
            return;
        }
        await startSavingEvent( formValues );
        onCloseModal();
        setFormSubmitted(false);
    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className={'modal'}
            overlayClassName={'modal-fondo'}
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                        minDate={new Date()}
                        maxDate={addMonths(formValues.start,2)}
                        selected={formValues.start}
                        onChange={date => onDateChange(date, 'start')}
                        className='form-control'
                        dateFormat={'Pp'}
                        showTimeSelect
                        locale={'es'}
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker 
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={date => onDateChange(date, 'end')}
                        className='form-control'
                        dateFormat={'Pp'}
                        showTimeSelect
                        locale={'es'}
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>


        </Modal>
    )
}
