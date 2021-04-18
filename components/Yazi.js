import React, { useState, useEffect } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import Cookie from 'js-cookie';
import moment from 'moment';
import { useRouter } from 'next/router';

const Yazi = ({ article, user, isOnProfilePage = false }) => {
  const formattedDate = moment(article.created_at).format('MM/DD/YYYY');
  const shortContent = article?.content?.substring(0, 500) + '...';
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState(user?.readLists);
  const router = useRouter();

  function articleContent() {
    return { __html: shortContent };
  }

  function isInList() {
    return userList.find((a) => a._id == article._id);
  }

  function isUsers() {
    return user?.articles.filter((a) => a._id == article._id).length;
  }

  useEffect(() => {
    isInList();
  }, [userList.length]);

  useEffect(() => {
    isUsers();
  }, []);

  async function addToReadingList(e) {
    e.stopPropagation();
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

  async function handleDeleteArticle(e, id) {
    e.stopPropagation();
    try {
      setLoading(true);
      await axios.delete(`${baseUrl}/api/article`, { params: { _id: id } });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Link href={`/makale?_id=${article?._id}`}>
      <Card className="article pointer" fluid>
        {!isUsers() && (
          <Card.Content extra>
            <span className="bookmark" onClick={(e) => addToReadingList(e)}>
              <Icon
                loading={loading}
                color={isInList() ? 'red' : 'teal'}
                name="bookmark"
              />
              {isInList() ? 'Listemden çıkar' : 'Listeme ekle'}
            </span>
          </Card.Content>
        )}

        {isOnProfilePage && isUsers() ? (
          <Card.Content extra>
            <Link href="/profilim/duzenle">
              <Icon loading={loading} name="edit" />
            </Link>
            <span>
              <Icon
                loading={loading}
                name="delete"
                onClick={(e) => handleDeleteArticle(e, article?._id)}
                color="red"
              />
            </span>
          </Card.Content>
        ) : (
          ''
        )}

        <Card.Content>
          <Card.Description className="d-flex justify-between ">
            <Card.Meta>{article?.author?.username}</Card.Meta>
            <Card.Meta>{formattedDate}</Card.Meta>
          </Card.Description>

          <Card.Header>{article?.header}</Card.Header>
          <Card.Description dangerouslySetInnerHTML={articleContent()} />
        </Card.Content>
      </Card>
    </Link>
  );
};

export default Yazi;
