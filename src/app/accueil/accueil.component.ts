import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scrollWidget', { static: false }) scrollWidget!: ElementRef;

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
}