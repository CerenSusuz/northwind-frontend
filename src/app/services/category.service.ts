import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CategoryResponseModel } from '../models/categoryResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl = "https://localhost:44383/api/categories/getall";

  constructor(private httpClient:HttpClient) { }

  getCategories():Observable<CategoryResponseModel>{
    return this.httpClient
    .get<CategoryResponseModel>(this.apiUrl);
  }
}
