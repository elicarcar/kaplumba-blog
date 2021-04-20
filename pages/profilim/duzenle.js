import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { convertFromHTML, convertToHTML } from 'draft-convert';
import { Container, Button, Input, Header, Message } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { parseCookies } from 'nookies';
import Cookie from 'js-cookie';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const Edit = ({ article }) => {
  const editorState = EditorState.createWithContent(
    convertFromHTML(article.content)
  );
  const [editor, setEditor] = useState(() => editorState);
  const [contentState, setContentState] = useState();
  const [headerContent, setHeader] = useState(article.header);
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

      await axios.put(
        `${baseUrl}/api/article`,
        {
          header: headerContent,
          content: contentState,
        },
        {
          headers: {
            Authorization: token,
          },
          params: {
            _id: article._id,
          },
        }
      );
      setSucess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setHeaderError(false);
    }
  };

  return (
    <>
      <Container>
        <Header as="h2">Makaleni Duzenle</Header>
        {success && (
          <Message
            success={success}
            content="Makeleniz basarili bir sekilde duzenlendi"
          />
        )}

        <Input
          value={headerContent}
          loading={loading}
          name="Başlık"
          onChange={(e) => onHeaderChange(e)}
          fluid
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
          }}
        />
        <Button color="teal" type="button" onClick={() => publishDocs()}>
          Yayınla
        </Button>
      </Container>
    </>
  );
};

Edit.getInitialProps = async (ctx) => {
  const { token } = await parseCookies(ctx);
  try {
    const { _id } = ctx.query;
    const payload = {
      headers: { Authorization: token },
      params: { _id },
    };
    const res = await axios.get(`${baseUrl}/api/article`, payload);

    return { article: res.data };
  } catch (error) {
    console.log(error);
  }
};

export default Edit;
