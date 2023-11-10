import { useEffect, useState, useMemo } from "react";

import styles from "./CapsulasAdm.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { confirm } from "react-bootstrap-confirmation";
import GeneralService from "../../../../services/General.service";
import { TableDatas } from "../../../TableDatas";
import { CapsulasAddModal } from "./CapsulasAddModal";

export function CapsulasAdm() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateCapsula, setUpdateCapsula] = useState(false);
  const [addCapsula, setAddCapsula] = useState(false);
  const [showNuevaCapsulaModal, setShowNuevoCapsulaModal] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleAddCapsulalModal = () => {
    setShowNuevoCapsulaModal(!showNuevaCapsulaModal);
  };

  const handleCellClick = (row) => {
    window.open(row.url, "_blank");
  };

  const onUpdateTutorial = () => {
    setUpdateCapsula(!updateCapsula);
  };

  const onAddCapsula = () => {
    setAddCapsula(!addCapsula);
  };


  useEffect(() => {
    GeneralService.getCapsules()
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
  }, [updateCapsula, addCapsula]);

  const deleteCapsule = (capsuleId) => {
    GeneralService.deleteCapsule(capsuleId)
      .then((res) => {
        console.log(res);
        onUpdateTutorial();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AlertButton = async (row) => {
    const result = await confirm("Está seguro de eliminar la Capsula?", {
      title: "Confirmación",
      okButtonStyle: "danger",
      cancelButtonStyle: "primary",
      okText: "Eliminar",
      cancelText: "Cancelar",
    });

    if (result) {
      deleteCapsule(row._id);
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
      <button className={styles.add} onClick={handleAddCapsulalModal}>
        <span>Agregar Capsula</span>
      </button>
    );
  }, []);

  return (
    <>
      <h2>Mis Capsulas</h2>
      <TableDatas
        data={data}
        isLoading={isLoading}
        columns={columns}
        actions={addAlumno}
      />

      <CapsulasAddModal show={showNuevaCapsulaModal} handleShow={handleAddCapsulalModal} onAddCapsula={onAddCapsula} />
    </>
  );
}
