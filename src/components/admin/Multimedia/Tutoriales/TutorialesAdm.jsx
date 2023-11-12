import { useEffect, useState, useMemo } from "react";

import styles from "./TutorialesAdm.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { confirm } from "react-bootstrap-confirmation";
import GeneralService from "../../../../services/General.service";
import { TableDatas } from "../../../TableDatas";
import { TutorialesAddModal } from "./TutorialesAddModal";
import AuthService from "../../../../services/Auth.service";

export function TutorialesAdm({
  updateTutorial,
  onUpdateTutorial

}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //const [updateTutorial, setUpdateTutorial] = useState(false);
  const [addTutorial, setAddTutorial] = useState(false);
  const [showNuevoTutorialModal, setShowNuevoTutorialModal] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleAddTutorialModal = () => {
    setShowNuevoTutorialModal(!showNuevoTutorialModal);
  };

  const handleCellClick = (row) => {
    window.open(row.url, "_blank");
  };


  const onAddTutorial = () => {
    setAddTutorial(!addTutorial);
    onUpdateTutorial()
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

  const deleteTutorial = (tutorialId) => {

    const user = AuthService.getCurrentUser();

    GeneralService.deleteTutorial(tutorialId, user.email)
      .then((res) => {
        console.log(res);
        onUpdateTutorial();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AlertButton = async (row) => {
    const result = await confirm("Está seguro de eliminar el Tutorial?", {
      title: "Confirmación",
      okButtonStyle: "danger",
      cancelButtonStyle: "primary",
      okText: "Eliminar",
      cancelText: "Cancelar",
    });

    if (result) {
      deleteTutorial(row._id);
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
          onMouseEnter={() => setHoveredRow(row._id)}
          onMouseLeave={() => setHoveredRow(null)}
          style={{
            color: hoveredRow === row._id ? "#2e81e4" : "#000",
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
      name: "Rol",
      selector: (row) => row.user.role,
      sortable: true,
      //maxWidth: "500px",
      wrap: true,
    },
    {
      name: "Acciones",
      selector: (row) => row._id,
      center: true,
      cell: (row) => (
        <div className={styles.actions}>
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
      <button className={styles.add} onClick={handleAddTutorialModal}>
        <span>Agregar Tutorial</span>
      </button>
    );
  }, []);

  return (
    <>
      <h2>Mis Tutoriales</h2>
      <TableDatas
        data={data}
        isLoading={isLoading}
        columns={columns}
        actions={addAlumno}
      />

      <TutorialesAddModal show={showNuevoTutorialModal} handleShow={handleAddTutorialModal} onAddTutorial={onAddTutorial} />
    </>
  );
}
