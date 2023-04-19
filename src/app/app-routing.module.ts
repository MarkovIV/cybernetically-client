import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthPage } from './pages/auth-page/auth-page'
import { NotFound } from './pages/not-found/not-found'
import { MainPage } from './pages/main-page/main-page'
import { CounterGuard } from './guards/counter.guard'

const routes: Routes = [
  {
    path: '', component: AuthPage
  },
  {
    path: 'main',
    component: MainPage,
    canActivate: [CounterGuard]
  },
  {
    path: '**', component: NotFound
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
