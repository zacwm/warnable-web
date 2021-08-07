import React, {useState, useEffect} from 'react';
import Twemoji from '../../Components/Twemoji';
import { useParams } from 'react-router';
import AssetGitHubLogo from '../../assets/GitHub-Mark-Light-64px.png';
import './style.css';
import Punishments from './Punishments';
import AutoMod from './AutoMod';
import Roles from './Roles';
import Channels from './Channels';

export default function Editor() {
  let { code } = useParams();
  const [SessionData, setSessionData] = useState();
  const [EditData, setEditData] = useState({});
  const [CurrentPage, setCurrentPage] = useState(0); // 0 = Punis., 1 = Auto, 2 = Roles, 3 = Chann.

  useEffect(() => {
    console.dir(code);
    setTimeout(() => { // just a placeholder to put an actual request for data.
      /* 
       * Set the session data.
       * This is data that will not be changed from values.
       * It is also used as an undo/revert for edited items.
       */
      setSessionData({
        name: 'Example Server',
        id: '1234',
        roles: [
          { value: '1234567890', label: 'Alien' },
          { value: '3554534576', label: 'Mods' },
          { value: '2304892340', label: 'Helpers' },
          { value: '1409834985', label: 'Mini Mods' },
          { value: '1982049771', label: 'Earthlings' },
        ],
        channels: [
          { value: '8388299193', label: '#warn-log' },
          { value: '3987437761', label: '#general' },
          { value: '9817471663', label: '#user-log' },
          { value: '8877189840', label: '#message-log' },
          { value: '9823987664', label: '#punish-log' },
          { value: '9483590873', label: '#spammy-ufo' },
        ],

        editData: {
          automod: {
            invites: {
              enabled: true,
              excluded: []
            },
            badwords: {
              enabled: true,
              words: []
            }
          },
          roles: {

          }
        }
      });

      setEditData({
        // Punishments
        
        // AutoMod
        modEnabledInvites: true,
        modInvites: ['1234567890'],
        modEnabledWords: true,
        modWords: ['tomato', 'apple', 'carrot'],

        // Roles
        rolesAdmins: ['1234567890'],
        rolesMods: ['3554534576'],
        rolesViewers: ['2304892340', '1409834985'],
        rolesImmune: ['1234567890', '2304892340'],
        rolesMuted: '1982049771',

        // Channels
        channelWarn: '123',
        channelPunish: '123',
        channelUser: '123',
        channelMessage: '123'
      })
    }, 1000);

    window.addEventListener('beforeunload', function (e) {
      let confMsg = "You have unsaved changes! All changes could be lost!";
      e.preventDefault();
      e.returnValue = confMsg;
      return confMsg;
    });
  }, [code]);

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
                  <button onClick={() => { setCurrentPage(0) }}>Punishments</button>
                  <button onClick={() => { setCurrentPage(1) }}>AutoMod</button>
                  <button onClick={() => { setCurrentPage(2) }}>Roles</button>
                  <button onClick={() => { setCurrentPage(3) }}>Channels</button>
                </div>
                <div className="NavQP">
                  <p>Editing session from:</p>
                  <p>3:41 PM, 2 August 2021</p>
                  <button><Twemoji emoji="💾" /> Save</button>
                </div>
              </div>
              <div className="Page">
                { CurrentPage === 0 && <Punishments SessionData={SessionData} EditData={EditData} setEdit={setEditData} /> }
                { CurrentPage === 1 && <AutoMod SessionData={SessionData} EditData={EditData} setEdit={setEditData} /> }
                { CurrentPage === 2 && <Roles SessionData={SessionData} EditData={EditData} setEdit={setEditData} /> }
                { CurrentPage === 3 && <Channels SessionData={SessionData} EditData={EditData} setEdit={setEditData} /> }
              </div>
            </>
          ) : <p>Loading...</p>
        }
      </div>
      <div className="Footer">
        <p><a href="https://github.com/zacimac/warnable-web" target="_blank" rel="noreferrer">warnable-web</a> @ <a href="https://github.com/zacimac/warnable-web/commit/" target="_blank" rel="noreferrer">no-comit</a></p>
        <p><Twemoji emoji="🌟" /> By <a href="https://zachary.lol" target="_blank" rel="noreferrer">Zachary</a> and <a href="https://github.com/zacimac/warnable/graphs/contributors" target="_blank" rel="noreferrer">contribuitors</a></p>
      </div>
    </div>
  );
};