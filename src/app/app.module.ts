import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HttpModule, JsonpModule } from '@angular/http';

import { HomePage } from '../pages/home/home';
import { RandRange } from '../pages/randrange/randrange.ts';
import { CoinToss } from '../pages/cointoss/cointoss';
import { Crawler } from '../providers/crawler/crawler.ts';
import { StoredNumbers } from '../providers/storednums/storednums.ts';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RandRange,
    CoinToss
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
    RandRange,
    CoinToss
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Crawler,
    StoredNumbers
  ]
})
export class AppModule {}
