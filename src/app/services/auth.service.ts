import { Injectable } from '@angular/core';
import IUser from '../models/IUser';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { delay, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection;
  public authenticated$: Observable<boolean>;
  public authenticatedWithDelay$: Observable<boolean>;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.usersCollection = this.db.collection<IUser>('users');
    this.authenticated$ = auth.user.pipe(
      map(status => !!status)
    );
    this.authenticatedWithDelay$ = this.authenticated$.pipe(delay(1000))
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(e => this.activatedRoute.root.firstChild?.firstChild),
      tap(console.log),
      switchMap(route => route?.data ?? of({}))
    ).
    subscribe(data => {
      console.log(data);
    });
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
  
  async logout($event?: Event){
    if($event) $event.preventDefault();

    await this.auth.signOut();

    this.router.navigateByUrl('/');
  }
}
