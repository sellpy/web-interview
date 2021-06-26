import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const mainWrapperStyle = { display: 'flex', flexDirection: 'column' }
const centerContentWrapper = { display: 'flex', justifyContent: 'center' }
const contentWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '80rem',
  flexGrow: 1,
  marginTop: '1rem',
}

const MainAppBar = () => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        Things to do
      </Typography>
    </Toolbar>
  </AppBar>
)

export const MainWrapper = ({ children }) => (
  <div style={mainWrapperStyle}>
    <MainAppBar />
    <div style={centerContentWrapper}>
      <div style={contentWrapperStyle}>{children}</div>
    </div>
  </div>
)
