// JuegosAdm.jsx

import React, { useEffect, useState, useMemo } from "react";
import styles from "./JuegosAdm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { confirm } from "react-bootstrap-confirmation";
import GeneralService from "../../../../services/General.service";
import { TableDatas } from "../../../TableDatas";
import { JuegosAddModal } from "./JuegosAddModal";

export function JuegosAdm() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateJuego, setUpdateJuego] = useState(false);
  const [addJuego, setAddJuego] = useState(false);
  const [showNuevoJuegoModal, setShowNuevoJuegoModal] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleAddJuegoModal = () => {
    setShowNuevoJuegoModal(!showNuevoJuegoModal);
  };

  const handleCellClick = (row) => {
    window.open(row.url, "_blank");
  };

  const onUpdateJuego = () => {
    setUpdateJuego(!updateJuego);
  };

  const onAddJuego = () => {
    setAddJuego(!addJuego);
  };


  useEffect(() => {
    GeneralService.getGames()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [updateJuego, addJuego]);

  const deleteGame = (juegoId) => {
    GeneralService.deleteGame (juegoId)
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

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.description,
      sortable: true,
      maxWidth: "500px",
    },
    {
      name: "URL",
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
      name: "Dueño",
      selector: (row) => row.user.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Rol",
      selector: (row) => row.user.role,
      sortable: true,
      wrap: true,
    },
    {
      name: "Acciones",
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

  return (
    <>
      <h2>Mis Juegos</h2>
      <TableDatas
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
