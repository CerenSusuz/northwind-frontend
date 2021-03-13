import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  products:Product[]=[];
  dataLoaded=false;
  
  constructor(private productService: ProductService, 
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["categoryid"]){
        this.getProductsByCategory(params["categoryid"])
      }else{
        this.getProducts();
      }
    })
  
  }

  getProducts(){
    this.productService.getProducts().subscribe(response=>{
      this.products = response.data;
      this.dataLoaded = true;
    })
  }

  getProductsByCategory(categoryid:number){
    this.productService.getProductsByCategory(categoryid).subscribe(response=>{
      this.products = response.data;
      this.dataLoaded = true;
    })
  }
}
