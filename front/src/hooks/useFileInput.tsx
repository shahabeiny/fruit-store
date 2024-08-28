import { ChangeEvent, useCallback, useState } from 'react';

interface UseFileInputOptions {
  fieldName: string;
  setFieldValue: (fieldName: string, value: any) => void;
}

const useFileInput = ({ fieldName, setFieldValue }: UseFileInputOptions) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const file = e.target.files[0];
      setFieldValue(fieldName, file);
      
      // Check if the uploaded file is an image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    },
    [setFieldValue, fieldName]
  );

  return { handleInputChange, filePreview };
};

export default useFileInput;
