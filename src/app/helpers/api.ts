import { Client, Account, Databases, ID } from 'appwrite';
import { Server } from '../utils/config';

export class Api {
  private static clt: Client | null;
  private static database: Databases | null;
  private static ac: Account | null;

  static db() {
    if (this.database) return this.database;
    this.database = new Databases(this.client());
    return this.database;
  }

  static uniqueId() {
    return ID.unique();
  }
  static account() {
    if (this.ac) return this.ac;
    this.ac = new Account(this.client());
    return this.ac;
  }
  static client() {
    if (this.clt) return this.clt;
    let client = new Client();
    client
      .setEndpoint(Server.endpoint)
      .setProject(Server.project)
      .setLocale('en-US');
    this.clt = client;
    return this.clt;
  }
}
