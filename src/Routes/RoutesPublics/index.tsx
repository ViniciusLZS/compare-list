import { useContext } from 'react';
import { Route } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import Logo from '../../components/Logo';

import SignIn from '../../pages/SignIn';
import signUp from '../../pages/SignUp';
import Profile from '../../pages/Profile';
import NewList from '../../pages/NewList';
import MyLists from '../../pages/MyLists';
import List from '../../pages/List';
import Compare from '../../pages/CompareLists';

export default function RoutesPublics() {
  const authContext = useContext(AuthContext);
  const { login } = authContext || {};
  return (
    <>
      <Logo />
      {!login
      && (
      <>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={signUp} />
      </>
      )}

      {login && (
        <>
          <Route path="/profile" component={Profile} />
          <Route path="/newlist" component={NewList} />
          <Route path="/mylists" component={MyLists} />
          <Route path="/list/:id" component={List} />
          <Route path="/compare/:id1/:id2" component={Compare} />
        </>
      )}
    </>
  );
}
