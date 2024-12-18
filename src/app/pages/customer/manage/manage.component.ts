import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

// Importaciones de la clase
import { Customer } from "src/app/models/customer.model";
import { customerService } from "src/app/services/customer.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  customer: Customer;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private customerService: customerService,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.customer = {
      id: 0,
      company_id: 0,
      person_id: 0,
    };
  }

  ngOnInit(): void {
    // Detectar el modo (view, create, update) según la URL
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("company_id").disable();
      this.theFormGroup.get("person_id").disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      this.theFormGroup.get("id").disable();
    }

    // Suscribirse a los parámetros de la ruta
    if (this.activateRoute.snapshot.params.id) {
      this.customer.id = this.activateRoute.snapshot.params.id;
      this.getcustomer(this.customer.id);
    }
  }

  create() {
    if (this.theFormGroup.invalid) {
      Swal.fire(
        "Error",
        "Formulario inválido. Por favor, verifica los campos.",
        "error"
      );
      return;
    }
    console.log(JSON.stringify(this.customer));
    this.customerService.create(this.customer).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); // tirulo a la alerta
      this.router.navigate(["customers/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      Swal.fire(
        "Error",
        "Formulario inválido. Por favor, verifica los campos.",
        "error"
      );
      return;
    }
    console.log(JSON.stringify(this.customer));
    this.customerService.update(this.customer).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); // titulo a la alerta
      this.router.navigate(["customers/list"]);
    });
  }

  getcustomer(id: number) {
    this.customerService.view(id).subscribe((data) => {
      this.customer = data;
      this.theFormGroup.patchValue({
        id: this.customer.id,
        company_id: this.customer.company_id,
        person_id: this.customer.person_id,
      });
    });
  }

  // OJO-----------------------------
  // aqui definimos las reglas
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      id: [this.customer.id || ""],
      company_id: [
        this.customer.company_id || "",
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ],
      person_id: [
        this.customer.person_id || "",
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ],
    });
  }

  // aqui nos indica que regla molesto
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}
