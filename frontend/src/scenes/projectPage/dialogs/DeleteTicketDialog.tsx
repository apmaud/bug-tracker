import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { setViewProject } from '@/state';
import { useDispatch } from 'react-redux';

export default function DeleteTicketDialog(params) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const parameters = params.params
  const projectId = params.projectId
  const refreshTickets = params.refreshTickets


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFn = () => {
    removeTicket()
    setOpen(false);
  };

  async function removeTicket() {
    const response = await fetch(`http://localhost:4000/tickets/${projectId}/remove`, {
        method: "PATCH",
        body: JSON.stringify({parameters}),
        headers: {'Content-Type': 'application/json'},
    });
    const updatedProject = await response.json();
    dispatch(setViewProject({ viewProject: updatedProject }))
    if (response.status === 200) {
        refreshTickets();
        params.setPageType("list")
      } else {
        alert('failed')
      }
  }

  return (
    <div>
      <Button 
      onClick={handleClickOpen}
      variant="contained"
      color="secondary"
      size="small"
      >
        Remove
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Remove this ticket?
        </DialogTitle>
        
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Close</Button>
          <Button onClick={handleFn} autoFocus color="secondary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
