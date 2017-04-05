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
//   myCanvas,
//   myfOut,
//   myfIn;
//
// @Component({
//   selector: 'page-flicker',
//   templateUrl: 'flicker.html'
// })
// export class FlickerPage implements AfterContentChecked, OnDestroy {
//   @ViewChild('canvas') canvas: ElementRef;
//   @ViewChild('fIn') fIn: ElementRef;
//   @ViewChild('fOut') fOut: ElementRef;
//   isPortrait: boolean;
//   timeouts: number[] = [];
//   audioCtx: any;
//   volume: any;
//   frequency: any;
//   type: any;
//   duration: any;
//
//   constructor(
//     public navCtrl: NavController,
//     public changeDetectorRef: ChangeDetectorRef
//   ) {
//     this.audioCtx = new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();
//
//   }
//
//   ngAfterContentChecked(): void {
//     this.isPortrait = window.matchMedia("(orientation: portrait)").matches;
//     // forcing Angular to detect the changes
//     this.timeouts.push(setTimeout(() => this.changeDetectorRef.detectChanges(), 100));
//   }
//
//   ngOnDestroy() {
//     this.timeouts.forEach(val => clearTimeout(val));
//   }
//
//   public ngAfterViewInit(): void {
//     myCanvas = this.canvas;
//     myfIn = this.fIn;
//     myfOut = this.fOut;
//     ctx = myCanvas.nativeElement.getContext('2d');
//     this.show();
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
//
//   show() {
//     this.frequency =  myfIn.nativeElement.value;
//     myfOut.nativeElement.innerHTML = this.frequency + ' Hz';
//
//     switch(Number((<HTMLInputElement>document.getElementById("tIn")).value)) {
//       case 0: this.type='sine'; break;
//       case 1: this.type='square'; break;
//       case 2: this.type='sawtooth'; break;
//       case 3: this.type='triangle'; break;
//     }
//     document.getElementById("tOut").innerHTML = this.type;
//
//     this.volume =  Number((<HTMLInputElement>document.getElementById("vIn")).value) / 100;
//     document.getElementById("vOut").innerHTML = this.volume;
//
//     this.duration =  (<HTMLInputElement>document.getElementById("dIn")).value;
//     document.getElementById("dOut").innerHTML = this.duration + ' ms';
//   }
//
//   beep() {
//     const oscillator = this.audioCtx.createOscillator();
//     const gainNode = this.audioCtx.createGain();
//
//     oscillator.connect(gainNode);
//     gainNode.connect(this.audioCtx.destination);
//
//     gainNode.gain.value = this.volume;
//     oscillator.frequency.value = this.frequency;
//     oscillator.type = this.type;
//
//     oscillator.start();
//
//     setTimeout(
//       () => oscillator.stop(),
//       this.duration
//     );
//   }
//
//   toHome() {
//     this.navCtrl.push(HomePage);
//   }
// }
