import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Comment,
  Form,
  Button,
  Header,
  Message,
  Icon,
} from 'semantic-ui-react';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import useSWR from 'swr';
import Cookie from 'js-cookie';
import moment from 'moment';

const Makale = ({ user }) => {
  const token = Cookie.get('token');
  const router = useRouter();
  const { _id } = router.query;
  const [commentContent, setCommentContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCommentPost = async (e) => {
    if (!commentContent.length) {
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${baseUrl}/api/comment`,
        { body: commentContent },
        { headers: { Authorization: token }, params: { aid: _id } }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setCommentContent('');
      setLoading(false);
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

  function articleContent() {
    return { __html: data.content };
  }

  function handleTextareChange(e) {
    setCommentContent(e.target.value);
  }

  async function handleDeleteClick(id) {
    try {
      await axios.delete(`${baseUrl}/api/comment`, {
        params: { cId: id, aId: data._id },
      });
    } catch (error) {
      console.log(error);
    }
  }

  function isAuthorsComment(comment) {
    return comment.author._id == user._id;
  }

  if (data) {
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
          {data.comments.length && <span> {data.comments.length} </span>}
        </Header>
        {!data.comments.length ? (
          <p>Bu yazı hakkında daha bir konuşma başlatılmamış. </p>
        ) : (
          data.comments.map((comment) => {
            return (
              <Comment>
                <Comment.Content>
                  <Comment.Author as="a">
                    {comment.author.username}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>Today at 5:42PM</div>
                    {isAuthorsComment(comment) && (
                      <Comment.Actions>
                        <Comment.Action onClick={() => handleEditClick()}>
                          <Icon name="edit" />
                        </Comment.Action>
                        <Comment.Action
                          onClick={() => handleDeleteClick(comment._id)}
                        >
                          <Icon color="red" name="trash alternate" />
                        </Comment.Action>
                      </Comment.Actions>
                    )}
                  </Comment.Metadata>
                  <Comment.Text>{comment.body}</Comment.Text>
                </Comment.Content>
              </Comment>
            );
          })
        )}

        <Form reply>
          <Form.TextArea
            value={commentContent}
            onChange={(e) => handleTextareChange(e)}
          />
          <Button
            loading={loading}
            content="Fikir Belirt"
            labelPosition="left"
            icon="edit"
            color="teal"
            onClick={(e) => handleCommentPost(e)}
          />
        </Form>
      </Comment.Group>
    </article>
  );
};

export default Makale;
