import React, { useState, useEffect, useMemo } from "react";
import styles from "./HistorialAdm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
//import { confirm } from "react-bootstrap-confirmation";
import { TableDatas } from "../../TableDatas";
import { Modal, Button } from "react-bootstrap";
import GeneralService from "../../../services/General.service";

export function Historial({updateTutorial, updateCapsula, updateJuego, updatePost, updateCommetario}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedReference, setSelectedReference] = useState(null);
  const [email , setEmail] = useState("");
  const [dataSaver, setDataSaver] = useState([]);
  const [fecha, setFecha] = useState("");
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    GeneralService.getHistorial()
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
  }, [updateTutorial, updateCapsula, updateJuego,updatePost, updateCommetario]);


  const handleViewReference = (row) => {
    setSelectedReference(row);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReference(null);
  };

  const onChange = async (e) => {
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

  const onChange2 = async (e) => {
    setFecha(e.target.value);
    var searchData = dataSaver.filter((item) => {
      if (
        item.date
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

  const onChange3 = async (e) => {
    setTipo(e.target.value);
    var searchData = dataSaver.filter((item) => {
      if (
        item.type
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
          Fecha
          <input
            type="text"
            placeholder="Buscar"
            className={styles.inputSort}

            value={fecha}
            onChange={(e) => onChange2(e)}
            style={{ width: "100%", marginTop: ".5rem"}}
          />
        </div>
      ),
      selector: (row) => row.date,
      sortable: true,
      wrap: true,
      label: "Correo Electrónico",
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
            onChange={(e) => onChange(e)}
            style={{ width: "100%", marginTop: ".5rem"}}
          />
        </div>
      ),
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
      label: "Correo Electrónico",
    },
    {
      name: <div className={styles.sortContainer}>Acción</div>,
      selector: (row) => row.action,
      sortable: true,
      label: "Acción",
    },
    {
      name: (
        <div className={styles.sortContainer}>
          Tipo
          <input
            type="text"
            placeholder="Buscar"
            className={styles.inputSort}

            value={tipo}
            onChange={(e) => onChange3(e)}
            style={{ width: "100%", marginTop: ".5rem"}}
          />
        </div>
      ),
      selector: (row) => row.type ,
      sortable: true,
      wrap: true,
      label: "Correo Electrónico",
    },
    {
      name: <div className={styles.sortContainer}>Acciones</div>,
      selector: (row) => row._id,
      center: true,
      cell: (row) => (
        <div className={styles.actions}>
          <button
            className={styles.view}
            onClick={() => handleViewReference(row)}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <h2 className={styles.tablaTitle}>Historial</h2>
      <TableDatas 
        data={data} 
        isLoading={isLoading} 
        columns={columns}
        defaultSortField={2} 
        noDataComponent={"No hay datos para mostrar"}
      />

      {/* Modal para mostrar la información de la referencia */}

      <Modal show={showModal} onHide={closeModal}>
        <div className={styles.modalContainer}>
        <div className={styles.closeButtonContainer}>
          <div className={styles.closeButton} onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
            {/* Renderiza la información de la referencia aquí */}
            {selectedReference && (
              <div className={styles.referenceDetails}>
                <h2>Detalles</h2>
                {selectedReference.type === "Tutorial" ||
                selectedReference.type === "Capsule" ||
                selectedReference.type === "Game" ? (
                  <>
                    <div>
                      <label>Título:</label>
                      <input
                        type="text"
                        value={selectedReference.object.title}
                        disabled
                      />
                    </div>
                    <div>
                      <label>URL:</label>
                      <input
                        type="text"
                        value={selectedReference.object.url}
                        disabled
                      />
                    </div>
                    <div>
                      <label>Descripción:</label>
                      {selectedReference.object.description ? (
                        <textarea
                          value={selectedReference.object.description}
                          rows="4"
                          disabled
                        />
                      ) : (
                        <input type="text" value="Sin descripción" disabled />
                      )}
                    </div>
                    <div>
                      <label>Correo del Dueño:</label>
                      <input
                        type="text"
                        value={selectedReference.object.user.email}
                        disabled
                      />
                    </div>
                    <div>
                      <label>Nombre del Dueño:</label>
                      <input
                        type="text"
                        value={
                          selectedReference.object.user.name || "Undefined"
                        }
                        disabled
                      />
                    </div>
                  </>
                ) : selectedReference.type === "Post" ? (
                  <>
                    <div>
                      <label>Título:</label>
                      <input
                        type="text"
                        value={selectedReference.object.title}
                        disabled
                      />
                    </div>
                    <div>
                      <label>Contenido:</label>
                      <textarea
                        value={selectedReference.object.content}
                        rows="4"
                        disabled
                      />
                    </div>
                    <div>
                      <label>Correo del Autor:</label>
                      <input
                        type="text"
                        value={selectedReference.object.user.email}
                        disabled
                      />
                    </div>
                    <div>
                      <label>Nombre del Autor:</label>
                      <input
                        type="text"
                        value={selectedReference.object.user.name}
                        disabled
                      />
                    </div>
                  </>
                ) :  selectedReference.type === "Comment" ? (                 
                  <>
                  <div>
                      <label>Nombre del Autor del Comentario:</label>
                      <input
                        type="text"
                        value={selectedReference.object.user.name}
                        disabled
                      />
                    </div>
                    <div>
                      <label>Correo del Autor del Comentario:</label>
                      <input
                        type="text"
                        value={selectedReference.object.user.email}
                        disabled
                      />
                    </div>
                    <div>
                      <label>Contenido del Comentario:</label>
                      <textarea
                        value={selectedReference.object.content}
                        rows="4"
                        disabled
                      />
                    </div>                    
                  </>
                ) : null}
              </div>
            )}
        </div>
      </Modal>
    </>
  );
}
