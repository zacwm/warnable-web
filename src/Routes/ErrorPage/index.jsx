import React, {useState, useEffect} from "react";
import Twemoji from "../../Components/Twemoji";
import './style.css';

export default function ErrorPage({ type }) {
  const [ErrorTitle, setErrorTitle] = useState();
  const [ErrorBody, setErrorBody] = useState([]);

  useEffect(() => {
    switch (type) {
      case 'editorCode':
        setErrorTitle('No session found!');
        setErrorBody([
          'It\'s possible that:',
          '• The code has expired - We only hold sessions for 24 hours.',
          '• The code is invalid - Check the link/code provided is correct.'
        ])
        break;
      case 'serverError':
        setErrorTitle('Server error!');
        setErrorBody([
          'Check that:',
          '• You have an internet connection - It\'s Possible that the server is unreachable but this website is cached in your browser.',
          '• Maybe we\'re having issues - Tweet at me (@zacimac) or contact me on Discord: Zachary#0001.'
        ])
        break;
      default:
        setErrorTitle('Unknown error!');
    }
  }, [type]);

  return (
    <div className="ErrorParent">
      <Twemoji emoji="❌" />
      <p className="mainText">{ErrorTitle}</p>
      {
        ErrorBody.map(i => (
          <p>{i}</p>
        ))
      }
      <button>Back To Home</button>
    </div>
  );
};