import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Comment,
  Form,
  Button,
  Header,
  Message,
  Icon,
  Modal,
} from 'semantic-ui-react';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import useSWR from 'swr';
import Cookie from 'js-cookie';
import moment from 'moment';

const Makale = ({ user = {} }) => {
  const token = Cookie.get('token');
  const router = useRouter();
  const { _id } = router.query;
  const [commentContent, setCommentContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [commentEditing, setCommentEditing] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [open, setOpen] = useState(false);

  //const formattedCommentDate = (date) => moment(date).startOf('day');

  const handleCommentPost = async (e) => {
    if (!commentContent.length) {
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${baseUrl}/api/comment`,
        { body: commentContent },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          params: { aid: _id },
        }
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
    if (!token) {
      return;
    }
    try {
      await axios.delete(`${baseUrl}/api/comment`, {
        params: { cId: id, aId: data._id },
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditClick(e, comment) {
    setCommentEditing(true);
    setCommentContent(comment.body);
    setCommentId(comment._id);
  }

  async function handleEditPost() {
    try {
      setLoading(true);
      await axios.put(
        `${baseUrl}/api/comment`,
        { body: commentContent },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          params: { aid: _id, cId: commentId },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setCommentContent('');
      setLoading(false);
      setCommentEditing(false);
    }
  }

  async function handleCancelEditPost() {
    setCommentContent('');
    setCommentEditing(false);
  }

  function isAuthorsComment(comment) {
    return comment.author._id == user._id;
  }

  if (error) return <Message error={true}>{error.response.data}</Message>;
  if (!data) return <Message>Yukleniyor</Message>;

  return (
    <article className="container">
      <section className="d-flex justify-between">
        <h1>{data.header}</h1>
        <div>
          <p className="ma-0 secondary">{data.author.username}</p>
          <p className="ma-0 secondary">
            {moment(data.createdAt).format('MM/DD/YYYY')}
          </p>
        </div>
      </section>

      <section dangerouslySetInnerHTML={articleContent()} />

      <Comment.Group>
        <Header as="h3" dividing>
          Konuşmalar
          {data.comments.length && <span> {data.comments.length} </span>}
        </Header>
        {!data.comments.length ? (
          <p>Bu yazı hakkında daha bir konuşma başlatılmamış. </p>
        ) : (
          data.comments.map((comment) => {
            return (
              <Comment key={comment._id}>
                <Comment.Content>
                  <div className="d-flex justify-between">
                    <section>
                      <Comment.Author as="a">
                        {comment.author.username}
                      </Comment.Author>
                      <Comment.Metadata>
                        {moment(comment.createdAt).fromNow()}
                      </Comment.Metadata>
                    </section>
                    <section>
                      {isAuthorsComment(comment) && (
                        <Comment.Actions>
                          <Comment.Action
                            onClick={(e) => handleEditClick(e, comment)}
                          >
                            <Icon size="large" name="edit" />
                          </Comment.Action>
                          <Comment.Action
                            onClick={() => handleDeleteClick(comment._id)}
                          >
                            <Icon
                              size="large"
                              color="red"
                              name="trash alternate"
                            />
                          </Comment.Action>
                        </Comment.Actions>
                      )}
                    </section>
                  </div>
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
          {commentEditing ? (
            <Button.Group compact>
              <Button
                loading={loading}
                content="Yorumunu duzenle"
                labelPosition="left"
                icon="edit"
                color="purple"
                onClick={(e) => handleEditPost(e)}
              />
              <Button
                content="Iptal"
                labelPosition="left"
                icon="cancel"
                color="yellow"
                onClick={(e) => handleCancelEditPost(e)}
              />
            </Button.Group>
          ) : (
            <Button
              loading={loading}
              content="Fikir Belirt"
              labelPosition="left"
              icon="edit"
              color="teal"
              onClick={(e) => handleCommentPost(e)}
            />
          )}
        </Form>
      </Comment.Group>
    </article>
  );
};

export default Makale;
