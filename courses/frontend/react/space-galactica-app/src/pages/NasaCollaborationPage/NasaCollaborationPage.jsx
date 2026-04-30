import React, { useState, useEffect } from "react";
import styles from "./NasaCollaborationPage.module.css";
import { RoverPhoto } from "./RoverPhoto";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const NASA_URLs = {
  astronomyPicOfTheDay: `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
  marsRoverPhoto: `https://rovers.nebulum.one/api/v1/rovers/curiosity/photos?earth_date=2015-6-3`,
};

export const NasaCollaboration = () => {
  const [dailyImg, setDailyImg] = useState({});
  const [roverPhoto, setRoverPhoto] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoverPhotos = async () => {
      try {
        const response = await fetch(NASA_URLs.marsRoverPhoto);

        if (!response.ok) {
          throw new Error("Error fetching rover photos");
        }

        const roverPhotoResponse = await response.json();
        setRoverPhoto(roverPhotoResponse);
      } catch (err) {
        setError("Can not fetch. Try again later");
        console.error("Rover fetch error:", err);
      }
    };

    fetchRoverPhotos();
  }, []);

  useEffect(() => {
    const fetchDailyImg = async () => {
      const dailyImgResponse = await fetch(NASA_URLs.astronomyPicOfTheDay).then(
        (response) => response.json(),
      );
      setDailyImg(dailyImgResponse);
    };

    fetchDailyImg();
  }, []);

  return (
    <div className="fullBGpicture">
      <main className="mainContent">
        <h1>Collaboration with NASA</h1>
        <section className="card">
          <h2>Astronomy Picture of the day</h2>
          <h3>{dailyImg.title}</h3>
          <p>{dailyImg.explanation}</p>
          {dailyImg.media_type === "video" ? (
            <video
              controls
              autoPlay
              muted
              loop
              className={styles.nasaPicOfTheDayImg}
            >
              <source src={dailyImg.url} type="video/mp4" />
            </video>
          ) : (
            <img
              className={styles.nasaPicOfTheDayImg}
              src={dailyImg.url || dailyImg.hdurl}
              alt={dailyImg.title}
            />
          )}
        </section>
        <section className="card">
          <h2>Rover Photos</h2>
          <div className={styles.roverContainer}>
            {/* 🧑🏽‍🚀 Task - Week 3 */}
            {/* Iterate over the roverPhoto?.photos array and display all the pictures. */}
            {error ? (
              <p className={styles.errorText}>{error}</p>
            ) : roverPhoto?.photos?.length > 0 ? (
              roverPhoto.photos.map((photo) => (
                <RoverPhoto
                  key={photo.id}
                  src={photo.img_src}
                  date={photo.earth_date}
                  roverName={photo.rover.name}
                />
              ))
            ) : (
              <p>Loading rover photos...</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default NasaCollaboration;
