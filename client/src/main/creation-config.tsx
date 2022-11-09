import * as React from 'react';
import Switch from '@mui/material/Switch';
import {
    Checkbox,
    FormControl,
    FormControlLabel, 
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material';

export function VisibilityOption() {
    return (
        <FormControl 
            required
            sx={{ m:1 }}
            component="fieldset"
            variant="standard"
        >
            <FormLabel component="legend">Visibilidad</FormLabel>
            <RadioGroup
                defaultValue="privado"
                name="visibility-group"
            >
                <FormControlLabel
                    control={
                        <Radio value="public" />
                    }
                    label="Publico"
                />
                <FormControlLabel 
                    control={
                        <Radio value="privado" /> 
                    }
                    label="Privado"
                />
            </RadioGroup> 
        </FormControl>
    );
};

export function AllowAnswers() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
        <FormControlLabel
            control={
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            }
            label="Permitir Respuestas"
        />
        <AllowedAnswers allowed={!checked} />
    </div>
  );
}

function AllowedAnswers(props: {allowed: boolean}) {
    return (
        <FormControl 
            required
            sx={{ m:1 }}
            component="fieldset"
            variant="standard"
        >
            <FormLabel component="legend">
                Formato de las respuestas
            </FormLabel>
            <FormGroup>
                <FormControlLabel
                    disabled={props.allowed}
                    control={
                        <Checkbox 
                            name="typeAnswer" 
                            value="pdf" />
                    }
                    label="PDF"
                />
                <FormControlLabel 
                    disabled={props.allowed}
                    control={
                        <Checkbox
                            name="typeAnswer" 
                            value="video" />
                    }
                    label="Video"
                />
            </FormGroup> 
        </FormControl>
    );
} 
