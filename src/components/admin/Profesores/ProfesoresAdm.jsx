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
  const [dataSaver, setDataSaver] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

  const onChange = async (e) => {
    setName(e.target.value);
    console.log(e);
    var searchData = dataSaver.filter((item) => {
      if (
        item.name
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        return item;
      }
    });

    if (searchData.length === 0) {
      setData(data);
    } else {
      setData(searchData);
    }
  };

  const onChange2 = async (e) => {
    setEmail(e.target.value);
    var searchData = dataSaver.filter((item) => {
      if (
        item.email
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        return item;
      }
    });

    if (searchData.length === 0) {
      setData(data);
    } else {
      setData(searchData);
    }
  };

  const columns = [
    {
      name: (
        <div className={styles.sortContainer}>
          Nombre
          <input
            type="text"
            placeholder="Buscar"
            className={styles.inputSort}
            value={name}
            onChange={(e) => onChange(e)}
            style={{ width: "100%" }}
          />
        </div>
      ),
      selector: (row) => row.name,
      sortable: false,
    },
    {
      name: (
        <div className={styles.sortContainer}>
          Correo
          <input
            type="text"
            placeholder="Buscar"
            className={styles.inputSort}
            value={email}
            onChange={(e) => onChange2(e)}
            style={{ width: "100%" }}
          />
        </div>
      ),
      selector: (row) => row.email,
      sortable: false,
    },
    {
      name: <div className={styles.sortContainer}>Rol</div>,
      selector: (row) => row.role,
    },
    {
      name: <div className={styles.sortContainer}>Acciones</div>,
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

  const title = useMemo(() => {
    return <h2 className={styles.tableHeader}>Profesores</h2>;
  }, []);

  return (
    <>
      <TableDatas
        title={title}
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
