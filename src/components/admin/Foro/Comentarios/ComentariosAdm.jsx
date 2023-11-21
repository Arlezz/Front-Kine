import { useEffect, useState, useMemo } from "react";

import styles from "./ComentariosAdm.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { confirm } from "react-bootstrap-confirmation";
import GeneralService from "../../../../services/General.service";
import { TableDatas } from "../../../TableDatas";
import AuthService from "../../../../services/Auth.service";

export function ComentariosAdm({ updateCommetario, onUpdateComentario }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comentario, setComentario] = useState("");
  const [dueño, setDueño] = useState("");
  const [dataSaver, setDataSaver] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
      }
  
      // Verificar si el usuario tiene el rol de "profesor"
      if (user && user.role === "profesor") {
        try {
          const res = await GeneralService.getAllMyComments(user.email);
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
          const res = await GeneralService.getComements();
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
  
  }, [updateCommetario]);
  



  const deletePost = (tutorialId) => {
    GeneralService.delComment(tutorialId)
      .then((res) => {
        onUpdateComentario();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AlertButton = async (row) => {
    const result = await confirm("Está seguro de eliminar el Comentario?", {
      title: "Confirmación",
      okButtonStyle: "danger",
      cancelButtonStyle: "primary",
      okText: "Eliminar",
      cancelText: "Cancelar",
    });

    if (result) {
      deletePost(row._id);
      return;
    }
    return;
  };

  const onChange = async (e) => {
    setComentario(e.target.value);
    var searchData = dataSaver.filter((item) => {
      if (
        item.content
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
          Comentario
          <input
            type="text"
            placeholder="Buscar"
            className={styles.inputSort}
            value={comentario}
            onChange={(e) => onChange(e)}
            style={{ width: "100%" }}
          />
        </div>
      ),
      selector: (row) => row.content,
      sortable: true,
    },
    {
      name: <div className={styles.sortContainer}>Publicado</div>,
      selector: (row) => row.date,
      sortable: true,
      wrap: true,
      maxWidth: "200px",
    },
    {
      name: <div className={styles.sortContainer}>Likes</div>,
      selector: (row) => row.likes,
      sortable: true,
      maxWidth: "30px",
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
            style={{ width: "100%" }}
          />
        </div>
      ),
      selector: (row) => row.user.name,
      sortable: true,
    },
    {
      name: <div className={styles.sortContainer}>Rol</div>,
      selector: (row) => row.user.role,
      sortable: true,
      wrap: true,
    },
    {
      name: <div className={styles.sortContainer}>Post</div>,
      selector: (row) => row.post.title,
      sortable: true,
      wrap: true,
    },
    {
      name: <div className={styles.sortContainer}>Dueño del Post</div>,
      selector: (row) => row.post.name,
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

  const title = useMemo(() => {
    return <h2 className={styles.tableHeader}>Comentarios</h2>;
  }, []);

  return (
    <>
      <TableDatas
        title={title}
        data={data}
        isLoading={isLoading}
        columns={columns}
        defaultSortField={2}
      />
    </>
  );
}
