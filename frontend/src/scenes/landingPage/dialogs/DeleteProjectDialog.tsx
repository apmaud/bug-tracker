import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { setViewProject } from '@/state';
import { useDispatch } from 'react-redux';

export default function DeleteProjectDialog(params) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const parameters = params.params
  const projectId = params.projectId
  const refreshProjects = params.refreshProjects


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFn = () => {
    removeProject()
    setOpen(false);
  };



  async function removeProject() {
    const response = await fetch(`http://localhost:4000/projects/remove`, {
        method: "PATCH",
        body: JSON.stringify({parameters}),
        headers: {'Content-Type': 'application/json'},
    });
    if (response.status === 200) {
        refreshProjects();
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
          Remove this project?
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
