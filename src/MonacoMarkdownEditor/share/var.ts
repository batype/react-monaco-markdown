import * as React from 'react';

export type UploadFunc =
  | ((file: File) => Promise<string>)
  | ((file: File, callback: (url: string) => void) => void);

export type EditorEvent =
  | 'change'
  | 'fullscreen'
  | 'viewchange'
  | 'keydown'
  | 'focus'
  | 'blur'
  | 'scroll';

export interface View {
  menu?: boolean;
  both?: boolean;
  md?: boolean;
  html?: boolean;
}

export interface Table {
  maxRow: number;
  maxCol: number;
}

export interface EditorConfig {
  theme?: 'vs-light' | 'vs-dark';
  // /**
  //  * Language of the current model
  //  */
  // language?: string;
  /**
   * 编译区域是否可编辑
   */
  isReadOnly?: boolean;
  view?: View;
  htmlClass?: string;
  markdownClass?: string;
  table?: Table;
  imageUrl?: string;
  imageAccept?: string;
  linkUrl?: string;
  // syncScrollMode?: string[];
  // allowPasteImage?: boolean;
  onImageUpload?: UploadFunc;
  onCustomImageUpload?: (event: any) => Promise<{ url: string; text?: string }>;
  // shortcuts?: boolean;
}

export interface Selection {
  start: number;
  end: number;
  text: string;
}

export const initialSelection: Selection = {
  start: 0,
  end: 0,
  text: '',
};

export type KeyboardEventCallback = (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
) => void;
export interface KeyboardEventCondition {
  key?: string;
  keyCode: number;
  aliasCommand?: boolean;
  withKey?: ('ctrlKey' | 'shiftKey' | 'altKey' | 'metaKey')[];
}
export interface KeyboardEventListener extends KeyboardEventCondition {
  callback: KeyboardEventCallback;
}
