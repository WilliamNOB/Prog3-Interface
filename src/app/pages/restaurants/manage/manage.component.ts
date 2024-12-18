import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant.model'; // Modelo de Restaurant
import { RestaurantService } from 'src/app/services/restaurant.service'; // Servicio de Restaurant
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  restaurant: Restaurant;
  mode: number; // mode=1 -> View, mode=2 -> create, mode=3 -> update
  theFormGroup: FormGroup;
  trySend: boolean; // Indica si la persona hizo un intento de enviar información

  constructor(
    private restaurantService: RestaurantService, // Servicio para Restaurants
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.restaurant = { id: 0, name: '', ubicacion: '', telefono: '' };
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
      this.restaurant.id = this.activateRoute.snapshot.params.id;
      this.getRestaurant(this.restaurant.id);
    }

    // Configurar el estado de los campos basado en el modo
    this.setFormMode();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [{ value: '', disabled: true }], // Siempre deshabilitado
      name: ['', [Validators.required, Validators.minLength(3)]],
      ubicacion: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Acepta solo 10 dígitos
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

  getRestaurant(id: number) {
    this.restaurantService.view(id).subscribe((data) => {
      this.restaurant = data;
      this.theFormGroup.patchValue(this.restaurant); // Sincroniza datos del modelo con el formulario
    });
  }

  create() {
    this.restaurantService.create(this.theFormGroup.value).subscribe(() => {
      Swal.fire('Creado', 'Se ha creado exitosamente', 'success');
      this.router.navigate(['restaurants/list']);
    });
  }

  update() {
    this.restaurantService.update(this.theFormGroup.value).subscribe(() => {
      Swal.fire('Actualizado', 'Se ha actualizado exitosamente', 'success');
      this.router.navigate(['restaurants/list']);
    });
  }
}
