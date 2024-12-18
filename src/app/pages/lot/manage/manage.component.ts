import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Lot } from "src/app/models/lot.model";
import { LotService } from "src/app/services/lot.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3->Update
  lot: Lot;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private lotsService: LotService,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.lot = {
      id: 0,
      weight: 0,
      quantity_kg: 0,
      route_id: null,
      order_id: null,
    };
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("weight").disable();
      this.theFormGroup.get("quantity_kg").disable();
      // this.theFormGroup.get("route_id").disable();
      // this.theFormGroup.get("order_id").disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.lot.id = this.activateRoute.snapshot.params.id;
      this.getLot(this.lot.id);
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
    console.log(JSON.stringify(this.lot));
    this.lotsService.create(this.lot).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["lots/list"]);
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
    console.log(JSON.stringify(this.lot));
    this.lotsService.update(this.lot).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["lots/list"]);
    });
  }

  getLot(id: number) {
    this.lotsService.view(id).subscribe((data) => {
      this.lot = data;
      console.log(JSON.stringify(this.lot));
      this.theFormGroup.patchValue({
        // id: this.lot.id,
        weight: this.lot.weight,
        quantity_kg: this.lot.quantity_kg,
        // route_id: this.lot.route_id,
        // order_id: this.lot.order_id,
      });
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      id: [this.lot.id || ""],
      weight: [
        0,
        [Validators.required, Validators.min(1), Validators.max(1000000)],
      ],
      quantity_kg: [
        0,
        [Validators.required, Validators.min(1), Validators.max(1000000)],
      ],
      // route_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
      // order_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
    });
  }
  //aqui nos indica que regla molesto
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}
