import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Quota } from "src/app/models/quota.model";
import { QuotaService } from "src/app/services/quota.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->view, 2->Create, 3-> Update
  quotas: Quota;
  theFormGroup: FormGroup;
  trySend: boolean;
  constructor(
    private quotasService: QuotaService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.quotas = {
      id: 0,
      payment_date: new Date(),
      contract_id: 0,
    };
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("payment_date").disable();
      this.theFormGroup.get("contract_id").disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      // this.theFormGroup.get("id").disable();
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      // this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.quotas.id = this.activateRoute.snapshot.params.id;
      this.getQuota(this.quotas.id);
    }
  }
  getQuota(id: number) {
    this.quotasService.view(id).subscribe((data) => {
      this.quotas = data;
      const datePipe = new DatePipe("en-US");
      const formattedDate = datePipe.transform(
        this.quotas.payment_date,
        "yyyy-MM-dd"
      );
      this.theFormGroup.patchValue({
        payment_date: formattedDate, // Fecha formateada
        contract_id: this.quotas.contract_id,
      });
    });
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
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene correctamente los campos", "error");
    } else {
      this.quotasService.create(this.quotas).subscribe(() => {
        Swal.fire("Creado", "Se ha creado exitosamente", "success");
        this.router.navigate(["quotas/list"]);
      });
    }
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
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene correctamente los campos", "error");
    } else {
      this.quotasService.update(this.quotas).subscribe(() => {
        Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
        this.router.navigate(["quotas/list"]);
      });
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // id: [this.quotas.id || ""], // Siempre deshabilitado
      payment_date: ["", [Validators.required]],
      contract_id: ["", [Validators.required]],
    });
  }

  //aqui nos indica que regla molesto
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}
