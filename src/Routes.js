import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
// import Header from './components/Header';
import NewList from './pages/NewList';
import List from './pages/List';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      {/* <Route component={Header} /> */}
      <Route path="/new" component={NewList} />
      <Route path="/list" component={List} />
    </Switch>
  );
}
