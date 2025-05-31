import React, { useEffect, useState } from 'react';
import './popUp.scss';

type PopUpProps = {
  setShowPopup: (value: boolean) => void;
  message: string;
  isError?: boolean;
};

const PopUp: React.FC<PopUpProps> = ({
  setShowPopup,
  message,
  isError = false,
}) => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const entryTimeout = setTimeout(() => setHidden(false), 10);
    const autoCloseTimeout = setTimeout(() => {
      setHidden(true);
      setTimeout(() => setShowPopup(false), 500);
    }, 4000);

    return () => {
      clearTimeout(entryTimeout);
      clearTimeout(autoCloseTimeout);
    };
  }, [setShowPopup]);

  return (
    <div
      className={`popup ${hidden ? 'popup--hidden' : ''} ${isError ? 'popup--error' : 'popup--success'}`}
    >
      <div className="popup__content">
        <p>{message}</p>
        <button onClick={() => setShowPopup(false)}>
          <img src="./images/icons/close-icon.svg" alt="close" />
        </button>
      </div>
    </div>
  );
};

export default PopUp;
