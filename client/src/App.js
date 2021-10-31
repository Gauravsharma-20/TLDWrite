import React, {Suspense} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

const HomePage = React.lazy(() => import('./views/HomePage'));
const FileUploader = React.lazy(() => import('./views/FileUploader'));

const App = () => {

  return (
    <BrowserRouter>
    <Suspense fallback={()=>{}}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/FileUploader" component={FileUploader} />
          {/* <Route component={Page404} />         will do 2morrow assignment krni hai crypto ki*/}                         
          <Redirect to="/" />
        </Switch>
        </Suspense>
    </BrowserRouter >
  );
};

export default App;