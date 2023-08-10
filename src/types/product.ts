import { ISelectType } from './auth';

export interface IProduct {
  barcode: string;
  barcodes: [];
  brand: string;
  default_code: string;
  galleries: string[];
  id: number;
  images: Record<string, string>;
  name: string;
  price: string;
  product_tmpl_id: number;
  purchase_price: number;
  quantity_available: number;
  slug: string;
  unit: ISelectType;
  uom_po_id: number;
  write_date: string;
}
