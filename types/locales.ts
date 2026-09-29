import type { SortOption } from "@/types/filters";
import type { FrameShape, ProductCategory, ProductGender } from "@/types/product";

interface TitledText {
  title: string;
  subtitle: string;
}

export interface LocaleStrings {
  common: {
    brandName: string;
    addToCart: string;
    buyNow: string;
    viewAll: string;
    outOfStock: string;
    noImage: string;
    addToWishlist: string;
    removeFromWishlist: string;
    close: string;
    remove: string;
    discount: string;
    home: string;
  };
  navbar: {
    links: {
      sunglasses: string;
      eyeglasses: string;
      sports: string;
      shopAll: string;
      about: string;
    };
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
    heading: { lineOne: string; lineTwo: string };
    subtext: string;
    cta: string;
    sticker: { lineOne: string; lineTwo: string };
  };
  trustBadges: {
    trendyDesigns: TitledText;
    uvProtection: TitledText;
    premiumQuality: TitledText;
    freeDelivery: TitledText;
  };
  shopByCategory: {
    heading: string;
    viewAll: string;
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
  bestSellers: {
    heading: string;
  };
  promo: {
    heading: { lineOne: string; lineTwo: string };
    cta: string;
  };
  newsletter: {
    heading: string;
    body: string;
    emailLabel: string;
    placeholder: string;
    submit: string;
    success: string;
    invalidEmail: string;
  };
  categoryPage: {
    emptyHeading: string;
    emptyMessage: string;
    resultsLabel: string;
    resultsLabelOne: string;
    browseAll: string;
    breadcrumb: string;
    subtitles: Record<"all" | ProductCategory, string>;
  };
  shapes: Record<"all" | FrameShape, string>;
  filters: {
    heading: string;
    sortLabel: string;
    sort: Record<SortOption, string>;
    shapeTabs: string;
    price: string;
    minPrice: string;
    maxPrice: string;
    frameColor: string;
    lensColor: string;
    frameShape: string;
    gender: string;
    genders: Record<ProductGender, string>;
    availability: string;
    inStock: string;
    clear: string;
    open: string;
    openWithCount: string;
    close: string;
    showResults: string;
    noResultsHeading: string;
    noResultsMessage: string;
  };
  pagination: {
    label: string;
    previous: string;
    next: string;
    page: string;
  };
  productPage: {
    frameColor: string;
    quantityLabel: string;
    reviewsLabel: string;
    decreaseQuantity: string;
    increaseQuantity: string;
    relatedHeading: string;
    youSave: string;
    showImage: string;
    tabs: { details: string; shipping: string; returns: string };
    shippingText: string;
    returnsText: string;
    trust: {
      freeDelivery: TitledText;
      easyReturns: TitledText;
      secureCheckout: TitledText;
    };
  };
  brighterSide: {
    heading: { lineOne: string; lineTwo: string; lineThree: string };
    cta: string;
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
    freeShippingProgress: string;
    freeShippingUnlocked: string;
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
    companyHeading: string;
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
