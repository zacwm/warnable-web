import { HashRouter as Router, Route } from 'react-router-dom';
import Editor from './Routes/Editor';
import ErrorPage from './Routes/ErrorPage';
import HomePage from './Routes/Home';

export default function App() {
  return (
    <>
      <Router basename="/">
        { /* # Editor */}
        <Route path="/editor/NotFound" exact> <ErrorPage type="editorCode" /> </Route>
        <Route path="/editor/:code" exact children={<Editor />} />
        { /* # Home */ }
        <Route path="/" exact> <HomePage /> </Route>
        { /* # 404 */ }
        <Route path="/*" exact> <ErrorPage type="noPage" /> </Route>
      </Router>
    </>
  );
};