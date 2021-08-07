import React from "react";
import CreatableSelect from 'react-select/creatable';

export default function EditorPage({ SessionData, EditData, setEdit }) {

  function handleChange(newValue, actionMeta) {
    let tempEditData = EditData;
    tempEditData[actionMeta.name] = newValue.value;
    setEdit(tempEditData);
  };

  return (
    <div className="EditorPageParent">
      <p className="mainText">Channels</p>
      <p className="hintText"><b>Hint:</b> To add a channel not in the list... Enter the channel ID and click 'create'</p>

      {/* WARN-LOG */}
      <div className="EditableItem">
        <p className="ItemTitle">Warn Log</p>
        <p>Any new warnings will be sent to this channel.</p>
        <p>- Required values: Single Channel</p>
        <span className="inputLabel">Channel:</span>
        <CreatableSelect
          className="selectItem"
          isClearable
          name="channelWarn"
          defaultValue={SessionData.channels.find(c => c.value === EditData.channelWarn) || { value: EditData.channelWarn, label: EditData.channelWarn }}
          onChange={handleChange}
          options={SessionData.channels}
        />
      </div>

      {/* PUNISHMENT-LOG */}
      <div className="EditableItem">
        <p className="ItemTitle">Punishment Log</p>
        <p>Any new or finished punishment events will be logged to this channel.</p>
        <p>- Required values: Single Channel</p>
        <span className="inputLabel">Channel:</span>
        <CreatableSelect
          className="selectItem"
          isClearable
          name="channelPunish"
          defaultValue={SessionData.channels.find(c => c.value === EditData.channelPunish) || { value: EditData.channelPunish, label: EditData.channelPunish }}
          onChange={handleChange}
          options={SessionData.channels}
        />
      </div>

      {/* JOIN-LEAVE-LOG */}
      <div className="EditableItem">
        <p className="ItemTitle">Join & Leave Log</p>
        <p>Any new members who join and or leave the server will be logged to this channel.</p>
        <p>- Required values: Single Channel</p>
        <span className="inputLabel">Channel:</span>
        <CreatableSelect
          className="selectItem"
          isClearable
          name="channelUser"
          defaultValue={SessionData.channels.find(c => c.value === EditData.channelUser) || { value: EditData.channelUser, label: EditData.channelUser }}
          onChange={handleChange}
          options={SessionData.channels}
        />
      </div>

      {/* MESSAGE-LOG */}
      <div className="EditableItem">
        <p className="ItemTitle">Message Log</p>
        <p>Any messages that are deleted or edited will be logged to this channel along with the previous message content.</p>
        <p>- Required values: Single Channel</p>
        <span className="inputLabel">Channel:</span>
        <CreatableSelect
          className="selectItem"
          isClearable
          name="channelMessage"
          defaultValue={SessionData.channels.find(c => c.value === EditData.channelMessage) || { value: EditData.channelMessage, label: EditData.channelMessage }}
          onChange={handleChange}
          options={SessionData.channels}
        />
      </div>
    </div>
  );
};