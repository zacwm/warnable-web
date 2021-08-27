import React, { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Twemoji from "../../Components/Twemoji";

export default function EditorPage({ SaveState }) {
  const [Copied, SetCopied] = useState(false);

  return (
    <div className="EditorPageParent">
      <div className="SaveParent">
        {
          typeof SaveState === 'string' && (
            <>
              <p className="MainText">Saved! <Twemoji emoji="😄" /></p>
              <div className="codeDisplayParent">
                <div className="codeDisplay">
                  <code>{SaveState}</code>
                  <CopyToClipboard text={SaveState}
                    onCopy={() => {
                      SetCopied(true);
                      setTimeout(() => { SetCopied(false); }, 3000);
                    }}>
                    <button>{Copied ? <Twemoji emoji="✅" /> : <Twemoji emoji="📋" /> }</button>
                  </CopyToClipboard>
                </div>
              </div>
              <p>Apply this code to the server you want with <code className="generalCodeBox">/apply (code)</code></p>
            </>
          )
        }
        { // Awaiting server response
          SaveState === 1 && (
            <>
              <p className="MainText">Saving...</p>
              <p>This shouldn't take long...</p>
            </>
          )
        }
        { // Fail
          SaveState === 2 && (
            <>
              <p className="MainText">Failed to save!</p>
              <p>Try again or send me a message on Discord: Zachary#0001</p>
            </>
          )
        }
        { // Rate limit
          SaveState === 3 && (
            <>
              <p className="MainText">Too fast!</p>
              <p>Server told us that you're making too many saves.</p>
              <p>You can only make a save once per minute.</p>
            </>
          )
        }
      </div>
    </div>
  );
};