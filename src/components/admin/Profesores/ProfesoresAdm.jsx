import React, { useEffect, useState, useMemo } from "react";
import GeneralService from "../../../services/General.service";
import { TableDatas } from "../../TableDatas";
import styles from "./ProfesoresAdm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { ProfesoresEditModal } from "./ProfesoresEditModal"; // Importa el componente de edición
import { ProfesoresAddModal } from "./ProfesoresAddModal"; // Importa el componente de agregar profesor
import { alert, confirm } from "react-bootstrap-confirmation";
import UserService from "../../../services/User.service";

export function ProfesoresAdm() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [updateUser, setUpdateUser] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [showNuevoProfesorModal, setShowNuevoProfesorModal] = useState(false);

  const handleAddProfesorModal = () => {
    setShowNuevoProfesorModal(!showNuevoProfesorModal);
  };

  const onUpdateUser = () => {
    setUpdateUser(!updateUser);
  };

  const onAddProfesor = () => {
    setAddUser(!addUser);
  };

  const handleShow = () => {
    setShowEditModal(!showEditModal);
  };

  useEffect(() => {
    GeneralService.getProfesores()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [updateUser, addUser]);

  const deleteProfesor = (profesorEmail) => {
    UserService.deleteUser(profesorEmail)
    .then((res) => {
        console.log(res);
        onUpdateUser();
    })
    .catch((err) => {
        console.log(err);
    });
  };

  const AlertButton = async (row) => {
    const result = await confirm("¿Está seguro de eliminar el profesor?", {
      title: "Confirmación",
      okButtonStyle: "danger",
      cancelButtonStyle: "primary",
      okText: "Eliminar",
      cancelText: "Cancelar",
    });

    if (result) {
      deleteProfesor(row.email);
      return;
    }
    return;
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Acciones",
      selector: (row) => row._id,
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
          <button
            className={styles.delete}
            onClick={() => {
              AlertButton(row);
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      ),
    },
  ];

  const addProfesor = useMemo(() => {
    return (
      <button className={styles.add} onClick={handleAddProfesorModal}>
        <span>Agregar Profesor</span>
      </button>
    );
  }, []);

  return (
    <>
      <h2>Profesores</h2>
      <TableDatas
        data={data}
        isLoading={isLoading}
        columns={columns}
        actions={addProfesor}
      />

      <ProfesoresEditModal
        show={showEditModal}
        handleShow={handleShow}
        userData={selectedUserData}
        onUpdateUser={onUpdateUser}
      />

      {/* Modal de agregar profesor */}
      <ProfesoresAddModal
        show={showNuevoProfesorModal}
        handleShow={handleAddProfesorModal}
        onAddProfesor={onAddProfesor}
      />
    </>
  );
}
