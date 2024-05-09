import { Button, CardMedia } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { Movie } from '../../types'

type MovieCardProps = {
  movie: Movie
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate()
  const goToDetails = () => {
    navigate(`/movie/${movie.id}`)
  }
  return (
    <Button onClick={goToDetails}>
      <Card
        sx={{
          width: 250,
          height: 400,
          cursor: 'pointer'
        }}>
        <CardMedia
          sx={{ height: 300, width: '100%' }}
          image={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          title={movie.title}
        />
        <CardContent
          sx={{
            height: 60,
            borderTop: '1px solid #eee',
            overflowY: 'auto',
            padding: 1
          }}>
          <Typography color='text.primary' sx={{ marginBottom: 0.2 }}>
            {movie.title}
          </Typography>

          <Typography
            variant='body2'
            fontSize={12}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical'
            }}
            color='text.secondary'>
            {movie.overview}
          </Typography>
        </CardContent>
      </Card>
    </Button>
  )
}

export default MovieCard
