import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './sign-in.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
];

export const SignInRoutes = RouterModule.forChild(routes);
