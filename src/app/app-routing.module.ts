import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  ChangePasswordFormComponent,
  CreateAccountFormComponent,
  LoginFormComponent,
  ResetPasswordFormComponent
} from './shared/components';
import {AuthGuardService} from './shared/services';
import {HomeComponent} from './pages/home/home.component';
import {MovieComponent} from './pages/movies/movie.component';
import {MovieEditComponent} from './pages/movies/edit/movie-edit.component';
import {TheaterComponent} from './pages/theater/theater.component';
import {TheaterEditComponent} from './pages/theater/edit/theater-edit.component';
import {ScheduleComponent} from './pages/schedule/schedule.component';
import {ScheduleEditComponent} from './pages/schedule/edit/schedule-edit.component';
import {ReservationComponent} from './pages/reservation/reservation.component';
import {ReservationEditComponent} from './pages/reservation/edit/reservation-edit.component';
import {ReservationListComponent} from './pages/reservation/list/reservation-list.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {TasksComponent} from './pages/tasks/tasks.component';
import {DevExtremeModule} from 'devextreme-angular';
import {EmployeeComponent} from "./pages/employee/employee.component";
import {EmployeeEditComponent} from "./pages/employee/edit/employee-edit.component";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: ReservationComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'movies',
    component: MovieComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'theater',
    component: TheaterComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reservation',
    component: ReservationComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reservationList',
    component: ReservationListComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), DevExtremeModule, CommonModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    MovieComponent,
    MovieEditComponent,
    TheaterComponent,
    TheaterEditComponent,
    ScheduleComponent,
    ScheduleEditComponent,
    ReservationComponent,
    ReservationEditComponent,
    ReservationListComponent,
    ProfileComponent,
    TasksComponent,
    EmployeeComponent,
    EmployeeEditComponent
  ]
})
export class AppRoutingModule { }
