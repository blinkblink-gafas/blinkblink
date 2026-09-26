export interface LocaleStrings {
  common: {
    brandName: string;
    addToCart: string;
    buyNow: string;
    viewAll: string;
    shopNow: string;
    outOfStock: string;
    noImage: string;
    addToWishlist: string;
  };
  navbar: {
    links: {
      sunglasses: string;
      eyeglasses: string;
      collections: string;
      about: string;
    };
    tagline: string;
    aria: {
      mainNavigation: string;
      openMenu: string;
      closeMenu: string;
      home: string;
      search: string;
      account: string;
      cartWithCount: string;
    };
  };
  hero: {
    eyebrow: string;
    heading: {
      before: string;
      emphasis: string;
      after: string;
    };
    subtext: string;
    cta: string;
    sticker: {
      lineOne: string;
      lineTwo: string;
    };
    imageAlt: string;
  };
  trustBadges: {
    trendyDesigns: string;
    uvProtection: string;
    premiumQuality: string;
    fastDelivery: string;
  };
  shopByCategory: {
    heading: string;
    viewAll: string;
    wishlist: {
      add: string;
      remove: string;
    };
    categories: {
      sunglasses: { name: string; description: string };
      eyeglasses: { name: string; description: string };
      sports: { name: string; description: string };
    };
  };
  productBadges: {
    New: string;
    Bestseller: string;
    Sale: string;
    Limited: string;
  };
  trending: {
    heading: string;
  };
  categoryPage: {
    backToHome: string;
    emptyHeading: string;
    emptyMessage: string;
    resultsLabel: string;
  };
  productPage: {
    breadcrumbBack: string;
    colorLabel: string;
    quantityLabel: string;
    reviewsLabel: string;
    notFoundHeading: string;
    notFoundMessage: string;
    backToShop: string;
  };
  pages: {
    home: { title: string; description: string };
    about: { title: string; placeholder: string };
    category: { title: string };
    product: { title: string; notFoundTitle: string };
  };
}
