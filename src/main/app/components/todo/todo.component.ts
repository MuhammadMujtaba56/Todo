import { Component, OnInit } from '@angular/core';
import { Constants } from '../../constants/constants';
import { ITodo } from '../../interfaces/itodo';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoList!: ITodo[];
  description!: string;
  isLoading!: boolean;

  constructor(private http: HttpService) {
    this.description = '';
    this.todoList = [];
  }

  ngOnInit(): void {
    this.getList();
  }

  addTodo() {
    this.isLoading = true;
    if (this.description) {
      const temp: ITodo = {
        id: Math.floor(Math.random() * Constants.RANGE),
        description: this.description,
        isChecked: false,
        isDeleted: false,
      };

      this.http.post(temp).subscribe({
        next: (res: any) => {
          if (res) {
            this.description = '';
            this.isLoading = false;
            this.getList();
          }
        },
        error: err => {
          this.isLoading = false;
          alert(`Error: ${err.message}`);
        },
      });
    }
  }

  deleteTodo(element: ITodo) {
    this.http.delete(element.id).subscribe({
      next: res => {
        if (res) {
          this.getList();
        }
      },
      error: err => {
        alert(`Error: ${err.message}`);
      },
    });
  }

  checkTodo(element: ITodo) {
    element.isChecked = !element.isChecked;
    this.http.put(element.id, element).subscribe({
      next: res => {
        if (res) {
          this.getList();
        }
      },
      error: err => {
        alert(`Error: ${err.message}`);
      },
    });
  }

  getList() {
    this.http.get().subscribe({
      next: (res: any) => {
        this.todoList = res;
      },
      error: err => {
        alert(`Error: ${err.message}`);
      },
    });
  }
}
