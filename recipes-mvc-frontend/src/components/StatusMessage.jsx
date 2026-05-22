const StatusMessage = ({ type, message }) => {
  if (!message) {
    return null;
  }

  return <div className={`status-message status-message--${type}`}>{message}</div>;
};

export default StatusMessage;
