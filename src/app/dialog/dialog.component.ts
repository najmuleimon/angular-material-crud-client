import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshnessList = ['Brand New','Second Hand','Refurbished'];
  productFrom!: FormGroup;
  actionBtn: string = 'Save';
  title: string = 'Add';

  constructor(
    private formBuilder : FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any
    ) { }

  ngOnInit(): void {
    this.productFrom = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date:['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      description:['', Validators.required]
    });

    if(this.editData){
      this.title = 'Update';
      this.actionBtn = 'Update';
      this.productFrom.controls['productName'].setValue(this.editData.productName);
      this.productFrom.controls['category'].setValue(this.editData.category);
      this.productFrom.controls['freshness'].setValue(this.editData.freshness);
      this.productFrom.controls['price'].setValue(this.editData.price);
      this.productFrom.controls['description'].setValue(this.editData.description);
      this.productFrom.controls['date'].setValue(this.editData.date);
    }
  }

  // add product
  addProduct(){
    if(!this.editData){
      if(this.productFrom.valid){
        this.apiService.addProduct(this.productFrom.value).subscribe({
          next:(res:any) => {
            alert('Product added successfully!');
            this.productFrom.reset();
            this.dialogRef.close('save');
          },
          error:() => {
            alert('Error white adding the product');
          }
        })
      }
    }else{
      this.updateProduct();
    }
  }

  // update product
  updateProduct(){
    this.apiService.updateProduct(this.productFrom.value, this.editData.id).subscribe({
      next:(res:any) => {
        alert('Product updated successfully!');
        this.productFrom.reset();
        this.dialogRef.close('update');
      },
      error:(err) => {
        alert('Error while updating the product!')
      }
    })
  }

}
