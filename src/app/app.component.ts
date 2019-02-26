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
  addFormType = true;

  constructor(private fb: FormBuilder, private coursesService: CourseService) {
    this.courseForm = this.fb.group({
      key: ['', Validators.required],
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

  deleteCourse(course: ICourse) {
    this.coursesService.deleteCourse(course);
  }

  updateCourse(course) {
    this.coursesService.updateCourse(course);
    this.courseForm.reset();
    this.addFormType = true;
  }

  setFormToUpdate(course) {
    this.courseForm.setValue({
      key: course.key,
      name: course.value.name,
      description: course.value.description,
      price: course.value.price
    });
    this.addFormType = false;
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
