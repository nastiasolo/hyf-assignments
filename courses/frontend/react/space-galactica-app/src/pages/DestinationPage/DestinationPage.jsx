import { useContext } from "react";
import styles from "./DestinationPage.module.css";
import { PlanetsWishlistItem } from "./PlanetsWishlistItem";
import { PlanetCard } from "./PlanetCard";
import { planetsList } from "../../../data/planets";
import { AddWishlistItem } from "./AddWishlistItem";
import { WishlistContext } from "../../context/WishlistContext";

export const Destinations = () => {
  const {
    planetsWishlist,
    addPlanetToWishlist,
    removePlanetFromWishlist,
    isPlanetInWishlist,
    wishlistCount,
  } = useContext(WishlistContext);

  const togglePlanetSelection = (planet) => {
    isPlanetInWishlist(planet.name)
      ? removePlanetFromWishlist(planet.name)
      : addPlanetToWishlist(planet);
  };

  return (
    <div className="fullBGpicture">
      <main className="mainContent">
        <h1>Travel destinations</h1>
        <section className="card">
          <h2>Wishlist</h2>
          {wishlistCount > 0 ? (
            <p>You have {wishlistCount} planets in your wishlist</p>
          ) : (
            <p>No planets in your wishlist :(</p>
          )}
          <AddWishlistItem
            onAddWishlistItem={addPlanetToWishlist}
            nextId={wishlistCount + 1}
          />
          <h3>Your current wishlist</h3>
          <div className={styles.wishlistList}>
            {planetsWishlist.map((planet) => (
              <PlanetsWishlistItem
                key={planet.id}
                {...planet}
                onRemove={() => removePlanetFromWishlist(planet.name)}
              />
            ))}
          </div>
        </section>
        <section className="card">
          <h2>Possible destinations</h2>
          {planetsList.map((planet) => (
            <PlanetCard
              key={planet.id}
              {...planet}
              isSelected={isPlanetInWishlist(planet.name)}
              togglePlanetSelection={() => togglePlanetSelection(planet)}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Destinations;
