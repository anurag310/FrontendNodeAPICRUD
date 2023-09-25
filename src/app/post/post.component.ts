import { Component, ViewChild } from '@angular/core';
import { NodeapiService } from '../nodeapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @ViewChild('userform') form:NgForm | undefined;

  getProductDetalisByid:any;
  fname:any="";
  quantity:any=Number;
  price:any=Number;
  storedId:any;
  constructor(private service:NodeapiService,private router:Router,private toastr: ToastrService,private route: ActivatedRoute){}
  // Function to handle form submission
  ngOnInit(): void {
 
    // Fetch the ID parameter from the route
    this.route.paramMap.subscribe((params) => {
      this.storedId = params.get('id');
      console.log("Params",this.storedId);
      this.getProductByItsID();
    });
  }
  getUserFormData(formData: any) {
    debugger
    if (formData != null) {
      
      console.log('Form data:', formData);
      if(this.storedId != null){
        this.service.putProduct(this.storedId,formData).subscribe((res)=>{
          this.toastr.success('Record Changed Successfully');
          //localStorage.removeItem('productId');
        })
      }
      else{
      this.service.postProduct(formData).subscribe((res)=>
      {
        this.toastr.success('Record Added Successfully');
      });}

      this.router.navigate(['/get'])
      
    } else {
      this.toastr.error('Form is invalid. Please check the fields');
    }
  }

  getProductByItsID(){
    debugger
    if(this.storedId != null){
    this.service.getProductById(this.storedId).subscribe((response)=>{
      this.getProductDetalisByid = response;
      this.fname = response.name;
      this.quantity = response.quantity;
      this.price = response.price;
    });
  }
  }
}
