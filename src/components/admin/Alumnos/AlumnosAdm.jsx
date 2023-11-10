import React, { useEffect, useState, useMemo } from 'react';
import GeneralService from '../../../services/General.service';
import { TableDatas } from '../../TableDatas';
import styles from './AlumnosAdm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { AlumnosEditModal } from './AlumnosEditModal'; // Importa el componente de edición
import {alert, confirm} from 'react-bootstrap-confirmation';
import { AlumnosAddModal } from './AlumnosAddModal';
import UserService from '../../../services/User.service';


export function AlumnosAdm() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUserData, setSelectedUserData] = useState(null);
    const [updateUser, setUpdateUser] = useState(false);
    const [addUser, setAddUser] = useState(false);
    const [showNuevoAlumnoModal, setShowNuevoAlumnoModal] = useState(false);

    const handleAddAlumnoModal = () => {
        setShowNuevoAlumnoModal(!showNuevoAlumnoModal);
    }

    const onUpdateUser = () => {
        setUpdateUser(!updateUser);
    }

    const onAddAlumno = () => {
        setAddUser(!addUser);
    }

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
    }, [updateUser,addUser]);

    const deleteAlumno = (alumnoEmail) => {
        UserService.deleteUser(alumnoEmail)
        .then((res) => {
            console.log(res);
            onUpdateUser();
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const AlertButton = async (row) => {
        const result = await confirm('Está seguro de eliminar el alumno?', {title : "Confirmación", okButtonStyle:"danger", cancelButtonStyle:"primary", okText:"Eliminar", cancelText:"Cancelar"});

        if(result){
            deleteAlumno(row.email);
            return;
        }
        return;
    };

    const columns = [
        {
            name: 'Nombre',
            selector: (row) => row.name,
            sortable: true,
            center: true,

        },
        {
            name: 'Correo',
            selector: (row) => row.email,
            sortable: true,
            center: true,

        },
        {
            name: 'Rol',
            selector: (row) => row.role,
            sortable: true,
            center: true,
        },
        {
            name: 'Acciones',
            selector: (row) => row._id,
            right: true,
            cell: (row) => (
                <div className={styles.actions}>
                    <button
                        className={styles.edit}
                        onClick={() => {
                            setSelectedUserData(row);
                            handleShow();
                        }}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button className={styles.delete} onClick={() => {
                        AlertButton(row);
                    }}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </div>
            ),
            
        },

    ];
        
    

    const addAlumno = useMemo(() => {
        return (
            <button className={styles.add} onClick={handleAddAlumnoModal}><span>Agregar Alumno</span></button>
        );
    }, []);

    return (
        <>
            <h2>Alumnos</h2>
            <TableDatas data={data} isLoading={isLoading} columns={columns} actions={addAlumno} />

            <AlumnosEditModal
                show={showEditModal}
                handleShow={handleShow}
                userData={selectedUserData}
                onUpdateUser={onUpdateUser}
            />

            {/* Modal de agregar alumno */}
            <AlumnosAddModal
                show={showNuevoAlumnoModal}
                handleShow={handleAddAlumnoModal}
                onAddAlumno={onAddAlumno}
            />
        </>
    );
}
