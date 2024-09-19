import * as React from 'react';
import Icon from '../../components/Icon';
import i18n from '../../i18n';
import { KeyboardEventListener } from '../../share/var';
import { PluginComponent } from '../Plugin';

export default class FontStrikethrough extends PluginComponent {
  static pluginName = 'font-strikethrough';

  private handleKeyboard: KeyboardEventListener;

  constructor(props: any) {
    super(props);

    this.handleKeyboard = {
      key: 'd',
      keyCode: 68,
      aliasCommand: true,
      withKey: ['ctrlKey'],
      callback: () => this.editor.insertMarkdown('strikethrough'),
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
        className="button button-type-strikethrough"
        title={i18n.get('btnStrikethrough')}
        onClick={() => this.editor.insertMarkdown('strikethrough')}
      >
        <Icon type="strikethrough" />
      </span>
    );
  }
}
