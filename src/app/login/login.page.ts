import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d{4})(?=.*[a-z]{3}).{8,}$/),
        ],
      ],
    });
  }

  login() {
    if (this.loginForm && this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      if (password?.match(/^(?=.*[A-Z])(?=.*\d{4})(?=.*[a-z]{3}).{8,}$/)) {
        // Contraseña válida, redirigir a la página home
        this.router.navigate(['/home']);
      } else {
        // Contraseña inválida, muestra un mensaje de error
        this.errorMessage = 'La contraseña no cumple con los requisitos.';
      }
    } else {
      // El formulario es inválido o no está inicializado, muestra mensajes de error si es necesario.
      this.errorMessage = 'Correo y/o Contraseña Invalido';
    }
  }
}
