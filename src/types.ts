/**
 * Core product domain types based on the comprehensive MongoDB schema.
 */

export interface MultilingualString {
  en?: string;
  bn?: string;
}

export interface Category {
  uid: string;
  enName: string;
  bnName: string;
  type?: string;
}

export interface ProductImage {
  name: string;
  url: string;
}

export interface ProductAttributeValue {
  enName: string;
  bnName: string;
}

export interface ProductAttribute {
  uid: string;
  enLabel: string;
  bnLabel: string;
  inputType: 'TEXT-FIELD' | 'TEXT-AREA' | 'TEXT-EDITOR' | 'DATE' | 'DATE-TIME' | 'YES-NO' | 'MULTI-SELECT' | 'DROPDOWN' | 'PRICE' | 'IMAGE' | 'VISUAL-SWITCH' | 'TEXT-SWITCH';
  isRequired: boolean;
  isSearchAble: boolean;
  isFilterAble: boolean;
  values: ProductAttributeValue[];
  queryName?: string;
}

export interface ProductVariant {
  uid: string;
  colorFamily: string;
  size: string;
  mrpPrice: number;
  previousPrice?: number;
  quantity: number;
  holdQuantity: number;
  sellerSKU: string;
  ebsItemCode?: string;
  ebsCode?: string;
  posItemCode: string;
  isAvailable: boolean;
  images: ProductImage[];
  webImage?: ProductImage[];
  tabImage?: ProductImage[];
  mobileImage?: ProductImage[];
  checkSalableQuantity: boolean;
  maxOrderQuantityPerOrder: number;
  weight?: {
    value: number;
    unit: string;
  };
  packageDimension?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
}

export interface ProductSearchMeta {
  urlKey?: string;
  title: string;
  keyword: string;
  description: string;
  redirectUrl?: string;
  image?: ProductImage;
  embedding?: number[]; // Added for Vector Search
}

export interface Product {
  _id?: any;
  uid: string;
  enName: string;
  bnName: string;
  slug: string;
  videoUrl?: string;
  images: ProductImage[];
  category: Category;
  attributeSetUid?: string;
  parentCategories: Category[];
  productAttributes: ProductAttribute[];
  detailedDescriptions: ProductAttribute[];
  priceAndStocks: ProductAttribute[];
  serviceAndDeliveries: ProductAttribute[];
  deliveries: ProductAttribute[];
  displayReturnPolicy?: MultilingualString;
  displayWarrantyPolicy?: MultilingualString;
  variants: ProductVariant[];
  inventory: {
    source: 'IN_HOUSE' | 'THIRD_PARTY' | 'PLAZA_POS';
  };
  isInventoryStockCheck: boolean;
  searchMeta: ProductSearchMeta;
  tags: Category[];
  collections: Category[];
  isActive: boolean;
  documents: {
    type?: string;
    url: string;
    name: string;
  }[];
  searchSuggestionTag?: string;
  searchSuggestion?: {
    enTag: string;
    bnTag: string;
  };
  searchSynonym?: MultilingualString;
  inActiveNote?: string;
  createdBy?: {
    uid: string;
    name: string;
    userType: string;
  };
  updatedBy?: {
    uid: string;
    name: string;
    userType: string;
  };
  displayPriority: number;
  sortPriority: number;
  isSameDayDelivery: boolean;
  isMostLovedProduct: boolean;
  isPortableProduct: boolean;
  isFeaturedProduct: boolean;
  isInventoryStockSync: boolean;
  isSerachServiceSync: boolean;
  isFirstTimeInventorySync: boolean;
  firstTimeInventorySyncCounter: number;
  isExchangeOfferEnable: boolean;
  exchangeOfferUrl?: string;
  priceSyncAt?: string;
  initialStockSyncAt?: string;
  stockSyncAt?: string;
  stockSyncDateTime?: Date;
  gift?: {
    isGiftEnable: boolean;
    campaignName?: string;
    remarks?: string;
  };
  isWrappedWeddingGiftEnable: boolean;
  isEmiDisable: boolean;
  isPreBookEnable: boolean;
  isDiscountPercentageShowable: boolean;
  preBookOfficialLaunchTime?: Date;
  preBookExpectedDeliveryTime?: Date;
  isCashHandlingChargeEnable: boolean;
  cashHandlingCharge: number;
  isWeightBasedDeliveryCharge: boolean;
  selectedPlazaUid?: string;
  defaultShipmentTitle?: string;
  defaultShipmentCharge: number;
  defaultNotice?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * MCP Tool Input Schemas
 */

export interface SearchProductsInput {
  query: string;
  categoryUid?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
}

export interface GetProductDetailsInput {
  uid: string;
}

export interface CheckStockInput {
  uid: string;
}

export interface CompareProductsInput {
  uids: string[];
}
