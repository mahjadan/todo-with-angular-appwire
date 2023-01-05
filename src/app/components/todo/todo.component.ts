import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Permission, Role } from 'appwrite';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/Todo';
import { Account, AccountState, Todos, TodoState } from 'src/app/store';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  @Select(TodoState.getTodos) todos$: Observable<Todo[]>;

  addTodoForm: FormGroup;

  constructor(private store: Store, private formbuilder: FormBuilder) {
    this.addTodoForm = this.formbuilder.group({
      content: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.store.dispatch(new Todos.Fetch());
  }

  addTodo() {
    const data = {
      content: this.addTodoForm.value.content,
      isComplete: false,
    } as Todo;
    const userId = this.store.selectSnapshot(AccountState.userId);
    const permissions: string[] = [
      Permission.read(Role.any()), // Anyone can view this document
      // Permission.update(Role.team('writers')), // Writers can update this document
      // Permission.update(Role.team('admin')), // Admins can update this document
      Permission.update(Role.user(userId)), // Admins can update this document
      Permission.delete(Role.user(userId)), // User 5c1f88b42259e can delete this document
      // Permission.delete(Role.team('admin')), // Admins can delete this document
    ];
    this.store.dispatch(new Todos.Add({ data, permissions }));
  }

  handleLogout() {
    this.store.dispatch(new Account.Logout());
  }
}
