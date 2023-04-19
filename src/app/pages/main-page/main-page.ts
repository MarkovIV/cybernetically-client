import { Component, OnInit } from '@angular/core'
import {MatDialog} from '@angular/material/dialog'
import { Router } from '@angular/router'
import { AuthService } from './../../services/auth.service'
import { CounterService } from './../../services/counter.service'
import { RepositoryService } from './../../services/repository.service'

@Component({
  selector: 'main-page',
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.scss']
})

export class MainPage implements OnInit {
  loading: boolean = false
  alertIsOpen: boolean = false
  alertMessage: string = ''
  durationInSeconds: number = 3

  constructor(public dialog: MatDialog,
              private router: Router,
              private auth: AuthService,
              public counter: CounterService,
              private repository: RepositoryService
              ) { }

  ngOnInit(): void {

  }

  logout = () => {
    this.auth.token = ''
    this.router.navigate(['/'])
  }

  increment = () => {
    if (this.counter.count === 0) {
      this.counter.currentCount = 1
    } else {
      this.counter.currentCount = this.counter.count
    }

    const counterUrl = 'auth/counter'
    const counterData = {
      counter: this.counter.currentCount
    }

    this.loading = true
    this.repository.counter(counterUrl, JSON.stringify(counterData))
    .subscribe(res => {
      this.counter.nextCount = Number(res)
      this.loading = false

      this.openDialog()
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

  openDialog() {
    const dialogRef = this.dialog.open(MainPageDialog)

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.counter.count = this.counter.nextCount
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

@Component({
  selector: 'main-page-dialog',
  templateUrl: './main-page-dialog.html',
  styleUrls: ['./main-page-dialog.scss']
})

export class MainPageDialog {
  constructor(public counter: CounterService) { }
}
