import { AppRoutingModule } from './../../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        ContentComponent,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        ContentComponent,
    ]
})
export class SharedModule { }
