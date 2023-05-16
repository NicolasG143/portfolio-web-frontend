import { Component, OnInit } from '@angular/core';
import { Projects } from 'src/app/classes/projects';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  constructor(private projectsService: ProjectsService){}

  projects: Projects[] = [];

  ngOnInit(): void {
      this.getProjects()
  }

  getProjects(){
    this.projectsService.getProjects().subscribe(prj => {this.projects = prj})
  }
}
