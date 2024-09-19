import * as React from 'react';
import Icon from '../../components/Icon';
import i18n from '../../i18n';
import { KeyboardEventListener } from '../../share/var';
import { PluginComponent } from '../Plugin';

export default class FontBold extends PluginComponent {
  static pluginName = 'font-bold';

  private handleKeyboard: KeyboardEventListener;

  constructor(props: any) {
    super(props);

    this.handleKeyboard = {
      key: 'b',
      keyCode: 66,
      aliasCommand: true,
      withKey: ['ctrlKey'],
      callback: () => this.editor.insertMarkdown('bold'),
    };
  }

  componentDidMount() {
    if (this.editorConfig.shortcuts) {
      this.editor.onKeyboard(this.handleKeyboard);
    }
  }

  componentWillUnmount() {
    this.editor.offKeyboard(this.handleKeyboard);
  }

  render() {
    return (
      <span
        className="button button-type-bold"
        title={i18n.get('btnBold')}
        onClick={() => this.editor.insertMarkdown('bold')}
      >
        <Icon type="bold" />
      </span>
    );
  }
}
