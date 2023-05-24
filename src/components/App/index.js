import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from '../../context/AuthContext';
import RoutesPublics from '../../Routes/RoutesPublics';

import * as S from './styles';
import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';

import Home from '../../pages/Home';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <AuthProvider>
          <S.Container>
            <Switch>
              <Route path="/" exact component={Home} />
              <RoutesPublics />
            </Switch>
          </S.Container>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
