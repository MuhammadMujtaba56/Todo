import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from 'src/main/app/interfaces/itodo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input() todoList!: ITodo[];
  @Output() checkTodo = new EventEmitter<ITodo>();
  @Output() deleteTodo = new EventEmitter<ITodo>();

  constructor() {}

  isChecked(el: ITodo) {
    this.checkTodo.emit(el);
  }

  isDeleted(el: ITodo) {
    this.deleteTodo.emit(el);
  }
}
