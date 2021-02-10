import { Observable, Subject, NEVER, timer } from 'rxjs';
import { switchMap, timeInterval, map } from 'rxjs/operators';

const pauser = new Subject();

pauser
  .pipe(switchMap((paused) => (paused ? NEVER : source())))
  .subscribe((x) => console.log(x));

pauser.next(false);
setTimeout(() => {
  console.log('Pause, getting some rest!');
  pauser.next(true);

  setTimeout(() => {
    console.log('End of pause, get back to work!');
    pauser.next(false);
  }, 3000);
}, 3000);

function source() {
  return new Observable((observer) => {
    timer(0, 1000)
      .pipe(
        timeInterval(),
        map(() => observer.next(new Date()))
      )
      .subscribe();
  });
}
