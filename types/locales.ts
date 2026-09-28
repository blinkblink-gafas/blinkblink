import type { SortOption } from "@/types/filters";
import type { ProductCategory } from "@/types/product";

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
    removeFromWishlist: string;
    close: string;
    remove: string;
  };
  navbar: {
    links: {
      sunglasses: string;
      eyeglasses: string;
      sports: string;
      shopAll: string;
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
      wishlistWithCount: string;
    };
    search: {
      placeholder: string;
      submit: string;
      close: string;
    };
  };
  /** Display names for every category slug, including the "all" listing. */
  categories: Record<"all" | ProductCategory, string>;
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
    emptyHeading: string;
    emptyMessage: string;
    resultsLabel: string;
    resultsLabelOne: string;
    browseAll: string;
  };
  productPage: {
    breadcrumbBack: string;
    colorLabel: string;
    quantityLabel: string;
    reviewsLabel: string;
    decreaseQuantity: string;
    increaseQuantity: string;
    relatedHeading: string;
  };
  filters: {
    heading: string;
    sortLabel: string;
    sort: Record<SortOption, string>;
    colorLabel: string;
    priceLabel: string;
    /** Keyed by the price bucket's URL value (see PRICE_BUCKETS in lib/filters.ts). */
    price: Record<string, string>;
    anyPrice: string;
    clear: string;
    noResultsHeading: string;
    noResultsMessage: string;
  };
  cart: {
    heading: string;
    itemCount: string;
    itemCountOne: string;
    emptyHeading: string;
    emptyMessage: string;
    continueShopping: string;
    subtotal: string;
    shippingNote: string;
    checkout: string;
    viewCart: string;
    closeDrawer: string;
    removeItem: string;
    decreaseItem: string;
    increaseItem: string;
    colorLabel: string;
  };
  checkout: {
    heading: string;
    contactHeading: string;
    shippingHeading: string;
    fields: {
      fullName: string;
      email: string;
      address: string;
      city: string;
      postalCode: string;
      country: string;
    };
    required: string;
    invalidEmail: string;
    summaryHeading: string;
    placeOrder: string;
    paymentNote: string;
    emptyHeading: string;
    emptyMessage: string;
  };
  orderSuccess: {
    heading: string;
    message: string;
    continue: string;
  };
  search: {
    heading: string;
    resultsHeading: string;
    prompt: string;
    loading: string;
    error: string;
    noResultsHeading: string;
    noResultsMessage: string;
  };
  wishlist: {
    heading: string;
    emptyHeading: string;
    emptyMessage: string;
    browse: string;
    loading: string;
  };
  account: {
    heading: string;
    message: string;
    wishlistLink: string;
  };
  footer: {
    tagline: string;
    shopHeading: string;
    helpHeading: string;
    links: {
      about: string;
      wishlist: string;
      cart: string;
      account: string;
    };
    copyright: string;
  };
  about: {
    heading: string;
    intro: string;
    values: Array<{ title: string; body: string }>;
    cta: string;
  };
  notFound: {
    heading: string;
    message: string;
    back: string;
  };
  pages: {
    home: { title: string; description: string };
    about: { title: string; description: string };
    category: { title: string };
    product: { title: string };
    cart: { title: string };
    checkout: { title: string };
    orderSuccess: { title: string };
    search: { title: string };
    wishlist: { title: string };
    account: { title: string };
    notFound: { title: string };
  };
}
