import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import https from '../axios';

const Details = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      const token = localStorage.getItem('spotify_token');
      try {
        const response = await https.get(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlaylist(response.data);
      } catch (error) {
        console.error('Error fetching playlist details:', error);
      }
    };

    fetchPlaylistDetails();
  }, [id]);

  if (!playlist) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="bg-[#121212] min-h-screen text-white p-6">
  <div className="flex p-2 bg-gradient-to-b from-yellow-400 via-yellow-300 ">
  <img src={playlist.images[0]?.url} alt={playlist.name} className="w-72 h-72 object-cover rounded-md mr-3 mt-14" />
  <div>
    <h1 className="text-6xl font-serif mt-24">{playlist.name}</h1>
    <p className="text-lg mb-4">{playlist.description || 'No description available'}</p>
  </div>
</div>

      <h3 className="text-xl font-bold mb-2">Tracks</h3>
      <ul>
        {playlist.tracks.items.map((track, index) => (
          <li key={index} className="flex items-center justify-between  rounded-lg p-2 mb-2">
            <div className='flex gap-1'>
  <img src={playlist.images[0]?.url} alt={playlist.name} className="w-12 h-12 object-cover rounded-md mb-4" />
            <span>{track.track.name}</span>
            </div>
            <span>{track.track.artists.map(artist => artist.name).join(', ')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Details;
