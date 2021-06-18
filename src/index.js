import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
      type: 'dark',
      primary: {
          main: '#0070f3',
          // contrastText: '#fff'
      },
      background: {
          // default: '#070c23',
          default: '#040303',
          paper: '#10194b',
          
      },
  },
  typography: {
      fontFamily: 'Lexend Deca, Single Day, cursive'
  },
})

// Lexend Deca, 

ReactDOM.render( 
  <ThemeProvider theme={theme} >
    <CssBaseline />
    <App />
  </ThemeProvider>
,document.getElementById('root') );

