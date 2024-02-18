import {Inject, Injectable} from"@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs";
import {UserFavorite} from "../shared/classes/userFavorite";
import {MainframeIdTokenService} from "mainframe-connector";

@Injectable({
  providedIn: "root"
})
export class UserService {

  favorites: Subject<UserFavorite[]> = new Subject<UserFavorite[]>();
  private _favorites: UserFavorite[] = [];

  constructor(private http: HttpClient,
              @Inject("BACKEND_URL") private baseURL: string,
              private tokenService: MainframeIdTokenService) {
  }

  public async getFavorites() {
    const headers = new HttpHeaders({"Authorization": "Bearer " + await this.tokenService.getJwt()});
    this.http.get<UserFavorite[]>(this.baseURL + "/User/Favorites", {
      headers: headers
    }) // Authorization: Bearer <token>
      .subscribe((res) => {
        this._favorites = res;
        this.favorites.next(res);
      });
  }

  public async addFavorite(pluginId: string) {
    const headers = new HttpHeaders({"Authorization": "Bearer " + await this.tokenService.getJwt()});
    this.http.post<UserFavorite>(this.baseURL + "/User/AddFavorite?PluginId=" + pluginId, undefined, {
      headers: headers
    })
      .subscribe((res) => {
        this._favorites.push(res);
        this.favorites.next(this._favorites);
      });
  }

  public async deleteFavorite(pluginId: string) {
    const headers = new HttpHeaders({"Authorization": "Bearer " + await this.tokenService.getJwt()});
    this.http.delete<UserFavorite>(this.baseURL + "/User/RemoveFavorite?PluginId=" + pluginId, {
      headers: headers
    })
      .subscribe((res) => {
        this._favorites = this._favorites.filter(x => x.pluginID != res.pluginID);
        this.favorites.next(this._favorites);
      });
  }
}
