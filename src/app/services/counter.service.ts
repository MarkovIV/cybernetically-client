import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})

export class CounterService {
  count: number = 0
  currentCount: number = 0
  nextCount: number = 0

  constructor() { }
}
