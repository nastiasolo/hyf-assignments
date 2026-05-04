import { createContext, useState } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [planetsWishlist, setPlanetsWishlist] = useState([]);

  const addPlanetToWishlist = (planet) => {
    setPlanetsWishlist([...planetsWishlist, planet]);
  };

  const removePlanetFromWishlist = (name) => {
    setPlanetsWishlist(planetsWishlist.filter((p) => p.name !== name));
  };

  const isPlanetInWishlist = (name) => {
    return planetsWishlist.some((p) => p.name === name);
  };

  const togglePlanetSelection = (planet) => {
    isPlanetInWishlist(planet.name)
      ? removePlanetFromWishlist(planet.name)
      : addPlanetToWishlist(planet);
  };

  const wishlistCount = planetsWishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        planetsWishlist,
        addPlanetToWishlist,
        removePlanetFromWishlist,
        isPlanetInWishlist,
        togglePlanetSelection,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
