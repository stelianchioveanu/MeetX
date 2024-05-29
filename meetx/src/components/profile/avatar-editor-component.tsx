import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone, { DropEvent, FileRejection, Accept } from 'react-dropzone';
import { Slider } from '../ui/slider';
import { CropImage } from './avatar-dialog';

const AvatarEditorComponent = forwardRef<CropImage, {setImage: React.Dispatch<React.SetStateAction<string | null>>,
  setImageChanged: React.Dispatch<React.SetStateAction<boolean>>}>((props, ref) => {
  const [image, setImage] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const editorRef = useRef<AvatarEditor | null>(null);

  const handleDrop = (acceptedFiles: File[], _fileRejections: FileRejection[], _event: DropEvent) => {
    if (acceptedFiles.length > 0) {
      setImage(URL.createObjectURL(acceptedFiles[0]));
    }
  };

  const handleValueScale = (e: number[]) => {
    setScale(e[0]);
  };

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const dataUrl = canvas.toDataURL();
      props.setImage(dataUrl);
      props.setImageChanged(true);
    }
  };

  useImperativeHandle(
    ref,
    () => ({
        saveImageCropped() {
            handleSave();
        }
    }),
)

  const accept: Accept = {
    'image/*': []
  }

  return (
    <div className='w-full flex justify-center'>
      {!image && <Dropzone onDrop={handleDrop} accept={accept}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={{ border: '2px dashed #cccccc', padding: '20px', textAlign: 'center' }}>
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select one</p>
          </div>
        )}
      </Dropzone>}

      {image && (
        <div className='flex flex-col gap-2'>
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={200}
            height={200}
            border={50}
            borderRadius={1000}
            scale={scale}
            style={{ marginTop: '20px' }}
          />
          <Slider
            defaultValue={[scale]}
            min={1}
            max={2}
            step={0.01}
            onValueChange={handleValueScale}
            className="w-full mt-4 hover:cursor-pointer"
          />
        </div>
      )}
    </div>
  );
});

export default AvatarEditorComponent;