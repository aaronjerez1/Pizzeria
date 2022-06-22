import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { IType } from '../shared/models/productTypes';
import {map} from 'rxjs/operators';
import { FoodParams } from '../shared/models/foodParams';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProducts(foodParams: FoodParams) {
    let params = new HttpParams();

    if(foodParams.typeId !== 0)
    {
      params = params.append('typeId', foodParams.typeId.toString());
    }
//finishing the paging.
    params = params.append('sort', foodParams.sort);
    params = params.append('pageIndex', foodParams.pageNumber.toString());
    params = params.append('pageIndex', foodParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map(response =>{
          return response.body;
        })
      );
  }

  getTypes() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}
