
import { Dialog,Paper } from "@mui/material";

function LightBox({isOpen, onCloseCallback, children, useHistoryBack = false, backdropColor = "rgba(0,0,0,0.5)" }) {
  return (
         <Dialog
         
        open={isOpen}
        onClose={() => {    
            onCloseCallback?.();
            if (useHistoryBack)
            {
                window.history.back();
            }    
        }}
        maxWidth = {false}  // allow custom width via Paper
        scroll="paper"  
     slots={{ paper: (props) => <Paper {...props} /> }}
  slotProps={{
         root: {   // <-- this targets the internal container
          sx: {
            display: 'flex',
            alignItems: 'center',  // vertical centering
            justifyContent: 'center', // horizontal centering
            minHeight: '100vh',
          }
        },
        paper: {
          sx: {
            width: { xs: '85vw', sm: '80vw', md: '70vw', lg: '60vw', xl: '50vw' },
            maxWidth: 'none',
            minWidth: 300,
              maxHeight: '80vh',   // use a fixed % of viewport to avoid flex centering issues
            overflowY: 'auto',   // <-- scroll inside the Paper if content is too tall
            p: 3,
            borderRadius: 2,
            margin:'auto'
          }
        },
    backdrop: {
      sx: { backgroundColor: backdropColor }
    }
  }}
      >
       {children}
      </Dialog>
  )
}

export default LightBox