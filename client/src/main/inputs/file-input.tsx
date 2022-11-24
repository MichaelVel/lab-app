import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {UploadFile, DeleteOutline} from '@mui/icons-material';
import {Stack} from '@mui/system';

// Just convert the file to base64 and send it to the server via json
const toBase64 = (file : File)=> new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

async function main(file: File) {
   console.log(await toBase64(file));
}

interface Props {
  name: string;
  subCollectionName: string;
  value: File|null;
  callback: Function;
}
export default function UploadButtons({name,value,callback,subCollectionName}: Props) {
  const [selectedFile, setSelectedFile] =  React.useState<File|null>(value);

  React.useEffect(() => {
    callback(name,selectedFile,subCollectionName);
  },[selectedFile])
  
  const handleDelete = () => {
    setSelectedFile(null);
  }
  return (
      <>
        <Button variant="contained" component="label">
          <UploadFile /> {" "} Subir Archivo
          <input 
            hidden 
            accept=".pdf,image/*" 
            type="file"
            name="name"
            onChange={(e: any) => setSelectedFile(e.target.files[0])}
          />
        </Button>
        <Stack direction="row">
          <p>
            {
              selectedFile 
              ? selectedFile.name 
              : "No hay ningún archivo seleccionado"
            }
          </p>
          {selectedFile && 
            <IconButton onClick={handleDelete}>
              <DeleteOutline />
            </IconButton>}
        </Stack>
      </>
  );
}
