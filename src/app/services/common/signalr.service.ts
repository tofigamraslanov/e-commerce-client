import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private _connection: HubConnection;

  get connection(): HubConnection {
    return this._connection;
  }

  start(hubUrl: string) {
    if (
      !this.connection ||
      this.connection?.state == HubConnectionState.Disconnected
    ) {
      const builder: HubConnectionBuilder = new HubConnectionBuilder();
      const connection: HubConnection = builder
        .withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();

      connection
        .start()
        .then(() => console.log('Connected'))
        .catch((error) => setTimeout(() => this.start(hubUrl), 2000));
      this._connection = connection;
    }

    this._connection.onreconnected((connectionId) =>
      console.log('Reconnected')
    );
    this._connection.onreconnecting((error) => console.log('Reconnecting'));
    this._connection.onclose((error) => console.log('Close reconnection'));
  }

  invoke(
    methodName: string,
    message: any,
    successCallback?: (value) => void,
    errorCallback?: (error) => void
  ) {
    this.connection
      .invoke(methodName, message)
      .then(successCallback)
      .catch(errorCallback);
  }

  on(methodName: string, callBack: (...message: any) => void) {
    this.connection.on(methodName, callBack);
  }
}
