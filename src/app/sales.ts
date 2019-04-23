export class Sales {
    id: number;
    SalesName: string;
    CustomerName: string;
    CustomerAddress: string;
    CustomerContact: number;
    Accepted: boolean;
    orders: Order[];
}

export class Order {
    id: number;
    sales_id: number;
    product_id: number;
    ProductCode: string;
    ProductName: string;
    ProductPrice: number;
    ProposedPrice: number;
    Quantity: number;
    margin: number;
    totalproposedprice: number;
}

export class ModSales{
    SalesName: string;
    CustomerName: string;
    CustomerAddress: string;
    CustomerContact: number;
    Accepted: boolean;
    product_id:number[];
    ProposedPrice:number[];
    Quantity:number[];
}