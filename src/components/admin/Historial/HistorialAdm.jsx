import React, { useState, useEffect, useMemo } from "react";
import styles from "./HistorialAdm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
//import { confirm } from "react-bootstrap-confirmation";
import { TableDatas } from "../../TableDatas";
import { Modal, Button } from "react-bootstrap";
import GeneralService from "../../../services/General.service";

export function Historial({updateTutorial, updateCapsula, updateJuego}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedReference, setSelectedReference] = useState(null);

  useEffect(() => {
    GeneralService.getHistorial()
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [updateTutorial, updateCapsula, updateJuego]);

  /*const AlertButton = async (row) => {
    const result = await confirm("¿Está seguro de eliminar este registro?", {
      title: "Confirmación",
      okButtonStyle: "danger",
      cancelButtonStyle: "primary",
      okText: "Eliminar",
      cancelText: "Cancelar",
    });

    if (result) {
      // Implementa la lógica para eliminar el registro.
      console.log("Eliminar registro:", row);
    }
  };*/

  const handleViewReference = (row) => {
    setSelectedReference(row);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReference(null);
  };

  const columns = [
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
      label: "Correo Electrónico",
    },
    {
      name: "Fecha",
      selector: (row) => row.date,
      sortable: true,
      label: "Fecha",
    },
    {
      name: "Acción",
      selector: (row) => row.action,
      sortable: true,
      label: "Acción",
    },
    {
      name: "Tipo",
      selector: (row) => row.type,
      sortable: true,
      label: "Tipo",
    },
    {
      name: "Acciones",
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
          {/*<button
            className={styles.delete}
            onClick={() => {
              AlertButton(row);
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
        </button>*/}
        </div>
      ),
    },
  ];

  return (
    <>
      <h2>Historial</h2>
      <TableDatas data={data} isLoading={isLoading} columns={columns} defaultSortField={2} />

      {/* Modal para mostrar la información de la referencia */}

      <Modal show={showModal} onHide={closeModal}>
        <div className={styles.modalContainer}>
          <div className={styles.closeButtonContainer}>
            <div className={styles.closeButton} onClick={closeModal}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
          <Modal.Body>
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
                      <label>Email del Dueño:</label>
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
                      <label>Email del Autor:</label>
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
                ) : null}
              </div>
            )}
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
