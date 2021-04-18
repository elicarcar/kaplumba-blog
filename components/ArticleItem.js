import React from 'react';

const ArticleItem = ({ articles }) => {
  return (
    <div>
      {articles.map((article) => {
        return (
          <div>
            <h2>{article.header}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleItem;
