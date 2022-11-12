import AddIcon from '@mui/icons-material/Add';
import { Chip } from '@mui/material';

export default function VisibilityChip({visible}: {visible?: boolean}) {
  let label = visible ? 'Publico' : 'Privado';
  return <Chip label={label} variant="outlined" />;
}
