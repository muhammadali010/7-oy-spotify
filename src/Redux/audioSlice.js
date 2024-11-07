import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  audio: null,
  isPlaying: false,
  selectedTrack: null,
  playlist: null,
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
    togglePlayPause: (state) => {
        if (state.audio) {
          state.isPlaying = !state.isPlaying;
          state.isPlaying ? state.audio.play() : state.audio.pause();
        }
      },
      
  },
});

export const { setAudio, setPlaying, setSelectedTrack, setPlaylist, togglePlayPause } = audioSlice.actions;
export default audioSlice.reducer;
