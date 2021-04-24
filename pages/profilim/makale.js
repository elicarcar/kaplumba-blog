import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { Container, Button, Input, Header, Message } from 'semantic-ui-react';
import axios from 'axios';
import Cookie from 'js-cookie';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const Makale = () => {
  const [editor, setEditor] = useState(() => EditorState.createEmpty());
  const [contentState, setContentState] = useState();
  const [headerContent, setHeader] = useState('');
  const [success, setSucess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [headerError, setHeaderError] = useState(false);

  const exportHTML = () => {
    setContentState(convertToHTML(editor.getCurrentContent()));
  };

  useEffect(() => {
    exportHTML();
  }, [editor]);

  function onHeaderChange(e) {
    setHeader(e.target.value);
  }

  const publishDocs = async () => {
    if (!headerContent.length || !contentState.length) {
      setHeaderError(true);
      return;
    }

    const token = await Cookie.get('token');
    if (!token) {
      return;
    }

    try {
      setLoading(true);
      await exportHTML();
      const payload = {
        header: headerContent,
        content: contentState,
      };

      await axios.post(
        `/api/article`,
        {
          ...payload,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setSucess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setHeader('');
      setHeaderError(false);
      setEditor(EditorState.createEmpty());
    }
  };

  return (
    <>
      <Container>
        <Header as="h2">Makaleni Oluştur</Header>
        {success && (
          <Message
            success={success}
            content="Makeleniz basarili bir sekilde yayinlandi"
          />
        )}

        <Input
          value={headerContent}
          loading={loading}
          name="Başlık"
          onChange={(e) => onHeaderChange(e)}
          fluid
          required
          placeholder="Bir başlık girin"
          error={headerError}
        />
        <Editor
          loading={loading}
          editorState={editor}
          onEditorStateChange={setEditor}
          placeholder="Bir şeyler anlat..."
          spellCheck={true}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,
              defaultSize: {
                height: 'auto',
                width: 'auto',
              },
            },
            previewImage: true,
          }}
        />
        <Button color="teal" type="button" onClick={() => publishDocs()}>
          Yayınla
        </Button>
      </Container>
    </>
  );
};

export default Makale;
