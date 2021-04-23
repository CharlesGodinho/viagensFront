import { TravelDetailComponent } from './components/travel-detail/travel-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/security/login/login.component";
import { HomeComponent } from './components/home/home.component';
import { ModuleWithProviders } from "@angular/core";
import { AuthGuard } from './components/security/auth.guard';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TravelNewComponent } from './components/travel-new/travel-new.component';
import { PassengersNewComponent } from './components/passengers-new/passengers-new.component'
import { TravelListComponent } from './components/travel-list/travel-list.component';
import { SummaryComponent } from './components/summary/summary.component';

export const ROUTES: Routes = [
  { path: 'login' , component: LoginComponent },
  { path: '' , component:  HomeComponent, canActivate: [AuthGuard]},
  { path: 'user-new' , component: UserNewComponent, canActivate: [AuthGuard] },
  { path: 'user-new/:id' , component: UserNewComponent, canActivate: [AuthGuard] },
  { path: 'user-list' , component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'passengers-new' , component: PassengersNewComponent, canActivate: [AuthGuard] },
  { path: 'passengers-new/:id' , component: PassengersNewComponent, canActivate: [AuthGuard] },
  { path: 'travel-new' , component: TravelNewComponent, canActivate: [AuthGuard] },
  { path: 'travel-new/:id' , component: TravelNewComponent, canActivate: [AuthGuard] },
  { path: 'travel-list' , component: TravelListComponent, canActivate: [AuthGuard] },
  { path: 'travel-detail/:id' , component: TravelDetailComponent, canActivate: [AuthGuard] },
  { path: 'summary' , component: SummaryComponent, canActivate: [AuthGuard] }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);

