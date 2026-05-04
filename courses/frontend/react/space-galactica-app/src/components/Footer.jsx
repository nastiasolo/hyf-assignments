import { useLocation } from "react-router-dom";
import styles from "./Footer.module.css";
import { SocialMediaItem } from "./SocialMediaItem";
import { Link } from "react-router-dom";
import { navbarItems } from "../../data/navigation";
import { socialMedia } from "../../data/socialmedia";

export const Footer = () => {
  const { pathname } = useLocation();

  return (
    <footer className={pathname !== "/" ? styles.footer : styles.hidden}>
      <div className={styles.footerDescription}>
        <h3>Galactica</h3>
        <p>
          Explore the universe and beyond. Your journey to the stars starts
          here.
        </p>
        <p>&copy; 2024 Galactica. All rights reserved.</p>
      </div>
      <div className={styles.pages}>
        <h3>Pages</h3>
        <ul className={styles.footerList}>
          {navbarItems.map((item) => (
            <li key={item.id}>
              <Link to={item.link}>
                <b>{item.id}</b> {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Docs for the Link: https://reactrouter.com/api/components/Link#link. */}

      <div className={styles.footerLinks}>
        <h3>Follow us</h3>
        <ul className={styles.footerList}>
          {socialMedia.map((social) => (
            <SocialMediaItem
              key={social.title}
              title={social.title}
              url={social.url}
              icon={social.icon}
            />
          ))}
        </ul>
      </div>
    </footer>
  );
};
