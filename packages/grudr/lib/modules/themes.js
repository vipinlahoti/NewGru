import { registerTheme } from './themeSetup';
import deepPurple from 'material-ui/colors/deepPurple';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';

/** @ignore */

/**
 * 
 * Sample theme to get you out of the gate quickly
 * 
 * For a complete list of configuration variables see:
 * https://material-ui-next.com/customization/themes/
 * 
 */

const serif = (fontFamily) => {
  return `${fontFamily}, Times, serif`;
};

const sansSerif = (fontFamily) => {
  return `${fontFamily}, Helvetica, Arial, sans-serif`;
};

const palettes = {
  primary: deepPurple,
  secondary: pink,
  error: red,
  background: grey,
};

const display = {
  fontFamily: 'Roboto',
  fontWeight: 300,
  letterSpacing: '.035em',
  lineHeight: 1.1,
  color: '#FFFFFF',
};

const title = {
  fontFamily: 'Roboto Condensed',
  fontSize: 18,
  letterSpacing: '-.008em',
  lineHeight: 1.2,
  fontWeight: 400,
};

const body = {
  fontFamily: 'Roboto',
  fontSize: 15,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontColorRegular: 'rgba(0, 0, 0, 0.92)',
  fontColorLight: 'rgba(0, 0, 0, 0.54)',
};

const logo = {
  fontFamily: 'Poppins'
};

const theme = {
  
  palette: {
    primary: {
      light: palettes.primary[200],
      main: palettes.primary[700],
      dark: palettes.primary[900],
      ...palettes.primary
    },
    secondary: {
      light: palettes.secondary[200],
      main: palettes.secondary[500],
      dark: palettes.secondary[800],
      ...palettes.secondary
    },
    error: {
      main: palettes.error[500],
      ...palettes.error
    },
    background: {
      default: palettes.background[200],
      ...palettes.background
    }
  },
  
  typography: {
    
    display4: {
      fontSize: 90,
      fontWeight: display.fontWeight,
      fontFamily: sansSerif(display.fontFamily),
      letterSpacing: display.letterSpacing,
      lineHeight: display.lineHeight,
      color: display.color,
    },
    
    display3: {
      fontSize: 54,
      fontWeight: display.fontWeight,
      fontFamily: sansSerif(display.fontFamily),
      letterSpacing: display.letterSpacing,
      lineHeight: display.lineHeight,
      color: body.fontColorRegular,
    },
    
    display2: {
      fontSize: 38,
      fontWeight: display.fontWeight,
      fontFamily: sansSerif(display.fontFamily),
      lineHeight: '48px',
      color: body.fontColorRegular,
    },
    
    display1: {
      fontSize: 30,
      fontWeight: display.fontWeight,
      fontFamily: sansSerif(display.fontFamily),
      letterSpacing: display.letterSpacing,
      lineHeight: display.lineHeight,
      color: body.fontColorRegular,
    },
    
    headline: {
      fontSize: title.fontSize + 8,
      fontWeight: title.fontWeight,
      fontFamily: sansSerif(title.fontFamily),
      letterSpacing: title.letterSpacing,
      lineHeight: title.lineHeight,
      color: body.fontColorRegular,
    },
    
    title: {
      fontSize: title.fontSize + 4,
      fontWeight: title.fontWeight,
      fontFamily: sansSerif(title.fontFamily),
      letterSpacing: title.letterSpacing,
      lineHeight: title.lineHeight,
      color: body.fontColorRegular,
    },
    
    subheading: {
      fontSize: title.fontSize - 2,
      fontWeight: title.fontWeight,
      fontFamily: sansSerif(title.fontFamily),
      letterSpacing: title.letterSpacing,
      lineHeight: title.lineHeight,
      color: body.fontColorRegular,
    },
    
    body2: {
      fontSize: body.fontSize,
      fontWeight: body.fontWeightMedium,
      fontFamily: sansSerif(body.fontFamily),
      lineHeight: '24px',
      color: body.fontColorRegular,
      marginBottom: '12px',
    },
    
    body1: {
      fontSize: body.fontSize,
      fontWeight: body.fontWeightRegular,
      fontFamily: sansSerif(body.fontFamily),
      lineHeight: '24px',
      color: body.fontColorRegular,
    },
    
    caption: {
      fontSize: 12,
      fontWeight: body.fontWeightMedium,
      fontFamily: sansSerif(body.fontFamily),
      lineHeight: 1,
      color: body.fontColorLight,
    },
    
    button: {
      fontSize: 14,
      textTransform: 'uppercase',
      fontWeight: body.fontWeightMedium,
      fontFamily: sansSerif(body.fontFamily),
    },

    brandLogo: {
      fontFamily: sansSerif(logo.fontFamily),
      // fontWeight: body.fontWeightMedium,
    }
    
  },
  
};

registerTheme('Sample', theme);
