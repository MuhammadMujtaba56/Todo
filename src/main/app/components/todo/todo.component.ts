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

  constructor(private http: HttpService) {
    this.description = '';
    this.todoList = [];
  }

  ngOnInit(): void {
    this.getList();
  }

  addTodo() {
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
            this.getList();
          }
        },
        error: err => {
          alert(`Error: ${err.message}`);
        },
      });
    }
  }

  deleteTodo(element: ITodo) {
    this.todoList = this.todoList.filter(
      (item: ITodo) => item.id !== element.id
    );
  }

  checkTodo(element: ITodo) {
    this.todoList = this.todoList.map((item: ITodo) => {
      if (item.id === element.id) {
        item.isChecked = !item.isChecked;
        return item;
      } else {
        return item;
      }
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
