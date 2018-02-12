import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsLoginPage } from './tabs-login';

@NgModule({
  declarations: [
    TabsLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsLoginPage),
  ],
})
export class TabsLoginPageModule {}
