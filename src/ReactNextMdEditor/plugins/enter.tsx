import * as React from 'react'
import { KeyboardEventListener } from '../share/var'
import { PluginComponent } from './Plugin'

export default class Enter extends PluginComponent {
  private handleKeyboard: KeyboardEventListener

  constructor(props: any) {
    super(props)

    this.handleKeyboard = {
      key: 'Enter',
      keyCode: 13,
      aliasCommand: false,
      callback: e => this.editor.insertEnter(e)
    }
  }

  componentDidMount() {
    if (this.editorConfig.shortcuts) {
      this.editor.onKeyboard(this.handleKeyboard)
    }
  }

  componentWillUnmount() {
    this.editor.offKeyboard(this.handleKeyboard)
  }

  render() {
    return <span />
  }
}
