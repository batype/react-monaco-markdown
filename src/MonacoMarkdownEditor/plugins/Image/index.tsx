import * as React from "react";
import Icon from "../../components/Icon";
import i18n from "../../i18n";
import { isPromise } from "../../utils/tool";
import InputFile from "./inputFile";
import { MonacoMarkdownEditorConText } from "../../context";

export const Image = () => {
  const pluginName = "image";

  const inputFile: React.RefObject<InputFile> = React.createRef();

  const { insertMarkdown, editorConfig } =
    MonacoMarkdownEditorConText.useContainer();

  const handleImageUpload = () => {
    const onImageUpload = editorConfig?.onImageUpload;
    if (typeof onImageUpload === "function") {
      if (inputFile.current) {
        inputFile.current.click();
      }
    } else {
      insertMarkdown("image");
    }
  };

  // const onImageChanged = (file: File) => {
  //   const onImageUpload = editorConfig?.onImageUpload;
  //   if (onImageUpload) {
  //     const placeholder = getUploadPlaceholder(file, onImageUpload);
  //     insertPlaceholder(placeholder.placeholder, placeholder.uploaded);
  //   }
  // };

  const handleCustomImageUpload = (e: any) => {
    const onCustomImageUpload = editorConfig?.onCustomImageUpload;
    if (onCustomImageUpload) {
      const res = onCustomImageUpload.call(this, e);
      if (isPromise(res)) {
        res.then((result) => {
          if (result && result.url) {
            insertMarkdown("image", {
              target: result.text,
              imageUrl: result.url,
            });
          }
        });
      }
    }
  };

  const isCustom = !!editorConfig?.onCustomImageUpload;

  return isCustom ? (
    <span
      className='button button-type-image'
      title={i18n.get("btnImage")}
      onClick={handleCustomImageUpload}>
      <Icon type='image' />
    </span>
  ) : (
    <span
      className='button button-type-image'
      title={i18n.get("btnImage")}
      onClick={handleImageUpload}
      style={{ position: "relative" }}>
      <Icon type='image' />
      {/* <InputFile
        accept={editorConfig?.imageAccept || ""}
        ref={inputFile}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.persist();
          if (e.target.files && e.target.files.length > 0) {
            onImageChanged(e.target.files[0]);
          }
        }}
      /> */}
    </span>
  );
};
