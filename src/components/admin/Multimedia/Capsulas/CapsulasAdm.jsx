import { useEffect, useState, useMemo } from "react";

import styles from "./CapsulasAdm.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { confirm } from "react-bootstrap-confirmation";
import GeneralService from "../../../../services/General.service";
import { TableDatas } from "../../../TableDatas";
import { CapsulasAddModal } from "./CapsulasAddModal";
import AuthService from "../../../../services/Auth.service";

export function CapsulasAdm({
  updateCapsula,
  onUpdateCapsula
}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //const [updateCapsula, setUpdateCapsula] = useState(false);
  const [addCapsula, setAddCapsula] = useState(false);
  const [showNuevaCapsulaModal, setShowNuevoCapsulaModal] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [nombre , setNombre] = useState("");
  const [dueño , setDueño] = useState("");
  const [dataSaver, setDataSaver] = useState([]);


  const handleAddCapsulalModal = () => {
    setShowNuevoCapsulaModal(!showNuevaCapsulaModal);
  };

  const handleCellClick = (row) => {
    window.open(row.url, "_blank");
  };


  const onAddCapsula = () => {
    setAddCapsula(!addCapsula);
    onUpdateCapsula()
  };


  useEffect(() => {
    GeneralService.getCapsules()
      .then((res) => {
        console.log(res);
        setData(res);
        setDataSaver(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [updateCapsula, addCapsula]);

  const deleteCapsule = (capsuleId) => {
    const user = AuthService.getCurrentUser();

    GeneralService.deleteCapsule(capsuleId, user.email)
      .then((res) => {
        console.log("TAMARE ",res);
        onUpdateCapsula();
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
            value={nombre}
            className={styles.inputSort}

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
      selector: (row) => row.user.name,
      sortable: false,
      wrap: true,
  },
    {
      name: <div className={styles.sortContainer}>Rol</div>,
      selector: (row) => row.user.role,
      sortable: true,
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
      <button className={styles.add} onClick={handleAddCapsulalModal}>
        <span>Agregar Capsula</span>
      </button>
    );
  }, []);

  const title = useMemo(() => {
    return <h2 className={styles.tableHeader}>Mis Capsulas</h2>;
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

      <CapsulasAddModal show={showNuevaCapsulaModal} handleShow={handleAddCapsulalModal} onAddCapsula={onAddCapsula} />
    </>
  );
}
