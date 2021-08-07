import React from "react";
import CreatableSelect from 'react-select/creatable';

export default function EditorPage({ SessionData, EditData, setEdit }) {
  function handleChange(newValue, actionMeta) {
    let tempEditData = EditData;
    tempEditData[actionMeta.name] = newValue.map(valueObjs => { return valueObjs.value });
    setEdit(tempEditData);
  };

  return (
    <div className="EditorPageParent">
      <p className="mainText">AutoMod</p>
      <p className="noteText"><b>Note:</b> AutoMod ignores Admins, Moderators and Immune roles.</p>

      {/* INVITES */}
      <div className="EditableItem">
        <p className="ItemTitle">Discord Invites</p>
        <p>Deletes any messages containing a Discord Invite, unless the server ID of the invite is in the excluded list.</p>
        <span className="inputLabel">Enabled:</span>
        <input
          type="checkbox"
          defaultChecked={EditData.modEnabledInvites}
          onChange={() => {
            let tempEditData = EditData;
            tempEditData['modEnabledInvites'] = !EditData.modEnabledInvites;
            setEdit(tempEditData);
          }}
        />
        <span className="inputLabel nbx"><b>Exclude Invites (Server invites to let pass):</b> <i>Enter a Server ID and click 'create'</i></span>
        <CreatableSelect
          className="selectItem fullW"
          isClearable
          isMulti
          name="modInvites"
          defaultValue={EditData.modInvites.map(serverID => { return { value: serverID, label: serverID } })}
          onChange={handleChange}
          options={[]}
        />
      </div>

      {/* BAD WORDS */}
      <div className="EditableItem">
        <p className="ItemTitle">Bad Words</p>
        <p>Deletes any words in the word list.</p>
        <span className="inputLabel">Enabled:</span>
        <input
          type="checkbox"
          defaultChecked={EditData.modEnabledWords}
          onChange={() => {
            let tempEditData = EditData;
            tempEditData['modEnabledWords'] = !EditData.modEnabledWords;
            setEdit(tempEditData);
          }}
        />
        <span className="inputLabel nbx">Word list (Words to delete): <i>Enter a word and click 'create'</i></span>
        <CreatableSelect
          className="selectItem fullW"
          isClearable
          isMulti
          name="modWords"
          defaultValue={EditData.modWords.map(word => { return { value: word, label: word } })}
          onChange={handleChange}
          options={[]}
        />
      </div>
    </div>
  );
};