import React, {Suspense} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './views/HomePage';

import './App.css';

// const HomePage = React.lazy(() => import('./views/HomePage'));
// const Page404 = React.lazy(() => import('./common/Error/Page404'));

const App = () => {

  return (
    // <BrowserRouter>
    // <Suspense fallback={()=>{}}>
    //     <Switch>
    //       <Route exact path="/" component={HomePage} />
    //       {/* <Route component={Page404} /> */}
    //       <Redirect to="/" />
    //     </Switch>
    //     </Suspense>
    // </BrowserRouter >
    <HomePage/>
  );
};

export default App;