import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManuelDepositService } from '../../services/manuel-deposit.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manuel-deposit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manuel-deposit.component.html',
  styleUrls: ['./manuel-deposit.component.css']
})
export class ManuelDepositComponent {
   // 💳 Adresses à afficher
   usdtTrc20: string = 'TFpuYciqF4FkpT7oNPBbrB9yytHT3Txs7A';
   usdtBep20: string = '0xbb46a46dc08d5e230e16d3adf82219ec75448aca';

    // ✅ États de copie
  copiedTrc20 = false;
  copiedBep20 = false;
  isLoading : boolean = false


  depositForm = new FormGroup({
    amount: new FormControl(''),
    txReference: new FormControl('')
  });

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  Errormsg : string = "";
  successMsg : string = "";
  copied : boolean = false
  id : string | null = null
  route : ActivatedRoute = inject(ActivatedRoute)

  depositService : ManuelDepositService = inject(ManuelDepositService)


   // 📋 Copier l'adresse
   copyAddress(address: string, type: 'trc20' | 'bep20') {
    navigator.clipboard.writeText(address).then(() => {
      if (type === 'trc20') {
        this.copiedTrc20 = true;
        setTimeout(() => (this.copiedTrc20 = false), 2000);
      } else {
        this.copiedBep20 = true;
        setTimeout(() => (this.copiedBep20 = false), 2000);
      }
    });
  }


  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id') 
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };

      if(this.selectedFile){
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  async onSubmit() {
    this.isLoading = true
    if (!this.depositForm.valid || !this.selectedFile) {
      // alert("Veuillez remplir tous les champs.");
      this.Errormsg = "Veuillez remplir tous les champs."
      return;
    }

    const formData = new FormData();
    formData.append('amount', this.depositForm.value.amount || '');
    formData.append('txReference', this.depositForm.value.txReference || '');
    formData.append('paymentProof', this.selectedFile);

    try {
      const response = await this.depositService.submitDeposit(formData, this.id);
      this.isLoading = false
      if (response.ok) { 
        this.successMsg = "Dépôt soumis avec succès !, Veuillez patienter pendant que nous vérifions votre dépôt.";
        this.depositForm.reset();
        this.previewUrl = null;
        this.selectedFile = null;
      } else {
        const errorData = await response.json();
        console.log("Erreur : " + (errorData.message || "Échec du dépôt"));
        this.Errormsg = "Échec du dépôt."
      }
    } catch (err) {
      alert("Une erreur s'est produite.");
      this.Errormsg = "Une erreur s'est produite."
      console.error(err);
    }
  }
}
