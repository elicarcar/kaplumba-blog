import React, { useState, useEffect } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import { Container, Button, Input, Header, Message } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
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
        `${baseUrl}/api/article`,
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
      console.log('hello after success');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container>
        <Header as="h2">Makaleni Olustur</Header>
        {success && (
          <Message
            success={success}
            content="Makeleniz basarili bir sekilde yayinlandi"
          />
        )}

        <Input
          loading={loading}
          name="Baslik"
          onChange={(e) => onHeaderChange(e)}
        />
        <Editor
          loading={loading}
          editorState={editor}
          onEditorStateChange={setEditor}
          placeholder="Tell a story..."
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
          }}
        />
        <Button color="teal" type="button" onClick={() => publishDocs()}>
          Yayinla
        </Button>
      </Container>
    </>
  );
};

export default Makale;
