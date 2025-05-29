import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-update-amount',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './update-amount.component.html',
  styleUrl: './update-amount.component.css'
})
export class UpdateAmountComponent {
  service: AdminService = inject(AdminService);
  serviceToken: AuthService = inject(AuthService);
  userId: string = '';
  updateAmount!: FormGroup;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    const token = this.serviceToken.getToken();
    if (!token) return;

    this.service.infoUser(this.userId).then(data => {
      const userData = data.user;

      this.updateAmount = new FormGroup({
        username: new FormControl(userData.username),
        email: new FormControl(userData.email),
        deposit: new FormControl(userData.balance?.deposit ?? 0),
        earning: new FormControl(userData.balance?.earning ?? 0)
      });
    })
    .catch(err => console.error('Erreur lors du chargement de l’utilisateur', err));
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const updatedData = {
      username: this.updateAmount.value.username,
      email: this.updateAmount.value.email,
      balance: {
        deposit: Number(this.updateAmount.value.deposit),
        earning: Number(this.updateAmount.value.earning)
      }
    };

    fetch(`http://localhost:5000/api/admin/user/update/${this.userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    })
    .then(res => res.json())
    .then(updated => {
      alert('Utilisateur mis à jour avec succès');
    })
    .catch(err => {
      console.log('Erreur lors de la mise à jour', err);
      alert('Erreur lors de la mise à jour');
    });
  }
}
