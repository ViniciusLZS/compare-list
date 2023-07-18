import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from '../../context/AuthContext';
import RoutesPublics from '../../Routes/RoutesPublics';

import * as S from './styles';
import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';

import ToastContainer from '../Toast/ToastContainer';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ToastContainer />
        <AuthProvider>
          <S.Container>
            <RoutesPublics />
          </S.Container>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
