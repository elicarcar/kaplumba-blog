import React, { useState, useEffect } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import Cookie from 'js-cookie';
import moment from 'moment';

const Yazi = ({ article, user }) => {
  const formattedDate = moment(article.created_at).format('MM/DD/YYYY');
  const shortContent = article.content.substring(0, 500) + '...';
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState(user.readLists);

  function articleContent() {
    return { __html: shortContent };
  }

  function isInList() {
    return userList.find((a) => a._id == article._id);
  }

  function isUsers() {
    return user.articles.filter((a) => a._id == article._id).length;
  }

  useEffect(() => {
    isInList();
  }, [userList.length]);

  useEffect(() => {
    isUsers();
  }, []);

  async function addToReadingList() {
    const token = await Cookie.get('token');
    if (!token) {
      return;
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${baseUrl}/api/list`,
        { articleId: article._id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const user = await res.data;

      setUserList(user);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <Link href="#">
      <Card className="article pointer" fluid>
        {!isUsers() && (
          <Card.Content extra>
            <span className="bookmark" onClick={() => addToReadingList()}>
              <Icon
                loading={loading}
                color={isInList() ? 'red' : 'teal'}
                name="bookmark"
              />
              {isInList() ? 'Listemden cikar' : 'Listeme ekle'}
            </span>
          </Card.Content>
        )}

        <Card.Content>
          <Card.Description className="d-flex justify-between ">
            <Card.Meta>{article.author.username}</Card.Meta>
            <Card.Meta>{formattedDate}</Card.Meta>
          </Card.Description>

          <Card.Header>{article.header}</Card.Header>
          <Card.Description dangerouslySetInnerHTML={articleContent()} />
        </Card.Content>
      </Card>
    </Link>
  );
};

export default Yazi;
