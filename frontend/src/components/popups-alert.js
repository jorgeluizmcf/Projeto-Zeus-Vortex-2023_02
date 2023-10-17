import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const PopUpAlert = (props) => {

    const { nameButton, title, message, confirmLabel, cancelLabel } = props;

  const submit = () => {
    confirmAlert({
      title: props.title,
      message: props.message,
      confirmLabel: props.confirmLabel,
      cancelLabel: props.cancelLabel,
      onConfirm: () => alert('Action after Confirm'),
      onCancel: () => alert('Action after Cancel'),
      overlayClassName: 'overlay-custom-class-name',
    });
  };

  return (
      <button className="sidebar-button" onClick={submit}>{props.nameButton}</button>
  );
};

export default PopUpAlert;
