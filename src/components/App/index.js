import { ThemeProvider } from 'styled-components';

import { Route, BrowserRouter, Switch } from 'react-router-dom';
import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';
import * as S from './styles';
import Home from '../../pages/Home';
import Routes from '../../Routes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <S.Container>
          <Switch>
            <Route path="/" exact component={Home} />
            <Routes />
          </Switch>
        </S.Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
