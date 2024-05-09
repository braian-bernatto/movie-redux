import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>👾 404</h2>
      <Typography>La página que buscas no existe!</Typography>
      <Link to='/'>
        <Button sx={{ mt: 4 }} variant='contained'>
          Volver a Inicio
        </Button>
      </Link>
    </Box>
  )
}

export default NotFound
