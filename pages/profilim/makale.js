import React, { useState, useEffect } from 'react';
import { EditorState, RichUtils, Button } from 'draft-js';
import { Container } from 'semantic-ui-react';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const Makale = () => {
  const [editor, setEditor] = useState(() => EditorState.createEmpty());
  const contentState = editor.getCurrentContent();
  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditor(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  useEffect(() => {
    console.log(editor);
    console.log(contentState);
  }, [editor]);

  return (
    <Container>
      <Editor
        editorState={editor}
        onEditorStateChange={setEditor}
        placeholder="Tell a story..."
        spellCheck={true}
        handleKeyCommand={handleKeyCommand}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
    </Container>
  );
};

export default Makale;
