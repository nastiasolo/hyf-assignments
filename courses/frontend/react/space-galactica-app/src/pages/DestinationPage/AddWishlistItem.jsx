import { useState } from "react";
import styles from "./DestinationPage.module.css";

export const AddWishlistItem = ({ onAddWishlistItem, nextId }) => {
  const [thumbnail, setThumbnail] = useState("/destination/image-europa.png");
  const [name, setName] = useState("");

  const onAddItemPressed = () => {
    const trimmedName = name.trim();

    if (trimmedName === "") return;

    onAddWishlistItem({
      id: nextId,
      name: trimmedName,
      thumbnail: thumbnail,
      description: "A mysterious custom destination.",
      isSelected: true,
    });

    setName("");
    setThumbnail("/destination/image-europa.png");
  };

  return (
    <div className={styles.addWishlistItem}>
      <p>Add custom planet to wishlist</p>
      <label htmlFor="customWishlist">Wishlist item name</label>
      <input
        id="customWishlist"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="customWishlistThumbnail">Wishlist item thumbnail</label>
      <select
        id="customWishlistThumbnail"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
      >
        <option value="/destination/image-europa.png">EUROPA</option>
        <option value="/destination/image-mars.png">MARS</option>
        <option value="/destination/image-moon.png">MOON</option>
        <option value="/destination/image-titan.png">TITAN</option>
      </select>
      <button onClick={onAddItemPressed}>ADD CUSTOM</button>
    </div>
  );
};
