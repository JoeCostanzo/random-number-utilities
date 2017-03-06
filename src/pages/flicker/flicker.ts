// import {
//   Component,
//   ViewChild,
//   ElementRef,
//   AfterContentChecked,
//   OnDestroy,
//   ChangeDetectorRef
// } from '@angular/core';
//
// import { NavController } from 'ionic-angular';
// import { HomePage } from '../home/home.ts';
//
// let i = 0,
//   ctx: CanvasRenderingContext2D,
//   myCanvas;
//
// @Component({
//   selector: 'page-flicker',
//   templateUrl: 'flicker.html'
// })
// export class FlickerPage implements AfterContentChecked, OnDestroy {
//   @ViewChild('canvas') canvas: ElementRef;
//   isPortrait: boolean;
//   timeouts: number[] = [];
//
//   constructor(
//     public navCtrl: NavController,
//     public changeDetectorRef: ChangeDetectorRef
//   ) {
//   }
//
//   ngAfterContentChecked(): void {
//     if (window.matchMedia("(orientation: portrait)").matches) {
//       this.isPortrait = true;
//     } else {
//       this.isPortrait = false;
//     }
//     // forcing Angular to detect the changes
//     this.timeouts.push(setTimeout(() => this.changeDetectorRef.detectChanges(), 100));
//   }
//
//   ngOnDestroy() {
//     this.timeouts.forEach( (val) => clearTimeout(val) );
//   }
//
//   public ngAfterViewInit(): void {
//     myCanvas = this.canvas;
//     ctx = myCanvas.nativeElement.getContext('2d');
//     this.startFlashing();
//   }
//
//   startFlashing() {
//     myCanvas.width = window.innerWidth;
//     myCanvas.height = window.innerHeight;
//     setInterval(FlickerPage.loop, 1000 / 60);
//   }
//
//   static loop() {
//     ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
//     ctx.beginPath();
//     if (i % 60 === 0) {
//       ctx.fillStyle = 'red'
//     } else {
//       ctx.fillStyle = 'blue'
//     }
//     ctx.rect(0, 0, myCanvas.width, myCanvas.height);
//     ctx.fill();
//     i++;
//   }
//
//   toHome() {
//     this.navCtrl.push(HomePage);
//   }
// }
