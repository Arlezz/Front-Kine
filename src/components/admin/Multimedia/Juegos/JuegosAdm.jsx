// JuegosAdm.jsx

import React, { useEffect, useState, useMemo } from "react";
import styles from "./JuegosAdm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { confirm } from "react-bootstrap-confirmation";
import GeneralService from "../../../../services/General.service";
import { TableDatas } from "../../../TableDatas";
import { JuegosAddModal } from "./JuegosAddModal";
import AuthService from "../../../../services/Auth.service";

export function JuegosAdm({
  updateJuego,
  onUpdateJuego
}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //const [updateJuego, setUpdateJuego] = useState(false);
  const [addJuego, setAddJuego] = useState(false);
  const [showNuevoJuegoModal, setShowNuevoJuegoModal] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [nombre , setNombre] = useState("");
  const [dueño , setDueño] = useState("");
  const [dataSaver, setDataSaver] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);


  const handleAddJuegoModal = () => {
    setShowNuevoJuegoModal(!showNuevoJuegoModal);
  };

  const handleCellClick = (row) => {
    window.open(row.url, "_blank");
  };


  const onAddJuego = () => {
    setAddJuego(!addJuego);
    onUpdateJuego()
  };


  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  /*useEffect(() => {
    GeneralService.getGames()
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
  }, [updateJuego, addJuego]);*/

  useEffect(() => {
    const fetchData = async () => {
      // Verificar si el usuario tiene el rol de "profesor"
      if (currentUser && currentUser.role === "profesor") {
        try {
          const res = await GeneralService.getMiGames(currentUser.email);
          setData(res);
          setDataSaver(res);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Si el usuario no es profesor, realiza la lógica para obtener todos los juegos
        try {
          const res = await GeneralService.getGames();
          setData(res);
          setDataSaver(res);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
  
    // Llamar a la función fetchData
    fetchData();
  
  }, [updateJuego, addJuego, currentUser]);

  const deleteGame = (juegoId) => {
    const user = AuthService.getCurrentUser();

    GeneralService.deleteGame (juegoId,user.email)
      .then((res) => {
        console.log(res);
        onUpdateJuego();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AlertButton = async (row) => {
    const result = await confirm("¿Está seguro de eliminar el Juego?", {
      title: "Confirmación",
      okButtonStyle: "danger",
      cancelButtonStyle: "primary",
      okText: "Eliminar",
      cancelText: "Cancelar",
    });

    if (result) {
      deleteGame(row._id);
      return;
    }
    return;
  };

  const onChange = async (e) => {
    setNombre(e.target.value);
    console.log(e);
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
          onMouseEnter={() => setHoveredRow(row.id)}
          onMouseLeave={() => setHoveredRow(null)}
          style={{
            color: hoveredRow === row.id ? "#2e81e4" : "#000",
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
      wrap: true,
  },
    {
      name: <div className={styles.sortContainer}>Rol</div>,
      selector: (row) => currentUser.role==="profesor"? currentUser.role : row.user.role,
      sortable: true,
      wrap: true,
    },
    {
      name: <div className={styles.sortContainer}>Acciones</div>,
      selector: (row) => row.id,
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

  const addJuegoButton = useMemo(() => {
    return (
      <button className={styles.add} onClick={handleAddJuegoModal}>
        <span>Agregar Juego</span>
      </button>
    );
  }, []);

  const title = useMemo(() => {
    return <h2 className={styles.tableHeader}>Mis Juegos</h2>;
  }, []);

  return (
    <>
      <TableDatas
        title={title}
        data={data}
        isLoading={isLoading}
        columns={columns}
        actions={addJuegoButton}
      />

      <JuegosAddModal
        show={showNuevoJuegoModal}
        handleShow={handleAddJuegoModal}
        onAddJuego={onAddJuego}
      />
    </>
  );
}
