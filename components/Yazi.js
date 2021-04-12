import React from 'react';
import moment from 'moment';
import { Card, Icon } from 'semantic-ui-react';

const Yazi = ({ article, user }) => {
  const formattedDate = moment(article.created_at).format('MM/DD/YYYY');
  const shortContent = article.content.substring(0, 500) + '...';

  function articleContent() {
    return { __html: shortContent };
  }

  function addToReadingList() {
    console.log('add');
  }

  const isInList = user.readLists.find((a) => a._id == article._id);

  return (
    <Card className="article pointer" fluid>
      <Card.Content extra>
        <span class="bookmark" onClick={addToReadingList}>
          <Icon color={isInList ? 'red' : 'teal'} name="bookmark" />
          {isInList ? 'Listemden cikar' : 'Listeme ekle'}
        </span>
      </Card.Content>
      <Card.Content>
        <Card.Description className="d-flex justify-between ">
          <Card.Meta>{article.author.username}</Card.Meta>
          <Card.Meta>{formattedDate}</Card.Meta>
        </Card.Description>

        <Card.Header>{article.header}</Card.Header>
        <Card.Description dangerouslySetInnerHTML={articleContent()} />
      </Card.Content>
    </Card>
  );
};

export default Yazi;
