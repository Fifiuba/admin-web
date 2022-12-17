import * as React from 'react';
import {Box} from '@mui/system';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

/**
 * Show a pop-up to confirm an action and execute it
 * @param {string} message Message displayed
 * @param {function} onConfirm Callback in case of confirm action
 * @param {number} id User id (callback param)
 * @param {(string|boolean)} param Callback param that especifies
 * roles like driver/passenger or block/unblock
 * @param {string} action Action name
 * @param {Object} button Action button
 * @param {string} title Title of pop-up
*/

export default function ConfirmationDialog({
  message,
  onConfirm,
  id,
  param,
  action,
  button,
  title,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onConfirm(id, param);
    handleClose();
  };

  return (
    <div>
      <Box onClick={handleClickOpen}>
        {button}
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-confirm"
      >
        <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>
            {action}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
