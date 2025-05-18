import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-request-retrait',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './request-retrait.component.html',
  styleUrl: './request-retrait.component.css'
})
export class RequestRetraitComponent {
  retraitForm!: FormGroup;
  submitted = false;

  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    this.retraitForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.min(5)]),
      network: new FormControl('TRC20', Validators.required),
      walletAddress: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  get f() {
    return this.retraitForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.retraitForm.invalid) return;

    const formData = this.retraitForm.value;

    fetch('http://localhost:5000/api/retrait/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(formData),
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Erreur inconnue');

        this.successMessage =
          'Votre demande de retrait a été envoyée avec succès. Veuillez patienter.';
        this.retraitForm.reset({ network: 'TRC20' });
        this.submitted = false;
      })
      .catch(error => {
        this.errorMessage = error.message || 'Une erreur est survenue.';
      });
  }
}
