import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BRAND_ASSETS, BRAND_NAME, BRAND_DESCRIPTION } from '@/lib/brand';

export default function SEO({
  title,
  description = BRAND_DESCRIPTION,
  url = '',
  image = BRAND_ASSETS.ogImage,
  type = 'website',
}) {
  const siteName = BRAND_NAME;
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const fullUrl = `https://lotsbi.com${url}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
