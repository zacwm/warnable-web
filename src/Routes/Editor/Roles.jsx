import React from "react";
import CreatableSelect from 'react-select/creatable';

export default function EditorPage({ SessionData, EditData, setEdit }) {
  function handleChange(newValue, actionMeta) {
    let tempEditData = EditData;
    if (actionMeta.name === 'rolesMuted') {
      tempEditData[actionMeta.name] = newValue.value;
    } else {
      tempEditData[actionMeta.name] = newValue.map(valueObjs => { return valueObjs.value });
    }
    // setEdit(tempEditData);
    console.dir(tempEditData);
  };

  return (
    <div className="EditorPageParent">
      <p className="mainText">Roles</p>
      <p className="hintText"><b>Hint:</b> To add a role not in the list... Enter the role ID and click 'create'</p>

      {/* ADMINS */}
      <div className="EditableItem">
        <p className="ItemTitle">Admins</p>
        <p>Admins have the ability to create and apply Warnable Editor session edits, PLUS other Warnable permissions from moderators and viewers.</p>
        <p><b>Note:</b> Members with the 'Administrator' permission also has access to Warnable admin permissions even without a set role.</p>
        <p>- Required values: Roles</p>
        <CreatableSelect
          className="selectItem fullW"
          isClearable
          isMulti
          name="rolesAdmins"
          defaultValue={EditData.rolesAdmins.map(role => {
            return SessionData.roles.find(c => c.value === role) || { value: role, label: role }
          })}
          onChange={handleChange}
          options={SessionData.roles}
        />
      </div>

      {/* MODS */}
      <div className="EditableItem">
        <p className="ItemTitle">Moderators</p>
        <p>Moderators have access to view, create and delete warnings AND view, start and cancel punishments.</p>
        <p>- Required values: Roles</p>
        <CreatableSelect
          className="selectItem fullW"
          isClearable
          isMulti
          name="rolesMods"
          defaultValue={EditData.rolesMods.map(role => {
            return SessionData.roles.find(c => c.value === role) || { value: role, label: role }
          })}
          onChange={handleChange}
          options={SessionData.roles}
        />
      </div>

      {/* VIEWERS */}
      <div className="EditableItem">
        <p className="ItemTitle">Viewers</p>
        <p>Viewers can view warnings and punishments.</p>
        <p>- Required values: Roles</p>
        <CreatableSelect
          className="selectItem fullW"
          isClearable
          isMulti
          name="rolesViewers"
          defaultValue={EditData.rolesViewers.map(role => {
            return SessionData.roles.find(c => c.value === role) || { value: role, label: role }
          })}
          onChange={handleChange}
          options={SessionData.roles}
        />
      </div>

      {/* VIEWERS */}
      <div className="EditableItem">
        <p className="ItemTitle">Immune</p>
        <p>A bypass role for the Warnable AutoMod</p>
        <p>- Required values: Roles</p>
        <CreatableSelect
          className="selectItem fullW"
          isClearable
          isMulti
          name="rolesImmune"
          defaultValue={EditData.rolesImmune.map(role => {
            return SessionData.roles.find(c => c.value === role) || { value: role, label: role }
          })}
          onChange={handleChange}
          options={SessionData.roles}
        />
      </div>

      {/* MUTE */}
      <div className="EditableItem">
        <p className="ItemTitle">Muted</p>
        <p>The muted role is the role applied for any 'Mute' punishments</p>
        <p>- Required values: Single Role</p>
        <span className="inputLabel">Mute Role:</span>
        <CreatableSelect
          className="selectItem"
          isClearable
          name="rolesMuted"
          defaultValue={SessionData.roles.find(c => c.value === EditData.rolesMuted) || { value: EditData.rolesMuted, label: EditData.rolesMuted }}
          onChange={handleChange}
          options={SessionData.roles}
        />
      </div>
    </div>
  );
};