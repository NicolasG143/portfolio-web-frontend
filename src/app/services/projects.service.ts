import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Projects } from '../classes/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  // baseURL = "https://portfolio-web-pkox.onrender.com/projects/"
  baseURL = "http://localhost:8080/projects/"

  constructor(private httpClient: HttpClient) { }

  
  getProjects(): Observable<Projects[]>{
    return this.httpClient.get<Projects[]>(`${this.baseURL}traer`)
    }
  
  }

