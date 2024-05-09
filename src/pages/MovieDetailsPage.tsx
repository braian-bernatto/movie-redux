import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography
} from '@mui/material'
import { format } from 'date-fns'
import { FormatQuote, Star } from '@mui/icons-material'
import { MovieDetail } from '../../types/index'

const MovieDetailsPage = () => {
  const { movieId } = useParams()
  const [movie, setMovie] = useState<MovieDetail | undefined>()

  const getMovieDetails = async () => {
    const lista = await clienteAxios(`/movie/${movieId}`)
    setMovie(lista.data)
  }

  const getDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    return hours && remainingMinutes
      ? `${hours > 0.9 ? hours + 'h ' : ''}${
          remainingMinutes > 0.9 ? remainingMinutes + 'm' : ''
        }`
      : '-'
  }

  useEffect(() => {
    getMovieDetails()
  }, [])

  return (
    movie && (
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Box sx={{ marginBottom: 0.5 }}>
          <Typography sx={{ fontSize: { xs: 20, sm: 30 } }} component='h1'>
            {movie.title}
          </Typography>
          {movie.title !== movie.original_title && (
            <Typography>{movie.original_title}</Typography>
          )}
        </Box>
        {/* Backdrop image */}
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.backdrop_path}`}
            alt={movie.title}
            style={{
              height: 200,
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'top'
            }}
          />
        )}

        {/* main content */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 5,
            width: '100%',
            alignItems: 'start'
          }}>
          {/* Poster */}
          <Box
            sx={{
              width: 350,
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              gap: 1,
              alignItems: 'center',
              position: 'relative',
              top: movie.backdrop_path && -50,
              left: 10
            }}>
            <Card
              sx={{
                width: '100%',
                height: 500,
                cursor: 'pointer',
                border: '2px solid #fff'
              }}>
              <CardMedia
                sx={{ height: '100%', width: '100%' }}
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                title={movie.title}
              />
              <CardContent sx={{ position: 'absolute', top: 440 }}>
                <Chip
                  color='secondary'
                  icon={<Star />}
                  sx={{ fontSize: 19, fontWeight: 'bold' }}
                  label={movie.vote_average.toFixed(1)}
                />
              </CardContent>
            </Card>

            {/* Genres */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                position: 'relative',
                justifyContent: 'center'
              }}>
              {movie.genres.map(genre => (
                <Chip
                  key={`genre-${genre.id}`}
                  color='primary'
                  label={genre.name}
                />
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              maxWidth: 300
            }}>
            <Typography>Status: {movie.status}</Typography>
            <Typography>
              Release: {format(movie.release_date, 'dd MMMM yyyy')}
            </Typography>
            <Typography>Duration: {getDuration(movie.runtime)}</Typography>
            <Typography>Country: {movie.origin_country.join(', ')}</Typography>
            <Typography>
              Language:{' '}
              {movie.spoken_languages.map(lang => lang.english_name).join(', ')}
            </Typography>
          </Box>

          {/* Overview */}
          <Box
            sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, maxWidth: 400 }}>
            {movie.tagline && (
              <Typography>
                <FormatQuote
                  sx={{
                    transform: 'rotate(180deg)'
                  }}
                />
                {movie.tagline}
                <FormatQuote />
              </Typography>
            )}
            <Typography>{movie.overview}</Typography>
          </Box>
        </Box>
      </Box>
    )
  )
}

export default MovieDetailsPage
