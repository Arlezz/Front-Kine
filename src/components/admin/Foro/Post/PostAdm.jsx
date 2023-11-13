import { useEffect, useState, useMemo } from "react";

import styles from "./PostAdm.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { confirm } from "react-bootstrap-confirmation";
import GeneralService from "../../../../services/General.service";
import { TableDatas } from "../../../TableDatas";
import AuthService from "../../../../services/Auth.service";

export function PostAdm({ updatePost, onUpdatePost }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState("");
  const [dataSaver, setDataSaver] = useState([]);
  const [dueño, setDueño] = useState("");

  useEffect(() => {
    GeneralService.getAllPosts()
      .then((res) => {
        console.log("Los posts ", res.posts);
        setDataSaver(res.posts);
        setData(res.posts);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [updatePost]);

  const deletePost = (tutorialId) => {
    const user = AuthService.getCurrentUser();
    GeneralService.delPost(tutorialId, user.email)
      .then((res) => {
        console.log(res);
        onUpdatePost();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AlertButton = async (row) => {
    const result = await confirm("Está seguro de eliminar el Post?", {
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
    setPost(e.target.value);
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
          Título
          <input
            type="text"
            placeholder="Buscar"
            className={styles.inputSort}
            value={post}
            onChange={(e) => onChange(e)}
            style={{ width: "100%", marginTop: ".5rem" }}
          />
        </div>
      ),
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: <div className={styles.sortContainer}>Publicado</div>,
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: <div className={styles.sortContainer}>Contenido</div>,
      selector: (row) => row.content,
      sortable: true,
      wrap: true,
    },
    {
      name: <div className={styles.sortContainer}>Likes</div>,
      selector: (row) => row.likes,
      sortable: true,
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
            style={{ width: "100%", marginTop: ".5rem" }}
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
    return <h2 className={styles.tableHeader}>Publicaciones</h2>;
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
