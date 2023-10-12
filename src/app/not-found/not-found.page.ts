import { Component, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';
import { QueryList } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { IonCard } from '@ionic/angular';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements AfterViewInit {
  @ViewChildren(IonCard, { read: ElementRef }) cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;

  private cardA!: Animation;
 
  constructor(private animationCtrl: AnimationController) {}

  ngAfterViewInit() {
    this.cardA = this.animationCtrl
      .create()
      .addElement(this.cardElements.toArray()[0].nativeElement)
      .fill('none')
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'scale(1) rotate(0)' },
        { offset: 0.5, transform: 'scale(1.2) rotate(45deg)' },
        { offset: 1, transform: 'scale(1) rotate(0)' },
      ]);

    }

  async play() {
    await this.cardA.play();
   
  }
}
