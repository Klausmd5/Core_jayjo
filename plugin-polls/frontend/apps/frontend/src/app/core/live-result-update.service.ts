import {Injectable} from '@angular/core';
import {HttpTransportType, HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {environment} from "../../environments/environment";
import {PollResultDto} from "../polls-backend";
import {ErgebnisComponent} from "../feature-lazy/ergebnis/ergebnis.component";
import { LehreransichtListeComponent } from '../feature-eager/lehreransicht-liste/lehreransicht-liste.component';

@Injectable({
  providedIn: 'root'
})
export class LiveResultUpdateService {
  hubConnection: HubConnection = null!;

  public async startConnection(jwtToken: string) {
    if(this.hubConnection === null) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(`${environment.backend}/hubs/polls`,
          { skipNegotiation: true, transport: HttpTransportType.WebSockets, accessTokenFactory: () => jwtToken }
        )
        .build();
      await this.hubConnection.start();
    }
  }

  registerListener(code: string, ergComponent: ErgebnisComponent) {
    if(this.hubConnection === null) {
      throw new Error('Connection not started');
    }
    this.hubConnection.invoke('ReceiveUpdates', code).then((_: any) => console.log(`Registered for updates for poll ${code}`));
    this.hubConnection.on('NewVoteReceived', (poll: PollResultDto) => ErgebnisComponent.updateChart(poll, ergComponent));
  }

  registerListener2(code: string, lehrlistComponent: LehreransichtListeComponent) {
    if(this.hubConnection === null) {
      throw new Error('Connection not started');
    }
    this.hubConnection.invoke('ReceiveUpdates', code).then((_: any) => console.log(`Registered for updates for poll ${code}`));
    this.hubConnection.on('NewVoteReceived', (poll: PollResultDto) => LehreransichtListeComponent.updateList(poll, lehrlistComponent));
  }

  unregisterListener(code: string) {
    if(this.hubConnection === null) {
      throw new Error('Connection not started');
    }
    this.hubConnection.invoke('NoFurtherUpdates', code).then((_: any) => console.log(`Unregistered for updates for poll ${code}`));
  }
}
