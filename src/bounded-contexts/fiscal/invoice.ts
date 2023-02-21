import { Entity } from '../../core/Entity';

interface InvoiceProps {
  orderId: string;
  createdAt: Date;
}

export class Invoice extends Entity<InvoiceProps> {
  static create(props: InvoiceProps, id?: string) {
    const invoice = new Invoice(props, id);

    return invoice;
  }

  get orderId() {
    return this.props.orderId;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
