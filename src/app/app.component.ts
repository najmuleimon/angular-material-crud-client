import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'material-CRUD';
  displayedColumns: string[] = ['productName', 'category', 'date','freshness', 'price', 'description', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private apiService:ApiService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  // open add product popup
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getAllProducts();
      }
    });
  }

  // get all products
  getAllProducts(){
    this.apiService.getProducts().subscribe({
      next:(res:any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }, error:(err:any) => {
        alert('Error while fetching all products.')
      }
    })
  }

  // filtering
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // edit product
  editProduct(row:any){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getAllProducts();
      }
    });
  }

  // delete Product
  deleteProduct(id:number){
    this.apiService.deleteProduct(id).subscribe({
      next:(res:any) => {
        alert('Product deleted successfully!');
        this.getAllProducts();
      },
      error:(err) => {
        alert('Error while deleting the product!');
      }
    })
  }
}
