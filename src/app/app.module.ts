import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';

import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { AutheticatorComponent } from './tools/autheticator/autheticator.component';

import { FormsModule } from '@angular/forms';
import { MainComponent } from './pages/main/main.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { PostComponent } from './components/post/post.component';
import { PublishPostComponent } from './components/publish-post/publish-post.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AutheticatorComponent,
    MainComponent,
    NavigationBarComponent,
    PostComponent,
    PublishPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    FormsModule,
    MatIconModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
