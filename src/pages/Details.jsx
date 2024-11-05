import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import https from '../axios';

const Details = () => {
  const { playlistId } = useParams();
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const token = localStorage.getItem('spotify_token');
        const response = await https.get(`/v1/playlists/${playlistId}/tracks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTracks(response.data.items);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    fetchTracks();
  }, [playlistId]);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Playlist Tracks</h2>

      <div className="space-y-4">
        {tracks.map((trackItem, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4"
          >
            <img
              src={trackItem.track.album.images[0]?.url}
              alt={trackItem.track.name}
              className="w-16 h-16 rounded-md"
            />
            <div>
              <p className="text-lg font-semibold">{trackItem.track.name}</p>
              <p className="text-sm text-gray-400">{trackItem.track.artists.map(artist => artist.name).join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
