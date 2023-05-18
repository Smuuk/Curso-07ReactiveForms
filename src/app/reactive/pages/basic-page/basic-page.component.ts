import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const rtx5050 = {
  name: 'RTX 5050',
  price: 2500,
  inStorage: 6
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})

export class BasicPageComponent implements OnInit {

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  public myFormBuild: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });




  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    //en este caso se uso el reset para que al iniciar el programa se cargue el valor especificado
    // this.myFormBuild.reset(rtx5050);
  }

  isValidField(field: string): boolean | null {
    return this.myFormBuild.controls[field].errors
      && this.myFormBuild.controls[field].touched
  }
  getFieldError(field: string): string | null {
    if (!this.myFormBuild.controls[field]) return null;

    const errors = this.myFormBuild.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracters.`;
      }
    }
    return null;
  }

  onSave(): void {
    if (this.myFormBuild.invalid) return
    console.log(this.myFormBuild.value);
    //reset para resetear el formulario y se le asignan esos valores a la hora de resetearlo
    this.myFormBuild.reset({ price: 10, inStorage: 0 });
  }

}
