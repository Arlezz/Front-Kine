import React, { useEffect, useState, useMemo } from "react";
import GeneralService from "../../../services/General.service";
import { TableDatas } from "../../TableDatas";
import styles from "./AlumnosAdm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { AlumnosEditModal } from "./AlumnosEditModal"; // Importa el componente de edición
import { confirm } from "react-bootstrap-confirmation";
import { AlumnosAddModal } from "./AlumnosAddModal";
import UserService from "../../../services/User.service";

export function AlumnosAdm() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [updateUser, setUpdateUser] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [showNuevoAlumnoModal, setShowNuevoAlumnoModal] = useState(false);
  const [dataSaver, setDataSaver] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddAlumnoModal = () => {
    setShowNuevoAlumnoModal(!showNuevoAlumnoModal);
  };

  const onUpdateUser = () => {
    setUpdateUser(!updateUser);
  };

  const onAddAlumno = () => {
    setAddUser(!addUser);
  };

  const handleShow = () => {
    setShowEditModal(!showEditModal);
  };

  useEffect(() => {
    GeneralService.getAlumnos()
      .then((res) => {
        setData(res);
        setDataSaver(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [updateUser, addUser]);

  const deleteAlumno = (alumnoEmail) => {
    UserService.deleteUser(alumnoEmail)
      .then((res) => {
        onUpdateUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AlertButton = async (row) => {
    const result = await confirm("Está seguro de eliminar el alumno?", {
      title: "Confirmación",
      okButtonStyle: "danger",
      cancelButtonStyle: "primary",
      okText: "Eliminar",
      cancelText: "Cancelar",
    });

    if (result) {
      deleteAlumno(row.email);
      return;
    }
    return;
  };

  const onChange = async (e) => {
    setName(e.target.value);
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
            style={{ width: "100%", paddingLeft: ".5rem" }}
          />
        </div>
      ),
      selector: (row) => row.name? row.name : "usuario",
      sortable: true,
    },
    {
      name: (
        <div className={styles.sortContainer}>
          Correo
          <input
            type="text"
            className={styles.inputSort}
            placeholder="Buscar"
            value={email}
            onChange={(e) => onChange2(e)}
            style={{ width: "100%" }}
          />
        </div>
      ),
      selector: (row) => row.email? row.email : "email",
      sortable: true,
    },
    {
      name: <div className={styles.sortContainer}>Rol</div>,
      selector: (row) => row.role? row.role : "rol",
      sortable: true,
    },
    {
      name: <div className={styles.sortContainer}>Acciones</div>,
      selector: (row) => row._id,
      center: true,
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

  const addAlumno = useMemo(() => {
    return (
      <button className={styles.add} onClick={handleAddAlumnoModal}>
        <span>Agregar Alumno</span>
      </button>
    );
  }, []);

  const title = useMemo(() => {
    return <h2 className={styles.tableHeader}>Alumnos</h2>;
  }, []);

  return (
    <>
      <TableDatas
        title={title}   
        data={data}
        isLoading={isLoading}
        columns={columns}
        actions={addAlumno}
      />

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
