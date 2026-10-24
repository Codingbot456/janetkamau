// seo/All/index.web.js
import React from 'react';
// Using react-helmet-async for now. When you move to Expo Router static rendering,
// replace the line below with: import Head from 'expo-router/head';
import { Helmet as Head } from 'react-helmet-async';

const SITE_NAME = 'MtaaniMall';
const SITE_URL = (
    process.env.EXPO_PUBLIC_WEB_BASE_URL || 'https://www.mtaanimall.com'
).replace(/\/$/, '');

const CURRENCY = 'KES'; // must be the uppercase ISO code
const DEFAULT_IMAGE = `${SITE_URL}/images/mtaanimall-og-image.jpg`;
const LOGO_URL = `${SITE_URL}/images/mtaanimall-logo.png`;
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

// Only list profiles that really exist.
const SOCIAL_PROFILES = [
    'https://twitter.com/mtaanimall',
    'https://facebook.com/mtaanimall',
    'https://instagram.com/mtaanimall',
    'https://linkedin.com/company/mtaanimall',
];

// Set to true only when /search?q= really works on the site.
const SEARCH_ENABLED = false;

// Turns HTML descriptions into plain text (works in the browser and during static builds).
const cleanText = (text = '') =>
    String(text || '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\s+/g, ' ')
        .trim();

// Google shows about 155 characters, so shorten longer descriptions.
const truncate = (text, max = 155) =>
    text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;

// Turns a date from the server into the standard date format Google expects.
// Returns undefined when the date is missing or unreadable, so nothing wrong is sent.
const toIsoDate = (value) => {
    if (!value) return undefined;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
};

/*
  productData (only for product pages) looks like:
  {
    name, description, images: ['https://...'], price, inStock (true/false),
    brand, sku, category
  }
  articleData (only for blog post pages, together with isArticlePage) looks like:
  {
    headline, datePublished, dateModified (optional),
    authorName, authorUrl (optional)
  }
  serviceData (only for service pages, together with isServicePage) looks like:
  {
    name, description, images: ['https://...'],
    providerName, providerUrl (optional),
    category, address, areaServed (optional, e.g. 'Nairobi'),
    ratingValue, reviewCount,   // only pass these when real reviews exist
    price, priceCurrency, priceRange,   // optional
    availableLanguage,          // optional, e.g. ['English', 'Swahili']
    serviceType                 // optional, e.g. 'Barber', 'Salon'
  }
  breadcrumbs (optional) looks like: [{ name: 'Gas & Cooking', url: 'https://...' }, ...]
  Only include breadcrumb items that have a real address.
*/
const SEOHead = ({
    title = 'MtaaniMall - Online Marketplace in Kenya',
    description = 'Shop products, book services like barbers and salons, and hire freelancers on MtaaniMall. Pay with M-Pesa.',
    image = null,
    imageAlt = 'MtaaniMall online marketplace',
    url = null,
    type = 'website',
    products = [],
    totalProducts = 0,
    isHomePage = false,
    isAboutPage = false,
    isProductPage = false,
    productData = null,
    isArticlePage = false,
    articleData = null,
    isServicePage = false,
    serviceData = null,
    breadcrumbs = [],
    noIndex = false,
}) => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const canonicalUrl = url || (isAboutPage ? `${SITE_URL}/about` : SITE_URL);
    const metaDescription = truncate(cleanText(description));

    const productImages = (productData?.images || []).filter(Boolean);
    const serviceImages = (serviceData?.images || []).filter(Boolean);
    const ogImage = image || productImages[0] || serviceImages[0] || DEFAULT_IMAGE;
    const isDefaultImage = ogImage === DEFAULT_IMAGE;

    const priceNumber = Number(productData?.price);
    const hasValidPrice = Number.isFinite(priceNumber) && priceNumber > 0;
    const showProduct = isProductPage && !!productData?.name;
    const showArticle = isArticlePage && !!articleData?.headline;
    const showService = isServicePage && !!serviceData?.name;

    const publishedIso = showArticle ? toIsoDate(articleData.datePublished) : undefined;
    const modifiedIso = showArticle
        ? toIsoDate(articleData.dateModified) || publishedIso
        : undefined;

    // ---------- Structured data (one @graph, shared @id references) ----------
    const organization = {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: LOGO_URL,
        sameAs: SOCIAL_PROFILES,
        areaServed: 'KE',
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'support@mtaanimall.com',
            contactType: 'customer support',
            availableLanguage: ['English', 'Swahili'],
        },
    };

    const pageType = isAboutPage
        ? 'AboutPage'
        : showProduct
        ? 'ItemPage'
        : showService
        ? 'ItemPage'
        : showArticle
        ? 'WebPage'
        : isHomePage
        ? 'WebPage'
        : 'CollectionPage';

    const page = {
        '@type': pageType,
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: fullTitle,
        description: metaDescription,
        isPartOf: { '@id': SITE_ID },
        about: { '@id': ORG_ID },
    };

    const graph = [organization, page];

    if (showProduct) {
        // No rating or review data on purpose: only add it when you have real reviews.
        const productNode = {
            '@type': 'Product',
            '@id': `${canonicalUrl}#product`,
            name: productData.name,
            description: truncate(cleanText(productData.description) || productData.name, 1000),
            image: productImages.length > 0 ? productImages : undefined,
            sku: productData.sku ? String(productData.sku) : undefined,
            category: productData.category || undefined,
            brand: productData.brand
                ? { '@type': 'Brand', name: productData.brand }
                : undefined,
            url: canonicalUrl,
        };

        if (hasValidPrice) {
            productNode.offers = {
                '@type': 'Offer',
                url: canonicalUrl,
                priceCurrency: CURRENCY,
                price: priceNumber.toFixed(2),
                availability:
                    productData.inStock === true
                        ? 'https://schema.org/InStock'
                        : productData.inStock === false
                        ? 'https://schema.org/OutOfStock'
                        : undefined,
            };
        }

        page.mainEntity = { '@id': productNode['@id'] };
        graph.push(productNode);
    } else if (showService) {
        // Service pages (barbers, salons, repairs, freelancers, etc.).
        // Rating and review data are only added when they are real.
        const ratingValue = Number(serviceData.ratingValue);
        const reviewCount = Number(serviceData.reviewCount);
        const hasRealRating =
            Number.isFinite(ratingValue) &&
            ratingValue > 0 &&
            Number.isFinite(reviewCount) &&
            reviewCount > 0;

        const servicePrice = Number(serviceData.price);
        const hasServicePrice = Number.isFinite(servicePrice) && servicePrice > 0;

        const serviceNode = {
            '@type': 'Service',
            '@id': `${canonicalUrl}#service`,
            name: serviceData.name,
            description: truncate(cleanText(serviceData.description) || serviceData.name, 1000),
            image: serviceImages.length > 0 ? serviceImages : undefined,
            serviceType: serviceData.serviceType || serviceData.category || undefined,
            category: serviceData.category || undefined,
            url: canonicalUrl,
            provider: serviceData.providerName
                ? {
                      '@type': 'Organization',
                      name: serviceData.providerName,
                      url: serviceData.providerUrl || undefined,
                  }
                : { '@id': ORG_ID },
            areaServed: serviceData.areaServed
                ? {
                      '@type': 'Place',
                      name: serviceData.areaServed,
                  }
                : 'KE',
            availableChannel: {
                '@type': 'ServiceChannel',
                serviceUrl: canonicalUrl,
                availableLanguage: serviceData.availableLanguage || ['English', 'Swahili'],
            },
        };

        if (serviceData.address) {
            serviceNode.location = {
                '@type': 'Place',
                name: serviceData.address,
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: serviceData.address,
                    addressCountry: 'KE',
                },
            };
        }

        if (hasServicePrice) {
            serviceNode.offers = {
                '@type': 'Offer',
                url: canonicalUrl,
                priceCurrency: serviceData.priceCurrency || CURRENCY,
                price: servicePrice.toFixed(2),
            };
        } else if (serviceData.priceRange) {
            serviceNode.offers = {
                '@type': 'Offer',
                url: canonicalUrl,
                priceCurrency: serviceData.priceCurrency || CURRENCY,
                priceSpecification: {
                    '@type': 'PriceSpecification',
                    priceCurrency: serviceData.priceCurrency || CURRENCY,
                    description: serviceData.priceRange,
                },
            };
        }

        if (hasRealRating) {
            serviceNode.aggregateRating = {
                '@type': 'AggregateRating',
                ratingValue: ratingValue.toFixed(1),
                reviewCount: Math.round(reviewCount),
                bestRating: 5,
                worstRating: 1,
            };
        }

        page.mainEntity = { '@id': serviceNode['@id'] };
        graph.push(serviceNode);
    } else if (showArticle) {
        // Blog post. The author is the shop that wrote it, so it is described as an organization.
        const articleNode = {
            '@type': 'BlogPosting',
            '@id': `${canonicalUrl}#article`,
            headline: truncate(cleanText(articleData.headline), 110),
            description: metaDescription,
            image: [ogImage],
            datePublished: publishedIso,
            dateModified: modifiedIso,
            author: articleData.authorName
                ? {
                      '@type': 'Organization',
                      name: articleData.authorName,
                      url: articleData.authorUrl || undefined,
                  }
                : undefined,
            publisher: { '@id': ORG_ID },
            mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
            url: canonicalUrl,
        };

        page.mainEntity = { '@id': articleNode['@id'] };
        graph.push(articleNode);
    } else if (!isAboutPage && products.length > 0) {
        // List pages: keep it light. Full Product markup belongs on each product's own page.
        // Note: these addresses assume supermarket products (/product/). If you use this
        // on food, water, pharmacy or gas lists, the address needs to change per department.
        page.mainEntity = {
            '@type': 'ItemList',
            numberOfItems: totalProducts || products.length,
            itemListElement: products.slice(0, 10).map((product, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `${SITE_URL}/product/${product.id || product._id}`,
                name: product.name,
            })),
        };
    }

    const validCrumbs = (breadcrumbs || []).filter((c) => c?.name && c?.url);
    if (validCrumbs.length > 0) {
        const crumbs = [
            { name: 'Home', url: SITE_URL },
            ...validCrumbs,
            {
                name:
                    productData?.name ||
                    serviceData?.name ||
                    articleData?.headline ||
                    title,
                url: canonicalUrl,
            },
        ];
        graph.push({
            '@type': 'BreadcrumbList',
            itemListElement: crumbs.map((crumb, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: crumb.name,
                item: crumb.url,
            })),
        });
    }

    // WebSite node belongs on the homepage only.
    if (isHomePage) {
        const website = {
            '@type': 'WebSite',
            '@id': SITE_ID,
            url: SITE_URL,
            name: SITE_NAME,
            publisher: { '@id': ORG_ID },
        };
        if (SEARCH_ENABLED) {
            website.potentialAction = {
                '@type': 'SearchAction',
                target: `${SITE_URL}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
            };
        }
        graph.push(website);
    }

    const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:alt" content={imageAlt} />
            {isDefaultImage && <meta property="og:image:width" content="1200" />}
            {isDefaultImage && <meta property="og:image:height" content="630" />}
            <meta property="og:url" content={canonicalUrl} />
            <meta
                property="og:type"
                content={
                    showProduct
                        ? 'og:product'
                        : showService
                        ? 'website'
                        : showArticle
                        ? 'article'
                        : type
                }
            />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_US" />
            {showProduct && hasValidPrice && (
                <meta property="product:price:amount" content={priceNumber.toFixed(2)} />
            )}
            {showProduct && hasValidPrice && (
                <meta property="product:price:currency" content={CURRENCY} />
            )}
            {showArticle && publishedIso && (
                <meta property="article:published_time" content={publishedIso} />
            )}
            {showArticle && modifiedIso && (
                <meta property="article:modified_time" content={modifiedIso} />
            )}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:image:alt" content={imageAlt} />
            <meta name="twitter:site" content="@mtaanimall" />

            <script type="application/ld+json">{jsonLd}</script>
        </Head>
    );
};

export default SEOHead;