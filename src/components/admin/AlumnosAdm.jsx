import React, { useEffect, useState, useMemo } from 'react';
import GeneralService from '../../services/General.service';
import { TableDatas } from '../TableDatas';
import styles from './AlumnosAdm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { AlumnosEditModal } from './AlumnosEditModal'; // Importa el componente de edición

export function AlumnosAdm() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false); // Controla la visibilidad del modal de edición
    const [selectedUserData, setSelectedUserData] = useState(null); // Almacena los datos del usuario seleccionado para editar

    const handleShow = () => {
        setShowEditModal(!showEditModal);
    }

    useEffect(() => {
        GeneralService.getAlumnos()
            .then((res) => {
                setData(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const columns = [
        {
            name: 'Nombre',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Correo',
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: 'Rol',
            selector: (row) => row.role,
            sortable: true,
        },
        {
            name: 'Acciones',
            selector: (row) => row._id,
            cell: (row) => (
                <div className={styles.actions}>
                    <button
                        className={styles.edit}
                        onClick={() => {
                            //setSelectedUserData(null);
                            // Cuando se hace clic en el botón de editar, muestra el modal de edición
                            console.log("El usuario ",row);
                            setSelectedUserData(row);
                            handleShow();
                        }}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button className={styles.delete}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </div>
            ),
            
        },

    ];


    const addAlumno = useMemo(() => {
        return (
            <button className={styles.add} onClick={() => setShowEditModal(true)}>
                Agregar
            </button>
        );
    }, []);

    return (
        <>
            <h2>Alumnos</h2>
            <TableDatas data={data} isLoading={isLoading} columns={columns} actions={addAlumno} />

            {/* Modal de edición de usuarios */}
            <AlumnosEditModal
                show={showEditModal}
                handleShow={handleShow}
                userData={selectedUserData}
                onUpdateUser={(updatedUserData) => {
                    // Aquí puedes agregar la lógica para actualizar el usuario con los nuevos datos (por ejemplo, una llamada a la API)
                    console.log('Usuario actualizado:', updatedUserData);
                }}
            />
        </>
    );
}
