import React from "react";
import Select from "react-select";
import Twemoji from "../../Components/Twemoji";

export default function EditorPage({ SessionData, EditData, setEdit }) {
  return (
    <div className="EditorPageParent">
      <p className="mainText">Punishments</p>
      <p className="noteText sbm"><b>Note:</b> Punishments will use the first matched range in order.</p>
      <p className="noteText sbm"><b>Note:</b> Temp times are not supported for kick punishments.</p>
      <p className="hintText"><b>Hint:</b> If you want a range to be anything 10 and above, set the min to 10 and max to '+'</p>

      <div className="EditableItem">
        <div className="punishList">
          {
            EditData.punishments.map((v, i) => (
              <div className="punishItem">
                <div className="sub itemIndex">
                  <span>{i + 1}.</span>
                </div>
                <div className="main">
                  <p><b>Range:</b> <input type="text" defaultValue={v.rangeMin}></input> to <input type="text" defaultValue={v.rangeMax}></input></p>
                  <span><b>Action:</b> </span>
                  <Select
                    className="selectItem"
                    defaultValue={{ 
                      mute: { value: 'mute', label: 'Mute' },
                      kick: { value: 'kick', label: 'Kick' },
                      ban: { value: 'ban', label: 'Ban' }
                    }[v.actionType]}
                    options={[
                      { value: 'mute', label: 'Mute' },
                      { value: 'kick', label: 'Kick' },
                      { value: 'ban', label: 'Ban' }
                    ]}
                  />
                  <p className="smt"><b>Temporary time</b> (Leave blank for permanent): <input type="text" defaultValue={v.tempTime}></input></p>
                </div>
                <div className="sub">
                  <span className="btnDeleteItem"><Twemoji emoji="🗑️" /></span>
                </div>
              </div>
            ))
          }
          <div className="createItem" onClick={() => {
            let tempEdit = EditData;
            tempEdit.punishments.push({
              rangeMin: '',
              rangeMax: '',
              actionType: '',
              tempTime: ''
            })
            setEdit(tempEdit);
          }}>
            <p>Create new punishment</p>
          </div>
        </div>
      </div>
    </div>
  );
};