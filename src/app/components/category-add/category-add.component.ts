import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  categoryAddForm : FormGroup;
  constructor(private formBuilder:FormBuilder,
    private categoryService:CategoryService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.createCategoryAddForm();
  }

  createCategoryAddForm(){
    this.categoryAddForm = this.formBuilder.group({
      categoryName:["",Validators.required]
    })
  } 

  add(){
    if(this.categoryAddForm.valid){
      let categoryModel = Object.assign({},this.categoryAddForm.value)
      this.categoryService.add(categoryModel).subscribe(response=>{   
        this.toastr.success("Add OK")
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length ; i++) {
            this.toastr.error(responseError.error.ValidationErrors[i].ErrorMessage);
          }
        }
      })

    }else{
      this.toastr.error("Form Error!")
    }

  }

}
