import { Entity } from './Entity';

type SubscriberCallback<T> = (event: T) => void;

type Subscribers<T> = Record<string, SubscriberCallback<T>[]>;

export class DomainEvents {
  static subscribers: Subscribers<any> = {};
  static markedEntitiesToDispatch: Entity[] = [];

  public static registerSubscriber<T = unknown>(event: string, cb: SubscriberCallback<T>) {
    if (event in this.subscribers) {
      this.subscribers[event].push(cb);
    } else {
      this.subscribers[event] = [cb];
    }
  }

  public static markEntityForDispatch(entity: Entity) {
    const alreadyMarked = this.markedEntitiesToDispatch.find(
      (item) => item.id === entity.id
    );

    if (!alreadyMarked) {
      this.markedEntitiesToDispatch.push(entity);
    }
  }

  public static dispatchEventsForEntity(id: string) {
    const entity = this.markedEntitiesToDispatch.find((item) => item.id === id);

    if (entity) {
      entity.domainEvents.forEach((event) => {
        const eventName = event.constructor.name;

        if (eventName in this.subscribers) {
          const handlers = this.subscribers[eventName];

          for (const handler of handlers) {
            handler(event);
          }
        }
      });

      entity.clearEvents();
    }
  }
}
