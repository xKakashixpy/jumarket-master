import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClienteAllPage } from './cliente-all.page';

describe('ClienteAllPage', () => {
  let component: ClienteAllPage;
  let fixture: ComponentFixture<ClienteAllPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClienteAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
