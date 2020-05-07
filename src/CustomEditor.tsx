import React, { useState } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { 
  FormatBold, 
  FormatItalic, 
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  Link
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core'
import { stateToHTML } from 'draft-js-export-html'

const useStyles = makeStyles(theme => ({
  headings: { 
    fontWeight: 'bold',
    padding: 2,
    paddingTop: 3,
    fontSize: 18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

function CustomEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const handleInlineClick = (command: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, command.toUpperCase()));
  }

  const handleBlockClick = (command: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, command));
  }

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    console.log(command)
    console.log(stateToHTML(editorState.getCurrentContent()))
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  const classes = useStyles()

  return (
    <div style={{backgroundColor: '#666', width: 600, margin: 20, borderRadius: 8, color: '#fff', padding: 10, textAlign: "left"}}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <button onClick={() => handleBlockClick('header-one')}><span className={classes.headings}>H1</span></button>
        <button onClick={() => handleBlockClick('header-two')}><span className={classes.headings}>H2</span></button>
        <button onClick={() => handleBlockClick('header-three')}><span className={classes.headings}>H3</span></button>
        <button onClick={() => handleBlockClick('header-four')}><span className={classes.headings}>H4</span></button>
        <button onClick={() => handleBlockClick('header-five')}><span className={classes.headings}>H5</span></button>
        <button onClick={() => handleBlockClick('header-six')}><span className={classes.headings}>H6</span></button>
        <button onClick={() => handleInlineClick('bold')}><FormatBold /></button>
        <button onClick={() => handleInlineClick('italic')}><FormatItalic /></button>
        <button onClick={() => handleInlineClick('underline')}><FormatUnderlined /></button>
        <button onClick={() => handleBlockClick('unordered-list-item')}><FormatListBulleted /></button>
        <button onClick={() => handleBlockClick('ordered-list-item')}><FormatListNumbered /></button>
        <button onClick={() => handleInlineClick('link')}><Link /></button>
      </div>
      <Editor 
      editorState={editorState} 
      handleKeyCommand={handleKeyCommand}
      onChange={setEditorState} />
    </div>
  )
}

export default CustomEditor
