import { Injectable } from '@angular/core';
import { Hero, HEROES} from './hero';
import {Observable, of} from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {InMemoryDataService} from './in-memory-data.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes'; /*和InMemoryDataService中的 返回一致*/

  getHeroes(): Observable<Hero[]> { /*hero list*/
    /*this.messageService.add('HeroService: fetched heros');
    return of(HEROES);*/
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      )
      ;
  }
  getHero(id: number): Observable<Hero> { /*jump detail page by id*/
    const url = `${this.heroesUrl}/${id}`;
    this.messageService.add(`HeroService: fetched the hero id=${id}`);
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
    /*return of(HEROES.find(hero => hero.id === id));*/
  }
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((heroo: Hero) => this.log(`add hero id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );

  }

  private log(message: string) {
    this.messageService.add('HeroService:' + message);
  }

  private handleError<T> ( operation= 'operation', result?: T) {
    return (error: any): Observable <T> => {
      console.error(error);
      this.log(`${operation} falied: ${error.message}`);
      return of(result as T);
    };
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

}
