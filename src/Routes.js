import { Route } from 'react-router-dom';

import NewList from './pages/NewList';
import List from './pages/List';
import Logo from './components/Logo';
import MyLists from './pages/MyLists';
import SignIn from './pages/SignIn';
import SingUp from './pages/SignUp';

export default function Routes() {
  return (
    <>
      <Logo />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SingUp} />
      <Route path="/new" component={NewList} />
      <Route path="/list/:id" component={List} />
      <Route path="/mylists" component={MyLists} />
    </>
  );
}
