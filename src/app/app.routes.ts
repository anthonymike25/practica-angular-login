import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { DbzComponent } from './pages/dbz/dbz.component';
import { ErrorComponent } from './pages/error/error.component';
import { RickComponent } from './pages/rick/rick.component';
import { CoctelesComponent } from './pages/cocteles/cocteles.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    {path: '' ,redirectTo: 'home',pathMatch:'full'},
    {path: 'home', component: HomeComponent},
    {path:'pokemon', component: PokemonComponent},
    {path:'rick', component: RickComponent},
    {path:'cocteles',component: CoctelesComponent},
    {path: 'dbz', component: DbzComponent},
    {path:'miapi', 
         loadChildren: () => import('./pages/miapi/miapi-routing.module').then(m => m.MiapiRoutingModule),
        canActivate: [AuthGuard]
    },
    {path: '**', component: ErrorComponent }
];

