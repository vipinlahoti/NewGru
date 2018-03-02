import React from 'react';
import { addCallback } from 'meteor/vulcan:core';
import { MuiThemeProvider } from 'material-ui/styles';
import { getCurrentTheme } from '../modules/themeSetup';
import JssCleanup from '../components/base/theme/JssCleanup';

function wrapWithMuiTheme (app) {
  const theme = getCurrentTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <JssCleanup>
        {app}
      </JssCleanup>
    </MuiThemeProvider>
  );
}

addCallback('router.client.wrapper', wrapWithMuiTheme);
