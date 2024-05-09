import { Routes, Route } from 'react-router-dom'
import NotFound from '../components/NotFound'
import MoviesPage from '../pages/MoviesPage'
import MovieDetailsPage from '../pages/MovieDetailsPage'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<MoviesPage />} />
      <Route path='/movie/:movieId' element={<MovieDetailsPage />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter
