import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import Logo from '../../components/Logo';

import Home from '../../pages/Home';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import Profile from '../../pages/Profile';
import NewList from '../../pages/NewList';
import MyLists from '../../pages/MyLists';
import List from '../../pages/List';
import Compare from '../../pages/CompareLists';
import Settings from '../../pages/Settings';
import UserData from '../../pages/UserData';

export default function RoutesPublics() {
  const authContext = useContext(AuthContext);
  const { login } = authContext || {};

  return (
    <>
      <Logo />
      <Routes>
        <Route path="/" element={<Home />} />
        {login ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/newlist" element={<NewList />} />
            <Route path="/mylists" element={<MyLists />} />
            <Route path="/list/:id" element={<List />} />
            <Route path="/compare/:id1/:id2" element={<Compare />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/user-data" element={<UserData />} />
          </>
        ) : (
          <>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
      </Routes>
    </>
  );
}
