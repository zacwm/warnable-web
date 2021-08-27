import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Editor from './Routes/Editor';
import ErrorPage from './Routes/ErrorPage';

export default function App() {
  return (
    <>
      <Router basename="/">
        <Switch>
          { /* # Editor */}
          <Route path="/editor/NotFound" exact> <ErrorPage type="editorCode" /> </Route>
          <Route path="/editor/ServerError" exact> <ErrorPage type="serverError" /> </Route>
          <Route path="/editor/:code" exact children={<Editor />} />
          { /* # Home */ }
          <Route path="/" exact component={() => { 
            window.location.href = 'https://github.com/zacimac/warnable'; 
            return null;
          }}/>
          { /* # 404 */ }
          <Route path="/*" exact> <ErrorPage type="noPage" /> </Route>
        </Switch>
      </Router>
    </>
  );
};