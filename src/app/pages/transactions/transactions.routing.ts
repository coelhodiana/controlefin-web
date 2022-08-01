import { RouterModule, Routes } from '@angular/router';

import { TransactionCreateEditComponent } from './components/transaction-create-edit/transaction-create-edit.component';
import { TransactionsComponent } from './transactions.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    children: [
      { path: '', component: TransactionCreateEditComponent },
      {
        path: 'editar/:id',
        component: TransactionCreateEditComponent,
      }
    ],
  },
];

export const TransactionsRoutes = RouterModule.forChild(routes);
