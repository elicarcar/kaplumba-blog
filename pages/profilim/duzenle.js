import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { convertFromHTML } from 'draft-convert';
import { Container, Button, Input, Header, Message } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import Cookie from 'js-cookie';

const Edit = () => {
  const [editorState, setEditorState] = EditorState.createWithContent(
    convertFromHTML(html)
  );
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

Edit.getInitialProps = async (ctx) => {};

export default Edit;
