import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Comment, Form, Button, Header, Message } from 'semantic-ui-react';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import useSWR from 'swr';
import Cookie from 'js-cookie';
import moment from 'moment';

const Makale = () => {
  const token = Cookie.get('token');
  const router = useRouter();
  const { _id } = router.query;
  const [commentContent, setCommentContent] = useState('');

  const handleCommentPost = async () => {
    if (!commentContent.length) {
      return;
    }

    try {
      await axios.post(
        `${baseUrl}/api/comment`,
        { body: commentContent },
        { headers: { Authorization: token }, params: { aid: _id } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetcher = (url) =>
    axios
      .get(url, {
        headers: { Authorization: token },
        params: { _id },
      })
      .then((res) => res.data);

  const { data, error } = useSWR(`${baseUrl}/api/article`, fetcher, {
    refreshInterval: 2000,
  });

  useEffect(() => {
    console.log('hell', data);
  }, []);

  function articleContent() {
    return { __html: data.content };
  }

  function handleTextareChange(e) {
    setCommentContent(e.target.value);
  }

  if (error) return <Message error={true}>{error.response.data}</Message>;
  if (!data) return <Message>Yukleniyor</Message>;

  return (
    <article className="container">
      <h1>{data.header}</h1>
      <section dangerouslySetInnerHTML={articleContent()} />

      <Comment.Group>
        <Header as="h3" dividing>
          Konusmalar
          {data.comments.length && <span>{data.comments.length}</span>}
        </Header>
        {!data.comments.length ? (
          <p>Bu yazi hakkinda daha bir konusma baslatilmamis. </p>
        ) : (
          data.comments.map((comment) => {
            return (
              <Comment>
                <Comment.Content>
                  <Comment.Author as="a">{comment.author}</Comment.Author>
                  <Comment.Metadata>
                    <div>Today at 5:42PM</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.body}</Comment.Text>
                </Comment.Content>
              </Comment>
            );
          })
        )}

        <Form reply>
          <Form.TextArea onChange={(e) => handleTextareChange(e)} />
          <Button
            content="Fikir Belirt"
            labelPosition="left"
            icon="edit"
            color="teal"
            onClick={() => handleCommentPost()}
          />
        </Form>
      </Comment.Group>
    </article>
  );
};

export default Makale;
