import React, {Suspense} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './styles/app.css';

const HomePage = React.lazy(() => import('./views/homePage'));
const MeetingSummariser = React.lazy(() => import('./views/MeetingSummariser'));
const TranscriptSummariser = React.lazy(() => import('./views/TranscriptSummariser'));
const SpeechToText = React.lazy(() => import('./views/SpeechToText'));
const Page404 = React.lazy(() => import('./views/Page404'));


const App = () => {

  return (
    <BrowserRouter>
    <Suspense fallback={()=>{}}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/MeetingSummariser" component={MeetingSummariser} />
          <Route exact path="/TranscriptSummariser" component={TranscriptSummariser} />
          <Route exact path="/SpeechToText" component={SpeechToText} />
          <Route exact path="/*" component={Page404} />                         
        </Switch>
        </Suspense>
    </BrowserRouter >
  );
};

export default App;
