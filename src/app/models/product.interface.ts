export interface Product {
    title:              string;
    brand:              string;
    discountPercentage: number;
    rating:             number;
    category:           string;
    images:             string[];
    price:              number;
    stock:              number;
    id?:                number;
    thumbnail:          string;
    description:        string;
}
