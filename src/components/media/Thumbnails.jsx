import { embeddedURLThumbnail } from "../../utils/embedVideo";

import styles from "./Thumbnails.module.scss";

export function Thumbnails({ id, video, handleThumbnailClick, index, grid }) {
  return (
    <div
      id={id}
      key={index}
      className={`${styles.thumbnail} ${
        grid === "true" ? styles.miniatureGrid : ""
      }`}
      //key={index}
      onClick={() => handleThumbnailClick(video)}
    >
      <div>
        <img
          width="560"
          height="315"
          src={embeddedURLThumbnail(video.url)}
          alt="YouTube video thumbnail"
        />
      </div>
      <h3 className={styles.miniatureTitle}>{video.title}</h3>
    </div>
  );
}
