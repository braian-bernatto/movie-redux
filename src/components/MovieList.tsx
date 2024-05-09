import MovieCard from './MovieCard'
import { Movie } from '../../types/index'

type MovieListProps = {
  movies: Movie[]
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
        paddingBottom: 20
      }}>
      {movies?.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieList
