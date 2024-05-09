import MovieList from '../components/MovieList'
import { useEffect } from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select
} from '@mui/material'
import { RootState } from '../store'
import {
  getMovies,
  getMoviesByName,
  setListFilter,
  setPage,
  setSearchParam
} from '../store/slices/movies'
import { useAppDispatch, useAppSelector } from '../hooks'

const LIST_OPTIONS = [
  { label: 'Now Playing', value: 'now_playing' },
  { label: 'Popular', value: 'popular' },
  { label: 'Upcoming', value: 'upcoming' }
]

const MoviesPage = () => {
  const { movies, page, totalPages, listFilter, searchParam } = useAppSelector(
    (state: RootState) => state.movies
  )
  const dispatch = useAppDispatch()

  const handleSelectedOption = (value: string) => {
    dispatch(setPage(1))
    dispatch(setSearchParam(''))
    dispatch(setListFilter(value))
  }

  const handlePageChanged = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPage(value))
  }

  useEffect(() => {
    if (searchParam) {
      dispatch(getMoviesByName())
    } else {
      dispatch(getMovies())
    }
  }, [listFilter, page, searchParam])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [page])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: 2,
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center'
        }}>
        <FormControl>
          <InputLabel id='movie-list-select'>Lists</InputLabel>

          <Select
            labelId='movie-list-select'
            id='movie-list-select'
            value={listFilter}
            label='Lists'
            onChange={e => handleSelectedOption(e.target.value)}>
            {LIST_OPTIONS.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <MovieList movies={movies} />
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: 2,
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center'
        }}>
        <Pagination
          page={page}
          onChange={handlePageChanged}
          count={totalPages}
          variant='outlined'
          shape='rounded'
        />
      </Box>
    </Box>
  )
}

export default MoviesPage
