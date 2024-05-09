import clienteAxios from '../../../../config/axios'
import { AppDispatch, RootState } from '../../store'
import { setMovies, startLoadingMovies } from './movieSlice'

export const getMovies = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { listFilter, page } = getState().movies
    dispatch(startLoadingMovies())
    const lista = await clienteAxios(`/movie/${listFilter}`, {
      params: { page }
    })
    dispatch(setMovies(lista.data))
  }
}
