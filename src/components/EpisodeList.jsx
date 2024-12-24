// src/components/EpisodeList.jsx
import React, { useEffect, useState } from "react";

const EpisodeList = () => {
  const [episodes, setEpisodes] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      setStatus("loading");
      try {
        const response = await fetch("https://rickandmortyapi.com/api/episode");
        const data = await response.json();
        setEpisodes(data.results);
        setStatus("succeeded");
      } catch (err) {
        setError(err.message);
        setStatus("failed");
      }
    };

    fetchEpisodes();
  }, []);

  if (status === "loading") return <div>Loading episodes...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="episode-list">
      {episodes.map((episode) => (
        <div key={episode.id} className="episode-card">
          <h3>{episode.name}</h3>
          <p>{episode.air_date}</p>
          <p>{episode.episode}</p>
          <p>
            {episode.characters.length} characters appeared in this episode.
          </p>
        </div>
      ))}
    </div>
  );
};

export default EpisodeList;
