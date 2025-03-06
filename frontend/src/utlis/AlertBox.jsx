import green from "/green.png";
import red from "/red.png";

const AlertBox = ({ color, text }) => {
  return (
    <div className="popup">
      <div className="alert-box">
        <img
          src={color === "green" ? green : red}
          alt="alert-logo"
          className="alert-icon"
          width={25}
          height={25}
        />
        <p className="alert-text">{text}</p>
      </div>
    </div>
  );
};

export default AlertBox;
