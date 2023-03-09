import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationsPageComponent } from './publications-page.component';
import {PublicationModule} from "../../feature/publication/publication.module";

@NgModule({
  declarations: [PublicationsPageComponent],
  imports: [CommonModule],
})
export class PublicationsPageModule {}
