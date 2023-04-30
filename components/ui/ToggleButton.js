import styles from "./ToggleButton.module.css";

function ToggleButton({ mode, title, onClick }) {
  return (
    <div
      className={`${styles.toggle} ${
        mode === title.toLowerCase() ? styles.active : ""
      }`}
      onClick={onClick}
    >
      {title}
    </div>
  );
}

export default ToggleButton;
