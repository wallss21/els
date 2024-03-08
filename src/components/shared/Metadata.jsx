import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, meta = [] }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <link rel="canonical" href="http://mysite.com/example" />
      {meta.map((m) => {
        return <meta name={m.name} content={m.content} />;
      })}
    </Helmet>
  );
};

export default SEO;
