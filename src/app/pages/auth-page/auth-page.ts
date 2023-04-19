import { Component, OnInit } from '@angular/core'
import { RepositoryService } from './../../services/repository.service'
import { AuthService } from './../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'auth-page',
  templateUrl: 'auth-page.html',
  styleUrls: ['auth-page.scss']
})

export class AuthPage implements OnInit {
  hide: boolean = true
  loading: boolean = false
  username: string = ''
  password: string = ''
  durationInSeconds: number = 3
  alertIsOpen: boolean = false
  alertMessage: string = ''

  constructor(private repository: RepositoryService, private router: Router, private auth: AuthService) {

  }

  ngOnInit(): void {
  }

  clearLoginData = () => {
    this.username = ''
    this.password = ''
  }

  login = async () => {
      const loginUrl = 'auth/login'
      const loginData = {
        username: this.username,
        password: this.password
      }

      this.loading = true
      this.repository.login(loginUrl, JSON.stringify(loginData))
      .subscribe(res => {
        this.loading = false
        this.auth.token = JSON.parse(JSON.stringify(res)).token
        this.router.navigate(['/main'])
      },
      (error) => {
        this.loading = false
        console.log(error)
        if (error.error.message) {
          this.openAlert(error.error.message)
        } else {
          this.openAlert('Something went wrong')
        }
      })
  }

  openAlert(message: string) {
    this.alertMessage = message
    this.alertIsOpen = true

    setTimeout(() => {
      this.closeAlert()
    }, this.durationInSeconds * 1000)
  }

  closeAlert() {
    this.alertIsOpen = false
    this.alertMessage = ''
  }
}
