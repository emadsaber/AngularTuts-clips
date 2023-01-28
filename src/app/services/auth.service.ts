import { Injectable } from '@angular/core';
import IUser from '../models/IUser';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection;
  public authenticated$: Observable<boolean>;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.usersCollection = this.db.collection<IUser>('users');
    this.authenticated$ = auth.user.pipe(
      map(status => !!status)
    );
  }

  async createUser(userData: IUser) {
    const credentials = await this.auth.createUserWithEmailAndPassword(
      userData.email,
      userData.password
    );

    await this.usersCollection.doc(credentials.user?.uid).set({
      name: userData.name,
      age: userData.age,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
    });

    await credentials.user?.updateProfile({displayName: userData.name});
  }
}
