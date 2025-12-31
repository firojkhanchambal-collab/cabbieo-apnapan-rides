import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  schema?: object;
}

const SEOHead = ({
  title = "Cabbieo - Book Cab, Bike, E-Rickshaw & 24/7 Ambulance Service | Best Ride Booking Near You",
  description = "Book affordable Bike, E-Rickshaw, Outstation Cab & Emergency Ambulance services with Cabbieo. 24/7 availability, GPS tracking, trained drivers. Instant booking for all your travel needs.",
  keywords = "cab booking near me, online cab booking service, emergency ambulance service, ambulance booking near me, 24/7 ambulance service, bike taxi service, e-rickshaw booking, outstation cab booking, affordable cab service, local taxi booking",
  canonicalUrl = "https://cabbieo.com",
  ogImage = "/og-image.jpg",
  ogType = "website",
  schema
}: SEOHeadProps) => {
  const defaultSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://cabbieo.com/#business",
        "name": "Cabbieo",
        "description": description,
        "url": canonicalUrl,
        "telephone": "+91-9876543210",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        },
        "sameAs": [
          "https://facebook.com/cabbieo",
          "https://twitter.com/cabbieo",
          "https://instagram.com/cabbieo"
        ]
      },
      {
        "@type": "Service",
        "@id": "https://cabbieo.com/#ride-service",
        "name": "Ride Booking Service",
        "provider": {
          "@id": "https://cabbieo.com/#business"
        },
        "serviceType": ["Taxi Service", "Bike Taxi", "E-Rickshaw", "Outstation Cab"],
        "areaServed": {
          "@type": "Country",
          "name": "India"
        }
      },
      {
        "@type": "EmergencyService",
        "@id": "https://cabbieo.com/#ambulance-service",
        "name": "Cabbieo Ambulance Service",
        "provider": {
          "@id": "https://cabbieo.com/#business"
        },
        "serviceType": ["Basic Life Support Ambulance", "Medium Life Support Ambulance", "Advanced Life Support Ambulance"],
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": "https://cabbieo.com/ambulance",
          "servicePhone": "+91-9876543210"
        },
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Cabbieo" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Cabbieo" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#f97316" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
