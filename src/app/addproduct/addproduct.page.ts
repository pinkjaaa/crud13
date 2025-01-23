import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataapiService } from '../dataapi.service';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonButton,
  IonInput, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
  standalone: true,
  imports: [IonLabel, 
    IonInput,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonItem,
    IonInput,
  ],
})
export class AddproductPage implements OnInit {
  txtname: any;
  txtprice: any;
  selectedFile: File | null = null;

  constructor(private dataapi: DataapiService, private route: Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  ngOnInit() {}

  addproduct() {
    const formData = new FormData();
    formData.append('name', this.txtname);
    formData.append('price', this.txtprice);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    this.dataapi.addproduct(formData).subscribe({
      next: (res: any) => {
        console.log('บันทึกข้อมูลสำเร็จ', res);
        this.txtname = '';
        this.txtprice = '';
        this.selectedFile = null;
        window.location.href = '/showproduct';
      },
      error: (err) => {
        console.error('เกิดข้อผิดพลาด', err);
      },
    });
  }
}