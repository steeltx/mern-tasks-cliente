import { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
    AGREGAR_PROYECTO,
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types';

const ProyectoState = props => {

    const proyectos = [
        { id: 1, nombre: 'Tienda' },
        { id: 2, nombre: 'Sitio web' },
        { id: 3, nombre: 'Intranet' },
        { id: 4, nombre: 'MERN' }
    ];

    const initialState = {
        proyectos: [],
        formulario: false,
        errorFormulario: false,
        proyecto: null
    }

    // dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    // serie de funciones para crud
    const mostrarFormulario = () => {
        dispatch({
            formulario: state.formulario,
            type: FORMULARIO_PROYECTO
        });
    }

    // obtener los proyectos
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        });
    }

    // agregar nuevo proyecto
    const agregarProyecto = proyecto => {
        proyecto.id = uuidv4();
        // insertar el proyecto en el state
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        });
    }

    // valida el formilario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        });
    }

    // seleccionar el proyecto que el usuario dio clic
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        });
    }

    // eliminar un proyecto
    const eliminarProyecto = proyectoId => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        });
    }
    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    );
}

export default ProyectoState;