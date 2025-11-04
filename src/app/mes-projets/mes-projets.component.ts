import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-mes-projets',
  templateUrl: './mes-projets.component.html',
  styleUrls: ['./mes-projets.component.css']
})
export class MesProjetsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scrollWidget', { static: false }) scrollWidget!: ElementRef;

  currentPageIndex = 0;
  autoScrollInterval: any;

  pages = [
    {
      titre: 'Ordinateur de plongée',
      lines: ["Ceci est un ordinateur de plongée permettant l'analyse d'une plongée après avoir rentrée les données ainsi qu'une analyse pré-plongée", ''],
      link: '/plongée',
      image:'assets/media/background.jpg'
    },
    {
      titre: 'Projet 2',
      lines: ['Description projet 2...', ''],
      link: '/',
      image:'assets/media/background.jpg'

    },
    {
      titre: 'Mes Projets',
      lines: ['Description projet 3...', ''],
      link: '/',
      image:'assets/media/background.jpg'
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