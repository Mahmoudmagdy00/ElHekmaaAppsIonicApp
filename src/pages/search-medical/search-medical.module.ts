import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchMedicalPage } from './search-medical';

@NgModule({
  declarations: [
    SearchMedicalPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchMedicalPage),
  ],
})
export class SearchMedicalPageModule {}
