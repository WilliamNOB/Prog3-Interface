import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/models/expense.model';
import { ExpenseService } from 'src/app/services/expense.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  expense: Expense;
  mode: number; // mode=1 -> View, mode=2 -> create, mode=3 -> update
  theFormGroup: FormGroup;
  trySend: boolean; // Indica si la persona hizo un intento de enviar información

  constructor(
    private expeseService: ExpenseService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.expense = { id: 0, restaurant_id: 0, hotel_id: 0, amount_hotel: 0, amount_restaurant: 0, date_service_hotel: "", date_service_restaurant: ""};
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
      this.expense.id = this.activateRoute.snapshot.params.id;
      this.getExpense(this.expense.id);
    }

    // Configurar el estado de los campos basado en el modo
    this.setFormMode();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [{ value: '', disabled: true }], // Siempre deshabilitado
      hotel_id: ['', [Validators.required]],
      restaurant_id: ['', [Validators.required]],
      amount_hotel: ['', [Validators.required]],
      amount_restaurant: ['', [Validators.required]],
      date_service_hotel: ['', [Validators.required]],
      date_service_restaurant: ['', [Validators.required]],
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
      //this.theFormGroup.controls['id'].disable();
    }
  }
  

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getExpense(id: number) {
    this.expeseService.view(id).subscribe((data) => {
      this.expense = data;
      this.theFormGroup.patchValue(this.expense); // Sincroniza datos del modelo con el formulario
    });
  }

  create() {
    this.expeseService.create(this.theFormGroup.value).subscribe(() => {
      Swal.fire('Creado', 'Se ha creado exitosamente', 'success');
      this.router.navigate(['travelExpenses/list']);
    });
  }

  update() {
    this.expeseService.update(this.theFormGroup.value).subscribe(() => {
      Swal.fire('Actualizado', 'Se ha actualizado exitosamente', 'success');
      this.router.navigate(['travelExpenses/list']);
    });
  }
}