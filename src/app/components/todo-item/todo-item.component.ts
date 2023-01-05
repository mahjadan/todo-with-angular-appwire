import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Permission, Role } from 'appwrite';
import { Todo } from 'src/app/models/Todo';
import { AccountState, Todos } from 'src/app/store';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  deleteTodo(documentId: string) {
    console.log(documentId);
    this.store.dispatch(new Todos.Delete({ documentId }));
  }

  toggleTodo(documentId: string, todo: Todo) {
    console.log(documentId);
    console.log('Toggle Todo ');
    console.log('todo before update:', todo);

    const data: Todo = {
      ...todo,
      isComplete: !todo.isComplete,
    };
    console.log('todo after update:', data);
    let userId = this.store.selectSnapshot(AccountState.userId);
    const permissions = [
      Permission.read(Role.any()), // Anyone can view this document
      Permission.update(Role.team('writers')), // Writers can update this document
      Permission.update(Role.team('admin')), // Admins can update this document
      Permission.update(Role.user(userId)), // Admins can update this document
      Permission.delete(Role.user(userId)), // User 5c1f88b42259e can delete this document
      Permission.delete(Role.team('admin')), // Admins can delete this document
    ];
    this.store.dispatch(new Todos.Update({ documentId, data, permissions }));
  }
}
