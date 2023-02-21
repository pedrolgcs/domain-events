import { Order } from '../bounded-contexts/sales/order';
import { OrderCreatedEvent } from '../bounded-contexts/sales/order-created';
import { OrderPaidEvent } from '../bounded-contexts/sales/order-paid';
import { DomainEvents } from '../core/DomainEvents';

// subscribers
DomainEvents.registerSubscriber<OrderCreatedEvent>(OrderCreatedEvent.name, (event) =>
  console.log(event)
);

DomainEvents.registerSubscriber<OrderPaidEvent>(OrderPaidEvent.name, (event) =>
  console.log(event)
);

// Publisher
const order = Order.create({
  customerId: 'orderId',
  productId: 'productId',
  amountInCents: 1000,
  status: 'pending',
  createdAt: new Date(),
});

// Dentro da camada de persistência de dados
DomainEvents.dispatchEventsForEntity(order.id);
