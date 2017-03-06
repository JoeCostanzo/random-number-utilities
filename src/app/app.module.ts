import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HttpModule, JsonpModule } from '@angular/http';

import { HomePage } from '../pages/home/home';
import { RandPage } from '../pages/rand/rand.ts';
import { Crawler } from '../providers/crawler/crawler.ts';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RandPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule,
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RandPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Crawler]
})
export class AppModule {}
