import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import firebase from 'firebase/auth';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgIf, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']  
})
export class NavbarComponent implements OnInit {
  user$!: Observable<firebase.User | null>;
  isLoading: boolean = false; 
  errorMessage: string = '';   

  constructor(private _srvAuth: AuthService) {}

  ngOnInit(): void {
    this.user$ = this._srvAuth.getUser();
  }

  async onGoogleLogin(): Promise<void> {
    if (this.isLoading) return;   

    this.isLoading = true;
    this.errorMessage = '';
    try {
      await this._srvAuth.loginWithGoogle();
      console.log('login exitoso');
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Error al autenticar con Google';
    } finally {
      this.isLoading = false;
    }
  }

  async onLogout(): Promise<void> {
    try {
      await this._srvAuth.logout();
      console.log('Sesión cerrada');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }
}

