import { RouterModule, Routes } from '@angular/router';

import { TransactionCreateEditComponent } from './components/transaction-create-edit/transaction-create-edit.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { TransactionsComponent } from './transactions.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    children: [
      { path: '', component: TransactionsListComponent },
      {
        path: 'editar/:id',
        component: TransactionCreateEditComponent,
      },
      {
        path: 'nova-transacao',
        component: TransactionCreateEditComponent,
      },
    ],
  },
];

export const TransactionsRoutes = RouterModule.forChild(routes);
