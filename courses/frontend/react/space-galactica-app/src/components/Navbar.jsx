import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { Planet } from "../icons/Planet";
import { Badge } from "./Badge";
import styles from "./Navbar.module.css";
import { navbarItems } from "../../data/navigation";
import { NavItem } from "./NavItem";
import { WishlistContext } from "../context/WishlistContext";

export const Navbar = () => {
  const currentPath = useLocation().pathname;
  const { wishlistCount } = useContext(WishlistContext);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.navbarLogo}>
        <a href="/">
          <img src="/shared/logo.svg" alt="" /> GALACTICA
        </a>
      </div>
      <div className={styles.decorativeLine} />
      <nav className={styles.navbar}>
        <div className={styles.navbarBG} />
        <ul className={styles.navbarList}>
          {navbarItems.map((item) => (
            <NavItem
              key={item.id}
              id={item.id}
              title={item.title}
              link={item.link}
              isActive={item.link === currentPath}
            />
          ))}
          <li className={styles.wishlistBadge} aria-label="Wishlist">
            <Badge count={wishlistCount}>
              <Planet color="white" />
            </Badge>
          </li>
        </ul>
        {/* 🧑🏽‍🚀 Task - Week 4 - part 3 */}
        {/* Take the count of the planets wishlist from the context and display it in the Badge. */}
      </nav>
    </header>
  );
};
