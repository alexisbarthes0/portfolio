import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scrollWidget', { static: false }) scrollWidget!: ElementRef;

  currentPageIndex = 0;
  autoScrollInterval: any;

  pages = [
    {
      title: 'Ma scolarité',
      lines: ['Retrouvez toute ma scolarité...', ''],
      link: '/scolarite'
    },
    {
      title: 'Expériences professionnelles',
      lines: ['Retrouvez ici toutes mes expériences...', ''],
      link: '/pro'
    },
    {
      title: 'Mes Projets',
      lines: ['Retrouvez ici tous mes projets...', ''],
      link: '/projets'
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