import React, {Suspense} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

const HomePage = React.lazy(() => import('./views/HomePage'));
const MeetingSummariser = React.lazy(() => import('./views/MeetingSummariser'));
const TextSummariser = React.lazy(() => import('./views/TextSummariser'));
const SpeechToText = React.lazy(() => import('./views/SpeechToText'));

const App = () => {

  return (
    <BrowserRouter>
    <Suspense fallback={()=>{}}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/MeetingSummariser" component={MeetingSummariser} />
          <Route exact path="/TextSummariser" component={TextSummariser} />
          <Route exact path="/SpeechToText" component={SpeechToText} />
          {/* <Route component={Page404} />                          */}
          <Redirect to="/" />
        </Switch>
        </Suspense>
    </BrowserRouter >
  );
};

export default App;