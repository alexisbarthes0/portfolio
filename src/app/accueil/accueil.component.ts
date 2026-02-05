import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scrollWidget', { static: false }) scrollWidget!: ElementRef;
  projects: any[] = [];

  currentPageIndex = 0;
  autoScrollInterval: any;

  pages = [
    {
      titre: 'Ma scolarité',
      lines: ['Retrouvez toute ma scolarité...', ''],
      link: '/scolarite'
    },
    {
      titre: 'Expériences professionnelles',
      lines: ['Retrouvez ici toutes mes expériences...', ''],
      link: '/pro'
    },
    {
      titre: 'Mes Projets',
      lines: ['Retrouvez ici tous mes projets...', ''],
      link: '/mes-projets'
    }
  ];

  ngAfterViewInit() {
    this.scrollToPage(this.currentPageIndex);

// autoscroll totues les 5sec
    this.autoScrollInterval = setInterval(() => {
      this.scrollRight();
    }, 5000);
  }
pauseAutoScroll() {
  clearInterval(this.autoScrollInterval);
}

resumeAutoScroll() {
  this.autoScrollInterval = setInterval(() => {
    this.scrollRight();
  }, 5000);
}
  ngOnDestroy() {
    // on enlève le timer si le composant est détruit
    clearInterval(this.autoScrollInterval);
  }

  scrollToPage(index: number) {
    const container = this.scrollWidget.nativeElement;
    const page = container.children[index];
    if (page) {
      container.scrollTo({
        left: page.offsetLeft,
        behavior: 'smooth'
      });
    }
  }

  scrollLeft() {
    this.currentPageIndex =
      (this.currentPageIndex - 1 + this.pages.length) % this.pages.length;
    this.scrollToPage(this.currentPageIndex);
  }

  scrollRight() {
    this.currentPageIndex =
      (this.currentPageIndex + 1) % this.pages.length;
    this.scrollToPage(this.currentPageIndex);
  }
  private adminSequence = ['a', 'd', 'm', 'i', 'n'];
  private typedKeys: string[] = [];
   constructor(private router: Router) {}

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    // (optionnel) ignorer si on tape dans un input / textarea
    const target = event.target as HTMLElement;
    if (['INPUT', 'TEXTAREA'].includes(target.tagName)) {
      return;
    }

    this.typedKeys.push(key);
    if (this.typedKeys.length > this.adminSequence.length) {
      this.typedKeys.shift();
    }

    const isMatch = this.adminSequence.every(
      (k, i) => this.typedKeys[i] === k
    );

    if (isMatch) {
      this.router.navigate(['/admin']);
    }
  }
}