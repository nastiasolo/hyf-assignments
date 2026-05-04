import styles from "./NasaCollaborationPage.module.css";

export const RoverPhoto = ({ src, date, roverName }) => {
  return (
    <div>
      <p>Date: {date}</p>
      <p>{roverName}</p>
      <img className={styles.nasaPicOfTheDayImg} src={src} alt={roverName} />
    </div>
  );
};
