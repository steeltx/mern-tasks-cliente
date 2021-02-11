import { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import { v4 as uuidv4 } from 'uuid';

const FormTarea = () => {

    // obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    // effect que detecta si hay tarea seleccionada
    useEffect(() => {
        if (tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({
                nombre: ''
            });
        }
    }, [tareaseleccionada]);

    // state del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    });

    //extraer el nombre del proyecto
    const { nombre } = tarea;

    // si no hay proyecto seleccionado
    if (!proyecto) return null;

    // array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // leer los valores
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();

        // validar
        if (nombre.trim() === '') {
            validarTarea();
            return;
        }

        // si es edicion o nueva tarea
        if (tareaseleccionada === null) {
            // tarea nuevo
            // agregar la nueva tarea al state de tareas
            tarea.id = uuidv4();
            tarea.proyectoId = proyectoActual.id;
            tarea.estado = false;
            agregarTarea(tarea);
        }else{
            // actualizar tarea existente
            actualizarTarea(tarea);
            // elimina tarea seleccionada del state
            limpiarTarea();
        }

        // obtener y filtrar las tareas del proyecto
        obtenerTareas(proyectoActual.id);

        // reiniciar el form
        guardarTarea({
            nombre: ''
        });
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea ..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    );
}

export default FormTarea;