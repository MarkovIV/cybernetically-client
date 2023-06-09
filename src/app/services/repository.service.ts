import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { EnvironmentUrlService } from './environment-url.service'
import { AuthService } from './../services/auth.service'

@Injectable({
  providedIn: 'root'
})

export class RepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private auth: AuthService) { }

  public counter = (route: string, body: string) => {
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), body, this.generateHeaders())
  }

  public login = (route: string, body: string) => {
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), body, this.generateHeaders())
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.auth.token,
      })
    }
  }
}
