import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Spent } from 'src/app/models/spent.model';
import { SpentService } from 'src/app/services/spent.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  spents: Spent;
  mode: number; // mode=1 -> View, mode=2 -> create, mode=3 -> update
  theFormGroup: FormGroup;
  trySend: boolean; // Indica si la persona hizo un intento de enviar información

  constructor(
    private spentsService: SpentService, // Servicio para Restaurants
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.spents = { id: 0, service_id:0, owner_id:0, travel_expense_id:0, driver_id:0};
    this.mode = 0;
    this.configFormGroup();
    this.trySend = false;
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1; // Visualizar
    } else if (currentUrl.includes('create')) {
      this.mode = 2; // Crear
    } else if (currentUrl.includes('update')) {
      this.mode = 3; // Actualizar
    }

    if (this.activateRoute.snapshot.params.id) {
      this.spents.id = this.activateRoute.snapshot.params.id;
      this.getOperation(this.spents.id);
    }

    // Configurar el estado de los campos basado en el modo
    this.setFormMode();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [{ value: '', disabled: true }], // Siempre deshabilitado
      service_id: ['', [Validators.required]],
      owner_id:['', [Validators.required]],
      travel_expense_id: ['', [Validators.required]],
      driver_id:['', [Validators.required]],
    });
  }

  setFormMode() {
    if (this.mode === 1) {
      // Visualizar: Deshabilitar todos los campos
      this.theFormGroup.disable();
    } else if (this.mode === 2) {
      // Crear: Habilitar todos los campos, incluido el ID
      this.theFormGroup.enable();
    } else if (this.mode === 3) {
      // Actualizar: Habilitar todos los campos excepto el ID
      this.theFormGroup.enable();
      //this.theFormGroup.controls['id'].disable(); //organizar
    }
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getOperation(id: number) {
    this.spentsService.view(id).subscribe((data) => {
      this.spents = data;
      this.theFormGroup.patchValue(this.spents); // Sincroniza datos del modelo con el formulario
    });
  }

  create() {
    this.spentsService.create(this.theFormGroup.value).subscribe(() => {
      Swal.fire('Creado', 'Se ha creado exitosamente', 'success');
      this.router.navigate(['spents/list']);
    });
  }

  update() {
    this.spentsService.update(this.theFormGroup.value).subscribe(() => {
      Swal.fire('Actualizado', 'Se ha actualizado exitosamente', 'success');
      this.router.navigate(['spents/list']);
    });
  }
}
