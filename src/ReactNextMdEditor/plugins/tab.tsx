import * as React from 'react'
import { KeyboardEventListener } from '../share/var'
import { PluginComponent } from './Plugin'

export default class Tab extends PluginComponent {
  private handleKeyboard: KeyboardEventListener

  constructor(props: any) {
    super(props)

    this.handleKeyboard = {
      key: 'Tab',
      keyCode: 9,
      aliasCommand: false,
      callback: e => this.editor.insertTab(e)
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
