import { Route } from 'react-router-dom';

import NewList from './pages/NewList';
import List from './pages/List';
import Logo from './components/Logo';

export default function Routes() {
  return (
    <>
      <Logo />
      <Route path="/new" component={NewList} />
      <Route path="/list" component={List} />
    </>
  );
}
