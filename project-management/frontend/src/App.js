import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={ProjectList} />
          <Route path="/projects/:id" component={ProjectDetail} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
