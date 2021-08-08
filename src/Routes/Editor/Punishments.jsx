import React from "react";
import Select from "react-select";
import Twemoji from "../../Components/Twemoji";

export default function EditorPage({ SessionData, EditData }) {
  return (
    <div className="EditorPageParent">
      <p className="mainText">Punishments</p>
      <p className="noteText sbm"><b>Note:</b> Punishments will use the first matched range in order.</p>
      <p className="hintText"><b>Hint:</b> If you want a range to be anything 10 and above, set the min to 10 and max to '+'</p>

      <div className="EditableItem">
        <div className="punishList">
          <div className="punishItem">
            <div className="main">
              <p><b>Range:</b> <input type="text"></input> to <input type="text"></input></p>
              <span><b>Action:</b> </span>
              <Select
                className="selectItem"
                options={[
                  { value: 'mute', label: 'Mute' },
                  { value: 'kick', label: 'Kick' },
                  { value: 'ban', label: 'Ban' }
                ]}
              />
            </div>
            <span className="btnDeleteItem"><Twemoji emoji="🗑️" /></span>
          </div>
          <div className="createItem">
            <p>Create new punishment</p>
          </div>
        </div>
      </div>
    </div>
  );
};