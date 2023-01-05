import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Models, Permission, Query, Role } from 'appwrite';
import { Todo } from 'src/app/models/Todo';
import { Api } from 'src/app/helpers/api';
import { Server } from '../../utils/config';
import { GlobalActions } from '../global';

/** State Model */
export class TodoStateModel {
  todos: Array<Models.Document>;
}

export namespace Todos {
  /** Actions */
  export class Fetch {
    static readonly type = '[Todo] FetchTodos';
  }

  export class Add {
    static readonly type = '[Todo] AddTodo';
    constructor(public payload: { data: Todo; permissions: string[] }) {}
  }

  export class Update {
    static readonly type = '[Todo] UpdateTodo';
    constructor(
      public payload: {
        documentId: string;
        data: Todo;
        permissions: string[];
      }
    ) {}
  }

  export class Delete {
    static readonly type = '[Todo] DeleteTodo';
    constructor(public payload: { documentId: string }) {}
  }
}

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    todos: [],
  },
})
@Injectable()
export class TodoState {
  @Selector()
  static getTodos(state: TodoStateModel) {
    return state.todos;
  }

  @Action(Todos.Fetch)
  async fetchTodos(
    { setState, dispatch }: StateContext<TodoStateModel>,
    action: Todos.Fetch
  ) {
    try {
      let todos = await Api.db().listDocuments(
        Server.databaseID,
        Server.collectionID
        // [Query.equal('isComplete', true)]
      );
      setState({
        todos: todos.documents,
      });
    } catch (e: any) {
      console.log('Failed to fetch todos');
      dispatch(
        new GlobalActions.setAlert({
          message: e.message,
          show: true,
          color: 'red',
        })
      );
    }
  }

  @Action(Todos.Add)
  async addTodo(
    { patchState, getState, dispatch }: StateContext<TodoStateModel>,
    action: Todos.Add
  ) {
    try {
      let { data, permissions } = action.payload;
      let todo = await Api.db().createDocument(
        Server.databaseID,
        Server.collectionID,
        Api.uniqueId(),
        data,
        permissions
      );
      const todos = getState().todos;
      patchState({
        todos: [...todos, todo],
      });
    } catch (e: any) {
      console.log('Failed to add todo');
      dispatch(
        new GlobalActions.setAlert({
          message: e.message,
          show: true,
          color: 'red',
        })
      );
    }
  }

  @Action(Todos.Update)
  async updateTodo(
    { patchState, getState, dispatch }: StateContext<TodoStateModel>,
    action: Todos.Update
  ) {
    let { documentId, data, permissions } = action.payload;
    try {
      console.log(
        'update info ',
        Server.databaseID,
        Server.collectionID,
        documentId,
        data
      );

      let updatedTodo = await Api.db().updateDocument(
        Server.databaseID,
        Server.collectionID,
        documentId,
        {
          content: data.content,
          isComplete: data.isComplete,
        },
        []
        // permissions,
      );
      let todoList = [...getState().todos];
      const index = todoList.findIndex((todo) => todo.$id === updatedTodo.$id);
      if (index !== -1) {
        todoList[index] = updatedTodo;
        patchState({
          todos: todoList,
        });
      }
    } catch (e: any) {
      console.log('Failed to update todo');
      dispatch(
        new GlobalActions.setAlert({
          message: e.message,
          show: true,
          color: 'red',
        })
      );
    }
  }

  @Action(Todos.Delete)
  async deleteTodo(
    { patchState, getState, dispatch }: StateContext<TodoStateModel>,
    action: Todos.Delete
  ) {
    let { documentId } = action.payload;
    try {
      await Api.db().deleteDocument(
        Server.databaseID,
        Server.collectionID,
        documentId
      );
      let todos = getState().todos;
      todos = todos.filter((todo) => todo.$id !== documentId);
      patchState({
        todos,
      });
    } catch (e: any) {
      console.log('Failed to delete todo');
      dispatch(
        new GlobalActions.setAlert({
          message: e.message,
          show: true,
          color: 'red',
        })
      );
    }
  }
}
