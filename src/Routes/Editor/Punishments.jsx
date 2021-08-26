import React from "react";
import Select from "react-select";
import Twemoji from "../../Components/Twemoji";

export default function EditorPage({ SessionData, EditData, setEdit }) {
  function updateData(i, k, v) {
    let tempEdit = EditData;
    let tempPunishment = tempEdit.punishments;
    let tempIndex = tempPunishment[i];
    tempIndex[k] = v;
    tempPunishment[i] = tempIndex;
    setEdit({
      ...tempEdit,
      punishments: [...tempPunishment]
    });
  }

  return (
    <div className="EditorPageParent">
      <p className="mainText">Punishments</p>
      <p className="noteText sbm"><b>Note:</b> Punishments will use the first matched range in order.</p>
      <p className="noteText sbm"><b>Note:</b> Temp times are not supported for kick punishments.</p>
      <p className="hintText"><b>Hint:</b> If you want a range to be anything 10 and above, set the min to 10 and max to '+'</p>

      <div className="EditableItem">
        <div className="punishList">
          {
            EditData.punishments?.map((v, i) => (
              <div className="punishItem" key={i}>
                <div className="sub itemIndex">
                  <span>{i + 1}.</span>
                </div>
                <div className="main">
                  <p><b>Range:</b> <input type="text" value={v.rangeMin} onChange={(nv) => {
                    updateData(i, 'rangeMin', nv.target.value);
                  }}></input> to <input type="text" value={v.rangeMax} onChange={(nv) => {
                    updateData(i, 'rangeMax', nv.target.value);
                  }}></input></p>
                  <span><b>Action:</b> </span>
                  <Select
                    className="selectItem"
                    value={{ 
                      mute: { value: 'mute', label: 'Mute' },
                      kick: { value: 'kick', label: 'Kick' },
                      ban: { value: 'ban', label: 'Ban' }
                    }[v.actionType]}
                    options={[
                      { value: 'mute', label: 'Mute' },
                      { value: 'kick', label: 'Kick' },
                      { value: 'ban', label: 'Ban' }
                    ]}
                    onChange={(nv) => {
                      updateData(i, 'actionType', nv.value);
                    }}
                  />
                  <p className="smt"><b>Temporary time</b> (Leave blank for permanent): <input type="text" value={v.tempTime} onChange={(nv) => {
                    updateData(i, 'tempTime', nv.target.value);
                  }}></input></p>
                </div>
                <div className="sub">
                  <span className="btnDeleteItem" onClick={() => {
                    let punishmentItems = EditData.punishments;
                    punishmentItems.splice(i, 1)
                    setEdit(prevState => {
                      return {
                        ...prevState, 
                        punishments: [...punishmentItems]
                      } 
                    });
                  }}><Twemoji emoji="🗑️" /></span>
                </div>
              </div>
            ))
          }
          <div className="createItem" onClick={(() => {
            setEdit(prevState => {
              return {
                ...prevState, 
                punishments: [...prevState.punishments, {
                  rangeMin: '',
                  rangeMax: '',
                  actionType: '',
                  tempTime: ''
                }]
              } 
            });
          })}>
            <p>Create new punishment</p>
          </div>
        </div>
      </div>
    </div>
  );
};
