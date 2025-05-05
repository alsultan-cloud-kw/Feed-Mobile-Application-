export interface Banner {
  id: number;
  title: string;
  img: {
    formats: {
      large: { url: string };
      medium: { url: string };
      small: { url: string };
    };
  };
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  price: number;
  Category: string;
  Subcategory: string;
  primaryImage: Array<{
    formats: {
      large: { url: string };
      medium: { url: string };
      small: { url: string };
    };
  }>;
}

export interface Blog {
  id: number;
  Title: string;
  Category: string;
  Author: string;
  publishedAt: string;
  FeaturedImage: {
    formats: {
      medium: { url: string };
    };
  };
}

export interface Category {
  id: number;
  title: string;
  categoryImage: {
    formats: {
      large: { url: string };
    };
  };
}

export interface HomePageData {
  banners: Banner[];
  products: Product[];
  blogs: Blog[];
  categories: Category[];
}
