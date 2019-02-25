import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from './services/course.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  coursesList: IFirebase[];
  courseForm: FormGroup;

  constructor(private fb: FormBuilder, private coursesService: CourseService) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.coursesService.getCourses().subscribe((courses: IFirebase[]) => {
      this.coursesList = courses;
      console.log(this.coursesList);
    });
  }

  addCourse(course: ICourse) {
    this.coursesService.addCourse(course);
    this.courseForm.reset();
  }

}

interface ICourse {
  name: string;
  description: string;
  price: string;
}

export interface IFirebase {
  key: string | number;
  value: ICourse | {};
}
