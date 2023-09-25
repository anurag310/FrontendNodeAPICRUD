import { Component } from '@angular/core';
import { NodeapiService } from '../nodeapi.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss']
})
export class GetComponent {
  getProducts:any;
  getProductID:any="";
  pageSize: number = 3; // Number of items to display per page
  currentPage: number = 1;
  numberofPages:any=Number;
  paginatedProducts: any[] = []; // Array to hold the products for the current page
pages: number[] = []; // Array to hold page numbers
  getProductDetalisByid:any=null;
  searchName:any="";
  constructor(private service:NodeapiService,private router:Router,private toastr : ToastrService){}
  ngOnInit():void{
   this.getallProducts();
  }
  // getallProducts(){
  //   this.service.getProducts().subscribe((response)=>{
  //     this.getProducts = response;
  //     console.log(response);
  //   });
    
  // }
  getallProducts() {
    debugger
    this.service.getProducts(this.currentPage).subscribe((response) => {
      this.getProducts = response.products;
      this.numberofPages = response.totalPages;
      console.log("Number of Pages",this.numberofPages);
  
      // Initialize pagination properties and perform pagination-related operations
      this.initializePagination();
    });
  }
  
  initializePagination() {
    debugger
    this.pages = Array.from({ length: this.numberofPages }, (_, i) => i + 1);
   
  }
  // Handle page change
  onPageChange(pageNumber: number) {
    debugger
    this.currentPage = pageNumber;
    this.getallProducts();
    //this.updatePaginatedProducts();
  }
  
  deleteProduct(id:string){
    debugger
    this.service.deleteProduct(id).subscribe((response)=>{
      // console.log("Delete",response);
      //alert("Delete Successfully..");
      this.getProductDetalisByid = null;
      this.getallProducts();
      this.toastr.success('Delete Successfully');
    });
    
  }
  editProduct(id:string){
    debugger
    
    this.service.getProductById(id).subscribe((res)=>{
      // Storing the ID in localStorage
     // localStorage.setItem('productId', id);

     // const url = this.router.navigate(['/post',id]);
        this.router.navigate(['/post',id]);
      this.toastr.success('Edit button Called Successfully');
    })
  }
  onRowClick(id:any=""){
    this.getProductID = id;
    this.service.getProductById(id).subscribe((response)=>{
      this.getProductDetalisByid = response;
    });
  }
  searchResults:any;
  searchProduct() {
    debugger
    if(this.searchName == ""){
      this.searchResults = null;
    }
    if(this.searchName != ""){
    this.searchResults = this.getProducts.filter((product: { name: string; }) =>
      product.name.toLowerCase().includes(this.searchName.toLowerCase())
    );
    this.toastr.success("Products match");
     
  }}
}
