import React from 'react';
import Box from '@mui/material/Box';
import {Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ValidationField from './validationField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

function ConfigDialog({priceBase, radialDistance, onSubmit}) {
  const [open, setOpen] = React.useState(false);
  const [price, setPrice] = React.useState(priceBase);
  const [distance, setDistance] = React.useState(radialDistance);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onSubmit(price, distance);
    handleClose();
  };

  return (
    <div>
      <Box onClick={handleClickOpen}>
        <EditIcon sx={{color: '#000', mr: '1em'}}/>
      </Box>
      <Dialog
        sx={{backgroundColor: '#1e85c1'}}
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-confirm"
      >
        <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
          Modificar cotización
        </DialogTitle>
        <DialogContent>
          <ValidationField
            enabled={true}
            value={price}
            label="Precio base"
            onChange={setPrice}
            valid={true}
            fixColor={true}
          />
          <ValidationField
            enabled={true}
            value={distance}
            label="Distancia radial"
            onChange={setDistance}
            valid={true}
            fixColor={true}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>
            Modificar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function ConfigJourney({price, radialDistance, onSubmit}) {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '1vw',
        flexWrap: 'nowrap',
        margin: '0',
        padding: '1em',
      }}
    >
      <Box sx={{display: 'flex', flexWrap: 'nowrap'}}>
        <Typography
          sx={{
            color: '#E1E2E1',
            mr: '.5em',
            whiteSpace: 'nowrap',
            pt: '.2em',
          }}
        >
          Precio base:
        </Typography>
        <Box
          sx={{
            backgroundColor: '#e1e2e3',
            borderRadius: '10px',
            mr: '.5em',
          }}
        >
          <Typography
            sx={{padding: '.2em', color: '#1e85c1'}}
          >
            {price}
          </Typography>
        </Box>
        <ConfigDialog
          priceBase={price}
          radialDistance={radialDistance}
          onSubmit={onSubmit}/>
      </Box>
      <Box sx={{display: 'flex', flexWrap: 'nowrap'}}>
        <Typography
          sx={{
            color: '#E1E2E1',
            mr: '.5em',
            whiteSpace: 'nowrap',
            pt: '.2em',
          }}
        >
          Distancia radial
        </Typography>
        <Box
          sx={{
            backgroundColor: '#e1e2e3',
            borderRadius: '10px',
            mr: '.5em',
          }}
        >
          <Typography
            sx={{padding: '.2em', color: '#1e85c1'}}
          >
            {radialDistance}
          </Typography>
        </Box>
        <ConfigDialog
          priceBase={price}
          radialDistance={radialDistance}
          onSubmit={onSubmit}/>
      </Box>
    </Box>
  );
}
