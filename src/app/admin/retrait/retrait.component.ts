import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

interface Retrait {
  _id: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
  amount: number;
  network: string;
  walletAddress: string;
  status: string;
  createdAt: string;
}

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.component.html',
  styleUrls: ['./retrait.component.css'],
  imports: [ReactiveFormsModule, NgIf, CommonModule],
})
export class RetraitComponent implements OnInit {
  retraits: Retrait[] = [];

  ngOnInit(): void {
    this.fetchRetraits();
  }

  fetchRetraits(): void {
    fetch('https://axiaback.onrender.com/api/retrait/allretraits', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      this.retraits = data;
    })
    .catch(err => console.error('Erreur lors du chargement des retraits :', err));
  }

  updateStatus(id: string, status: 'approved' | 'rejected'): void {
   
    fetch(`https://axiaback.onrender.com/api/retrait/updateretrait/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ status })
    })
    .then(res => res.json())
    .then(() => {
      this.fetchRetraits(); // rechargement après mise à jour
    })
    .catch(err => console.error('Erreur lors de la mise à jour du retrait :', err));
  }
} 
