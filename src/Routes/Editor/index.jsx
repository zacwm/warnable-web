import React, {useState, useEffect} from 'react';
import Twemoji from '../../Components/Twemoji';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import AssetGitHubLogo from '../../assets/GitHub-Mark-Light-64px.png';
import './style.css';
import Punishments from './Punishments';
import AutoMod from './AutoMod';
import Roles from './Roles';
import Channels from './Channels';
import Save from './Save';

export default function Editor() {
  const history = useHistory();
  let { code } = useParams();
  const [SessionData, setSessionData] = useState();
  const [EditData, setEditData] = useState({});
  const [CurrentPage, setCurrentPage] = useState(0); // 0 = Punis., 1 = Auto, 2 = Roles, 3 = Chann.
  const [SaveState, setSaveState] = useState(); // 1 = Saving, 2 = Failed to save, String = Save code to apply.

  useEffect(() => {
    Axios.get(`https://warnableeditapi.zachary.lol/get-session/${code}`)
      .then(response => {
        if (response.status === 200) {
          console.dir('AHAHHAHAHAHAHHAHA');
          console.dir(response.data);
          setSessionData(response.data);
          setEditData(response.data.editData);
        }
        else {
          history.push('/editor/ServerError');
        }
      })
      .catch((err) => {
        if (err.response) {
          switch (err.response.status) {
            case 404:
              history.push('/editor/NotFound');
              break;
            default:
              history.push('/editor/ServerError');
          }
        } else {
          history.push('/editor/ServerError');
        }
      });

    window.addEventListener('beforeunload', function (e) {
      let confMsg = "You have unsaved changes! All changes could be lost!";
      e.preventDefault();
      e.returnValue = confMsg;
      return confMsg;
    });
  }, [code, history]);

  function saveEditSession() {
    if (SaveState === 1) return;
    setSaveState(1);
    setCurrentPage(4);
    Axios.post('https://warnableeditapi.zachary.lol/save-session', { data: { ...SessionData, editData: EditData } })
      .then(response => {
        switch (response.status) {
          case 200:
            setSaveState(response.data.code);
            break;
          default:
            setSaveState(2);
        }
      })
      .catch((err) => {
        if (err.response) {
          switch (err.response.status) {
            case 429:
              setSaveState(3);
              break;
            default:
              setSaveState(2);
          }
        }
        else {
          setSaveState(2);
        }
      });
  }

  return (
    <div className="EditorParent">
      <div className="titleBar">
        <p className="mainText"><b>Warnable Editor</b> • { SessionData ? SessionData.name : '...' }</p>
        <div className="iconLinks">
          <a href="https://github.com/zacimac/warnable" target="_blank" rel="noreferrer"><img src={AssetGitHubLogo} alt="GitHub" /></a>
        </div>
      </div>
      <div className="Editor">
        {
          SessionData ? (
            <>
              <div className="Nav">
                <div className="NavQA">
                  <button className={SaveState === 1 ? 'disabled' : ''} onClick={() => { SaveState !== 1 && setCurrentPage(1) }}>AutoMod</button>
                  <button className={SaveState === 1 ? 'disabled' : ''} onClick={() => { SaveState !== 1 && setCurrentPage(0) }}>Punishments</button>
                  <button className={SaveState === 1 ? 'disabled' : ''} onClick={() => { SaveState !== 1 && setCurrentPage(2) }}>Roles</button>
                  <button className={SaveState === 1 ? 'disabled' : ''} onClick={() => { SaveState !== 1 && setCurrentPage(3) }}>Channels</button>
                </div>
                <div className="NavQP">
                  <p>Editing session from:</p>
                  <p>3:41 PM, 2 August 2021</p>
                  <button onClick={() => { saveEditSession(); }}><Twemoji emoji="💾" /> {SaveState === 1 ? 'Saving...' : 'Save'}</button>
                </div>
              </div>
              <div className="Page">
                { CurrentPage === 0 && <Punishments SessionData={SessionData} EditData={EditData} setEdit={setEditData} /> }
                { CurrentPage === 1 && <AutoMod SessionData={SessionData} EditData={EditData} setEdit={setEditData} /> }
                { CurrentPage === 2 && <Roles SessionData={SessionData} EditData={EditData} setEdit={setEditData} /> }
                { CurrentPage === 3 && <Channels SessionData={SessionData} EditData={EditData} setEdit={setEditData} /> }
                { CurrentPage === 4 && <Save SessionData={SessionData} EditData={EditData} SaveState={SaveState} /> }
              </div>
            </>
          ) : (
            <div className="loadingDisplay">
              <p>Fetching data to edit...</p>
              <p>Try refreshing if it's taking too long.</p>
            </div>
          )
        }
      </div>
      <div className="Footer">
        <p><a href="https://github.com/zacimac/warnable-web" target="_blank" rel="noreferrer">warnable-web</a>@<a href={ `https://github.com/zacimac/warnable-web/commit/${process.env.REACT_APP_GIT_SHA || ''}` } target="_blank" rel="noreferrer">{process.env.REACT_APP_GIT_SHA || 'unknown'}</a></p>
        <p><Twemoji emoji="🌟" /> By <a href="https://zachary.lol" target="_blank" rel="noreferrer">Zachary</a> and <a href="https://github.com/zacimac/warnable/graphs/contributors" target="_blank" rel="noreferrer">contribuitors</a></p>
      </div>
    </div>
  );
};