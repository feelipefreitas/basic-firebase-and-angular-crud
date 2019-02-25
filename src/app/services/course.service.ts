import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IFirebase } from '../app.component';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private db: AngularFireDatabase) { }

    getCourses(): Observable<IFirebase[]> {
        return this.db.list('/courses').snapshotChanges().pipe(
            map(courses => {
                return courses.map(course => {
                    let key = course.payload.key;
                    let value = course.payload.val();
                    return { key, value };
                });
            })
        );
    }

    addCourse(course) {
      return this.db.database.ref('/courses').push(course);
    }

    updateCourse(course) {

    }

    deleteCourse(){

    }
}
