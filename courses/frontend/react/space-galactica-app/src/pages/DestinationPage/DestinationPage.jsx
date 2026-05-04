import { useState } from "react";
import styles from "./DestinationPage.module.css";
import { PlanetsWishlistItem } from "./PlanetsWishlistItem";
import { PlanetCard } from "./PlanetCard";
import { planetsList } from "../../../data/planets";
import { AddWishlistItem } from "./AddWishlistItem";

export const Destinations = () => {
  const [planetsWishlist, setPlanetsWishlist] = useState([]);

  const isPlanetInWishlist = (name) => {
    return planetsWishlist.some((p) => p.name === name);
  };

  const togglePlanetSelection = (planet) => {
    isPlanetInWishlist(planet.name)
      ? removePlanetFromWishlist(planet.name)
      : addPlanetToWishlist(planet);
  };

  const addPlanetToWishlist = (planet) => {
    setPlanetsWishlist([...planetsWishlist, planet]);
  };

  const removePlanetFromWishlist = (name) => {
    setPlanetsWishlist(planetsWishlist.filter((p) => p.name !== name));
  };

  return (
    <div className="fullBGpicture">
      <main className="mainContent">
        <h1>Travel destinations</h1>
        <section className="card">
          <h2>Wishlist</h2>
          {planetsWishlist.length > 0 ? (
            <p>You have {planetsWishlist.length} planets in your wishlist</p>
          ) : (
            <p>No planets in your wishlist :(</p>
          )}
          <AddWishlistItem
            onAddWishlistItem={addPlanetToWishlist}
            nextId={planetsWishlist.length + 1}
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

// 🧑🏽‍🚀 Task - Week 4 - part 2
// Hate to break it to you, but you will have to make some changes to the code you already wrote.
// Now that you have context, grab and use the context data in this.
// You will need to replace some of the variables and functions with the ones from the context.
