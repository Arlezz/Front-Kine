import { useEffect, useState, useMemo } from "react";

import styles from "./TutorialesAdm.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
//import { AlumnosEditModal } from './AlumnosEditModal'; // Importa el componente de edición
import { alert, confirm } from "react-bootstrap-confirmation";
//import TutorialService from '../../../services/Tutorial.service';
import GeneralService from "../../../../services/General.service";
import { TableDatas } from "../../../TableDatas";

export function TutorialesAdm() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTutorialData, setSelectedTutorialData] = useState(null);
  const [updateTutorial, setUpdateTutorial] = useState(false);
  const [addTutorial, setAddTutorial] = useState(false);
  const [showNuevoAlumnoModal, setShowNuevoAlumnoModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddAlumnoModal = () => {
    setShowNuevoAlumnoModal(!showNuevoAlumnoModal);
  };

  const handleCellClick = (row) => {
    window.open(row.url, "_blank");
  };

  const onUpdateTutorial = () => {
    setUpdateTutorial(!updateTutorial);
  };

  const onAddAlumno = () => {
    setAddTutorial(!addTutorial);
  };

  const handleShow = () => {
    setShowEditModal(!showEditModal);
  };

  useEffect(() => {
    GeneralService.getTutorials()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [updateTutorial, addTutorial]);

  /*const deleteAlumno = (alumnoEmail) => {
    TutorialService.deleteTutorial(alumnoEmail)
      .then((res) => {
        console.log(res);
        onUpdateTutorial();
      })
      .catch((err) => {
        console.log(err);
      });
  };*/

  const AlertButton = async (row) => {
    const result = await confirm("Está seguro de eliminar el alumno?", {
      title: "Confirmación",
      okButtonStyle: "danger",
      cancelButtonStyle: "primary",
      okText: "Eliminar",
      cancelText: "Cancelar",
    });

    if (result) {
      //deleteAlumno(row.email);
      return;
    }
    return;
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
    },
    {
      name: "Descripcion",
      selector: (row) => row.description,
      sortable: true,
      maxWidth: "500px",
    },
    {
      name: "Url",
      selector: (row) => (
        <div
          onClick={() => handleCellClick(row)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            color: isHovered ? "#2e81e4" : "#000",
          }}
        >
          {row.url}
        </div>
      ),
      sortable: true,
      wrap: true,
    },
    {
      name: "Dueño",
      selector: (row) => row.user.name,
      sortable: true,
      //maxWidth: "500px",
      wrap: true,
    },
    {
      name: "Acciones",
      selector: (row) => row._id,
      right: true,
      cell: (row) => (
        <div className={styles.actions}>
          <button
            className={styles.edit}
            onClick={() => {
              setSelectedTutorialData(row);
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

  return (
    <>
      <h2>Tutoriales</h2>
      <TableDatas
        data={data}
        isLoading={isLoading}
        columns={columns}
        actions={addAlumno}
      />

      {/*<AlumnosEditModal
        show={showEditModal}
        handleShow={handleShow}
        TutorialData={selectedTutorialData}
        onUpdateTutorial={onUpdateTutorial}
  />*/}

      {/* Modal de agregar alumno */}
      {/*<AlumnosAddModal show={showNuevoAlumnoModal} handleShow={handleAddAlumnoModal} onAddAlumno={onAddAlumno} />*/}
    </>
  );
}
