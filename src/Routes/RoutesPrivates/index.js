import { Route, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import NewList from '../../pages/NewList';
import List from '../../pages/List';
import MyLists from '../../pages/MyLists';
import Profile from '../../pages/Profile';

import { AuthContext } from '../../context/AuthContext';

export default function RoutesPrivates() {
  const { login } = useContext(AuthContext);
  const history = useHistory();

  if (login) {
    return (
      <>
        <Route path="/profile" component={Profile} />
        <Route path="/new" component={NewList} />
        <Route path="/list/:id" component={List} />
        <Route path="/mylists" component={MyLists} />
      </>
    );
  }
  return history.push('/signin');
}
