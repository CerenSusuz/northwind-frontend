import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm : FormGroup;
  constructor(private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private productService:ProductService) { }

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm(){
    this.productAddForm = this.formBuilder.group({
      productName:["",Validators.required],
      categoryId:["",Validators.required],
      unitPrice:["",Validators.required],
      unitInStock:["",Validators.required]
    })
  }

  add(){
    if(this.productAddForm.valid){
      let productModel = Object.assign({},this.productAddForm.value);
      this.productService.add(productModel).subscribe(response=>{
        console.log(response);
        this.toastr.success(response.message,"Succesfully!");
      },responseError=>{
        console.log(responseError)
        // this.toastr.error(responseError.error);
      })

    }else{
      this.toastr.error("Error","Warning!");
    }
  }



}
