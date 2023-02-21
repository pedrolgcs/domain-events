import { randomUUID } from 'node:crypto';
import { DomainEvent } from './DomainEvent';
import { DomainEvents } from './DomainEvents';

export abstract class Entity<T = unknown> {
  protected readonly _id: string;
  protected props: T;
  private _domainEvents: DomainEvent[] = [];

  protected constructor(props: T, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  protected addDomainEvent(domainEvent: DomainEvent) {
    this._domainEvents.push(domainEvent);
    DomainEvents.markEntityForDispatch(this);
  }

  public clearEvents() {
    this._domainEvents = [];
  }

  get id() {
    return this._id;
  }

  get domainEvents() {
    return this._domainEvents;
  }
}
