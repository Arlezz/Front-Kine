import styles from "./SearchResult.module.scss";

export function SearchResult({
  result,
  showModalResults,
  handleShowModalResults,
}) {
  const toSection = (sectionId) => {
    if (showModalResults) {
      scrollToSection(sectionId);
      handleShowModalResults();
    } else {
      scrollToSection(sectionId);
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.result}>
      <span onClick={() => toSection(result._id)}>{result.title}</span>
    </div>
  );
}
