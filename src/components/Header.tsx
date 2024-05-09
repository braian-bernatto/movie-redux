import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import { LocalMovies } from '@mui/icons-material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'
import { RootState } from '../store'
import { setPage, setSearchParam } from '../store/slices/movies'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))

export default function Header() {
  const { searchParam } = useAppSelector((state: RootState) => state.movies)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const handleSelectedOption = (value: string) => {
    if (location.pathname !== '/') {
      navigate(`/`)
    }
    dispatch(setPage(1))
    dispatch(setSearchParam(value))
  }

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
      <AppBar position='static'>
        <Toolbar>
          <Link
            to='/'
            style={{
              textDecoration: 'none',
              color: '#fff'
            }}>
            <LocalMovies fontSize='large' />
          </Link>
          <Box sx={{ flex: 1, display: { xs: 'none', sm: 'flex' } }}>
            <Link
              to='/'
              style={{
                textDecoration: 'none',
                color: '#fff'
              }}>
              <Typography variant='h6' noWrap component='div'>
                Movie Night
              </Typography>
            </Link>
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
              value={searchParam}
              onChange={e => handleSelectedOption(e.target.value)}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
