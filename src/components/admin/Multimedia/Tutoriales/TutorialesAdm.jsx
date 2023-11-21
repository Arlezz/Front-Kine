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
  const [nombre , setNombre] = useState("");
  const [dueño , setDueño] = useState("");
  const [dataSaver, setDataSaver] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

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
    const fetchData = async () => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
  
        // Verificar si el usuario tiene el rol de "profesor"
        if (user.role === "profesor") {
          try {
            const res = await GeneralService.getMiTutorials(user.email);
            setData(res);
            setDataSaver(res);
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        } else {
          // Si el usuario no es profesor, realiza la lógica para obtener todos los tutoriales
          try {
            const res = await GeneralService.getTutorials();
            setData(res);
            setDataSaver(res);
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        }
      }
    };
  
    // Llamar a la función fetchData
    fetchData();
  
  }, [updateTutorial, addTutorial]);
  

  const deleteTutorial = (tutorialId) => {

    const user = AuthService.getCurrentUser();

    GeneralService.deleteTutorial(tutorialId, user.email)
      .then((res) => {
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

  const onChange = async (e) => {
    setNombre(e.target.value);
    var searchData = dataSaver.filter((item) => {
      if (
        item.title
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
    setDueño(e.target.value);
    var searchData = dataSaver.filter((item) => {
      if (
        item.user.name
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

            value={nombre}
            onChange={(e) => onChange(e)}
            style={{ width: "100%", marginTop: ".5rem"}}
          />
        </div>
      ),
      selector: (row) => row.title,
      sortable: false,
      wrap: true,
  },
    {
      name: <div className={styles.sortContainer}>Descripción</div>,
      selector: (row) => row.description,
      sortable: true,
      maxWidth: "500px",
    },
    {
      name: <div className={styles.sortContainer}>Url</div>,
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
      name: (
        <div className={styles.sortContainer}>
          Dueño
          <input
            type="text"
            placeholder="Buscar"
            className={styles.inputSort}

            value={dueño}
            onChange={(e) => onChange2(e)}
            style={{ width: "100%", marginTop: ".5rem"}}
          />
        </div>
      ),
      selector: (row) => currentUser.role==="profesor"? currentUser.name : row.user.name,
      sortable: false,
  },
    {
      name: <div className={styles.sortContainer}>Rol</div>,
      selector: (row) => currentUser.role==="profesor"? currentUser.role : row.user.role,
      sortable: true,
      //maxWidth: "500px",
      wrap: true,
    },
    {
      name: <div className={styles.sortContainer}>Acciones</div>,
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

  const title = useMemo(() => {
    return <h2 className={styles.tableHeader}>Mis Tutoriales</h2>;
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

      <TutorialesAddModal show={showNuevoTutorialModal} handleShow={handleAddTutorialModal} onAddTutorial={onAddTutorial} />
    </>
  );
}
