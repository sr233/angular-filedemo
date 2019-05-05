import { Component, OnInit } from '@angular/core';
import { Hero, HEROES } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService} from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero; // Hero 是ts文件中定义的对象，HEROES是对象数组 heroes = HEROES;
  heroes: Hero[];

  constructor(private heroService: HeroService, public messageService: MessageService) { }

  ngOnInit() {
    this.getHeroes();
  }
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add('you choose hero '.concat(this.selectedHero.name));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {return; }
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
