import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";

const useDocumentPicker = (type: string) => {
  const [selectedFile, setSelectedFile] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type,
    });

    if (result.canceled) {
      return;
    }
    setSelectedFile(result.assets[0]);
  };

  return {
    selectedFile,
    pickDocument,
  };
};

export default useDocumentPicker;
