import { Route } from 'react-router-dom';

import NewList from './pages/NewList';
import List from './pages/List';
import Logo from './components/Logo';
import MyLists from './pages/MyLists';

export default function Routes() {
  return (
    <>
      <Logo />
      <Route path="/new" component={NewList} />
      <Route path="/list/:id" component={List} />
      <Route path="/mylists" component={MyLists} />
    </>
  );
}
