import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Movie } from '../../../../types'

export interface MoviesPayload {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface MovieState {
  page: number
  totalPages: number
  listFilter: string
  searchParam: string
  isLoading: boolean
  movies: Movie[]
}

const initialState: MovieState = {
  page: 1,
  totalPages: 500,
  listFilter: 'popular',
  searchParam: '',
  isLoading: false,
  movies: []
}

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    startLoadingMovies: state => {
      state.isLoading = true
    },
    setMovies: (state, action: PayloadAction<MoviesPayload>) => {
      state.isLoading = false
      state.totalPages =
        action.payload.total_pages > 500 ? 500 : action.payload.total_pages
      state.movies = action.payload.results
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setListFilter: (state, action: PayloadAction<string>) => {
      state.listFilter = action.payload
    },
    setSearchParam: (state, action: PayloadAction<string>) => {
      state.searchParam = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  startLoadingMovies,
  setMovies,
  setPage,
  setListFilter,
  setSearchParam
} = movieSlice.actions
