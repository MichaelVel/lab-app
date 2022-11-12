import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Chip } from '@mui/material';

export default function StateChip({solved}: {solved?: boolean}) {
   return solved 
    ? <Chip 
        icon= {<CheckCircleIcon />} 
        label={'Solucionado'} 
        variant="filled" 
        color="success"
    />
    : <Chip label={'Pendiente'} variant="filled" color="warning" />;
}
