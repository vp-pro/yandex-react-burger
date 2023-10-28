export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export interface Order {
    id: number;
    text: string;
}

export type Orders = Array<Order>;

export enum OrdersActionType {
    DATA = 'data',
    INSERT = 'insert',
    DELETE = 'delete',
    UPDATE = 'update',
    MOVE = 'move',
}

export type Data = {
    type: OrdersActionType.DATA,
    data: Orders
}

export type Insert = {
    type: OrdersActionType.INSERT,
    data: {
        rows: Array<Order>,
        pos: number
    }
}

export type Update = {
    type: OrdersActionType.UPDATE,
    data: Orders
}

export type Delete = {
    type: OrdersActionType.DELETE,
    data: Array<number>
}

export type Move = {
    type: OrdersActionType.MOVE,
    data: Array<{from: number, to: number}>
}

export type OrdersAction = Insert | Data | Delete | Update | Move;

export type OrdersActions = Array<OrdersAction>;