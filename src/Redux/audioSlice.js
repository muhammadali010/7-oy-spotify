import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  audio: null,
  isPlaying: false,
  selectedTrack: null,
  playlist: null,
  currentTime: 0,
  duration: 0, 
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setAudio: (state, action) => {
      state.audio = action.payload;
    },
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setSelectedTrack: (state, action) => {
      state.selectedTrack = action.payload;
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => { 
      state.duration = action.payload;
    },
    togglePlayPause: (state) => {
      if (state.audio) {
        state.isPlaying = !state.isPlaying;
        state.isPlaying ? state.audio.play() : state.audio.pause();
      }
    },
    nextTrack: (state) => {
      if (state.playlist && state.selectedTrack) {
        const currentIndex = state.playlist.findIndex(track => track.id === state.selectedTrack.id);
        const nextIndex = (currentIndex + 1) % state.playlist.length;
        state.selectedTrack = state.playlist[nextIndex];
        
        if (state.audio) {
          state.audio.src = state.selectedTrack.url;
          if (state.isPlaying) {
            state.audio.play();
          }
        }
      }
    },
    previousTrack: (state) => {
      if (state.playlist && state.selectedTrack) {
        const currentIndex = state.playlist.findIndex(track => track.id === state.selectedTrack.id);
        const prevIndex = (currentIndex - 1 + state.playlist.length) % state.playlist.length;
        state.selectedTrack = state.playlist[prevIndex];
        
        if (state.audio) {
          state.audio.src = state.selectedTrack.url; 
          if (state.isPlaying) {
            state.audio.play();
          }
        }
      }
    },
  },
});

export const { setAudio, setPlaying, setSelectedTrack, setPlaylist, setCurrentTime, setDuration, togglePlayPause, nextTrack, previousTrack } = audioSlice.actions;
export default audioSlice.reducer;
