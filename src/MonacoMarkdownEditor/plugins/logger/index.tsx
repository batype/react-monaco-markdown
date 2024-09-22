import React from "react";
import i18n from "../../i18n";
import Icon from "../../components/Icon";
import { useMonaco } from "@monaco-editor/react";

// const LOGGER_INTERVAL = 600;

export const Logger = () => {
  // const pluginName = "logger";

  const monaco = useMonaco();
  const canUndo = (): boolean => {
    // if (monaco) {
    //   const editor = monaco.editor.getEditors()[0];
    //   const model = editor?.getModel();
    //   if (model) {
    //     return mode
    // }
    return true;
  };

  const canRedo = (): boolean => {
    if (monaco) {
      const editor = monaco.editor.getEditors()[0];
      const model = editor?.getModel();
      if (model) {
        // const data = editor.getContribution("undo");
        // console.log("data", data);
        return true;
      }
    }
    return true;
  };
  // const editor = monaco?.editor.getEditors()[0];

  // const hasUndo = logger.getUndoCount() > 1 || logger.initValue !== markdown;
  // const hasRedo = logger.getRedoCount() > 0;

  const handleUndo = () => {
    if (monaco) {
      console.log("monaco.editor.getEditors()", monaco.editor.getEditors());
      const editor = monaco.editor.getEditors()[0];
      console.log("undo", editor.getModel());
      editor.trigger("mySource", "undo", null);
    }
  };

  const handleRedo = () => {
    if (monaco) {
      const editor = monaco.editor.getEditors()[0];
      editor.trigger("mySource", "redo", null);
    }
  };

  return (
    <React.Fragment>
      <span
        className={`button button-type-undo ${canRedo() ? "" : "disabled"}`} //
        title={i18n.get("btnUndo")}
        onClick={handleUndo}>
        <Icon type='undo' />
      </span>
      <span
        className={`button button-type-redo ${canUndo() ? "" : "disabled"}`} //
        title={i18n.get("btnRedo")}
        onClick={handleRedo}>
        <Icon type='redo' />
      </span>
    </React.Fragment>
  );
};
