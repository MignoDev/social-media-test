import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { loginAuthentication } from './business/loginAuthentication';
import { PublishPostComponent } from './components/publish-post/publish-post.component';
import { PostComponent } from './components/post/post.component';

import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { AutheticatorComponent } from './tools/autheticator/autheticator.component';

import { DropdownModule } from 'primeng/dropdown';

import { FormsModule } from '@angular/forms';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FriendComponent } from './components/friend/friend.component';

import { perfilService } from './Service/perfilService/perfilService.service';

import { HttpClientModule, } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AutheticatorComponent,
    MainComponent,
    NavigationBarComponent,
    PostComponent,
    PublishPostComponent,
    FriendComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    MatDividerModule,
  ],
  providers: [
    provideAnimationsAsync(),
    loginAuthentication,
    perfilService,
    FormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
