import MovieList from '../components/MovieList'
import { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios'
import { Movie } from '../../types/index'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select
} from '@mui/material'

const LIST_OPTIONS = [
  { label: 'Now Playing', value: 'now_playing' },
  { label: 'Popular', value: 'popular' },
  { label: 'Upcoming', value: 'upcoming' }
]

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedOption, setSelectedOption] = useState('popular')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(500)

  const getMovies = async () => {
    const lista = await clienteAxios(`/movie/${selectedOption}`, {
      params: { page }
    })
    setMovies(lista.data.results)
    setTotalPages(lista.data?.total_pages > 500 ? 500 : lista.data.total_pages)
  }

  const handleSelectedOption = (value: string) => {
    setPage(1)
    setSelectedOption(value)
  }

  const handlePageChanged = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }

  useEffect(() => {
    getMovies()
  }, [selectedOption, page])

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
            value={selectedOption}
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
