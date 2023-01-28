// import {interval, timer} from 'rxjs';

// const observable = timer(2000, 1000);

// const subscription = observable.subscribe(console.log);

/////////////////////////////////////////////////////////////////

// import {fromEvent} from 'rxjs';

// const observable = fromEvent(document, 'click');

// const subscription = observable.subscribe(console.log);

/////////////////////////////////////////////////////////////////

// import {of} from 'rxjs';

// const observable =  of(1,2,3,4,5);
// const subscription = observable.subscribe({
//     next(value){
//         console.log(value);
//     },
//     complete() {
//         console.log('complete');
//     }
// });
////////////////////////////////////////////////////////////////////
// import {from} from 'rxjs';

// //const observable =  from([1,2,3,4,5]);
// const observable =  from(fetch('https://jsonplaceholder.typicode.com/todos/1'));

// const subscription = observable.subscribe({
//     next(value){
//         console.log(value.json());
//     },
//     complete() {
//         console.log('complete');
//     }
// });

/////////////////////////////////////////////////////////////////////
// import {from, map} from 'rxjs';

// const observable =  from([1,2,3,4,5]);
// const withSymbol = observable.pipe(
//     map(value => `$${value}`)
// )
// const subscription = withSymbol.subscribe(console.log);
///////////////////////////////////////////////////////////////////
// import {fromEvent, map, pluck} from 'rxjs';
// import { filter } from 'rxjs/operators';

// const observable = fromEvent(document, 'keydown').pipe(
//     pluck('code'),
//     filter(x => x === 'KeyA' || x === 'KeyS')
// );

// const subscription = observable.subscribe(console.log);
///////////////////////////////////////////////////////////////////
// import { of, interval } from 'rxjs';
// import { reduce, scan, take, tap } from 'rxjs/operators';

// const observable = interval(50).pipe(
//     take(5),
//     tap({
//         next(val){
//             console.log(val);
//         }
//     }),
//     reduce(
//         (acc, val) => acc + val, 
//         0
//     )
// );

// const subscription = observable.subscribe(console.log);
///////////////////////////////////////////////////////////////////
// import { fromEvent, map, mergeMap } from 'rxjs';
// import { ajax } from 'rxjs/ajax';

// const observable = fromEvent(document.getElementById('btn'),'click')
//                     .pipe(
//                         mergeMap(() => ajax.getJSON('https://jsonplaceholder.typicode.com/todos/1')) //returns observable
//                     );

// const subscription = observable.subscribe(console.log); 
//////////////////////////////////////////////////////////////////
import { concatMap, exhaustMap, fromEvent, interval, switchMap, take, tap } from 'rxjs';

const observable = fromEvent(document.getElementById('btn'),'click')
                    .pipe(
                        exhaustMap(() => 
                        interval(500)
                        .pipe(
                            take(5), 
                            tap({
                                complete(){console.log('inner observable completed')}
                            }))),
                        );

const subscription = observable.subscribe(console.log); 
