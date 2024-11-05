import React, { useEffect, useState } from 'react';
import https from '../axios';

const Home = () => {
  const [playlists, setPlaylists] = useState({
   goodAfter:[],
    topMixes: [],
    madeForYou: [],
    recentlyPlayed: [],
    jumpBackIn: [],
    uniquelyYours: [],
  });

  useEffect(() => {
    const fetchPlaylists = async () => {
      const token = localStorage.getItem('spotify_token');
      try {
        const [goodAfterResponse, topMixesResponse, madeForYouResponse, recentlyPlayedResponse, jumpBackInResponse, uniquelyYoursResponse] = await Promise.all([
          https.get('https://api.spotify.com/v1/browse/featured-playlists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
          https.get('https://api.spotify.com/v1/browse/categories/toplists/playlists', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          https.get('https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFHOzuVTgTizF/playlists', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          https.get('https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          https.get('https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          https.get('https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        setPlaylists({
          goodAfter: goodAfterResponse.data.playlists.items.slice(0, 6),
          topMixes: topMixesResponse.data.playlists.items.slice(0, 4),
          madeForYou: madeForYouResponse.data.playlists.items.slice(0, 4),
          recentlyPlayed: recentlyPlayedResponse.data.playlists.items.slice(0, 4),
          jumpBackIn: jumpBackInResponse.data.playlists.items.slice(0, 4),
          uniquelyYours: uniquelyYoursResponse.data.playlists.items.slice(0, 4),
        });
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  const renderPlaylistCard = (playlist, index) => (
    <div
      key={index}
      className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition duration-300 flex flex-col justify-between"
    >
      <img
        src={playlist.images[0]?.url}
        alt={playlist.name}
        className="w-full h-40 rounded-md mb-2 object-cover"
      />
      <div className="flex flex-col mt-2">
        <span className="text-lg font-bold">{playlist.name}</span>
        <span className="text-sm text-gray-400">Artist names here...</span>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Good afternoon</h2>
      <div >
        {playlists.goodAfter.map(renderPlaylistCard)}
      </div>
      <h3 className="text-xl font-bold mb-4">Your Top Mixes</h3>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {playlists.topMixes.map(renderPlaylistCard)}
      </div>

      <h3 className="text-xl font-bold mb-4">Made For You</h3>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {playlists.madeForYou.map(renderPlaylistCard)}
      </div>

      <h3 className="text-xl font-bold mb-4">Recently Played</h3>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {playlists.recentlyPlayed.map(renderPlaylistCard)}
      </div>

      <h3 className="text-xl font-bold mb-4">Jump Back In</h3>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {playlists.jumpBackIn.map(renderPlaylistCard)}
      </div>

      <h3 className="text-xl font-bold mb-4">Uniquely Yours</h3>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {playlists.uniquelyYours.map(renderPlaylistCard)}
      </div>
    </div>
  );
};

export default Home;
