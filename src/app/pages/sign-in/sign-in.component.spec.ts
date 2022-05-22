import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './sign-in.component';

/* tslint:disable:no-unused-variable */
describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      imports: [
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve imprimir o valor do form no console', () => {
    component.signForm.patchValue({
      username: 'xis',
      password: 'xis'
    })

    const signInSpy = jest.spyOn(component, 'signin');

    component.signin()

    expect(component.signForm.valid).toBeTruthy()
    expect(signInSpy).toHaveBeenCalled();
  })
});
