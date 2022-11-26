import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {UploadFile, DeleteOutline} from '@mui/icons-material';
import {Stack} from '@mui/system';

// Just convert the file to base64 and send it to the server via json
const toBase64 = (file : File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {

    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    return new File([blob], fileName, { type: 'pdf' });
}

async function encodeFile(file: File) {
   return await toBase64(file);
}

interface Props {
  name: string;
  subcollectionname: string;
  value: string|null;
  callback: Function;
}
export default function UploadButtons({name,callback, value, subcollectionname}: Props) {
  const [selectedFile, setSelectedFile] =  React.useState<string|null>(value);
  const [fileName, setFileName] = React.useState<string|null>(null);

  React.useEffect(() => {
    const encodeData = async () => {
      if (selectedFile) {
        callback(name,selectedFile,subcollectionname);
      }
    };

    encodeData()
      .catch(console.error);

  },[selectedFile])
  
  const handleChange = async (e: any) => {
    const file = e.target.files[0];
    const encodedFile = await encodeFile(file);
    setFileName(file.name);
    setSelectedFile(encodedFile as string);
  }

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
            onChange={handleChange}
          />
        </Button>
        <Stack direction="row">
          <p>
            {
              selectedFile 
              ? <a target="_blank" href={selectedFile}>
                  {!fileName ? "archivo guardado" : fileName}
                </a>
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
