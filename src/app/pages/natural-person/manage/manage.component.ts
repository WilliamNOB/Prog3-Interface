import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

//Importaciones de la clase
import { NaturalPerson } from "src/app/models/natural-person.model";
import { NaturalpersonService } from "src/app/services/natural-person.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3->Update
  naturalperson: NaturalPerson;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private naturalpersonService: NaturalpersonService,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.naturalperson = {
      id: 0,
      user_id: "",
      document_type: "",
      document_number: "",
      born_date: new Date(),
      company_id: null,
      customer_id: null,
    };
  }

  ngOnInit(): void {
    this.configFormGroup();

    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("user_id").disable();
      this.theFormGroup.get("document_type").disable();
      this.theFormGroup.get("document_number").disable();
      this.theFormGroup.get("born_date").disable();
      // this.theFormGroup.get("company_id").disable();
      // this.theFormGroup.get("customer_id").disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.naturalperson.id = this.activateRoute.snapshot.params.id;
      this.getPerson(this.naturalperson.id);
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
    console.log(JSON.stringify(this.naturalperson));
    this.naturalpersonService.create(this.naturalperson).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["naturalPeoples/list"]);
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
    console.log(JSON.stringify(this.naturalperson));
    this.naturalpersonService.update(this.naturalperson).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["naturalPeoples/list"]);
    });
  }

  getPerson(id: number) {
    this.naturalpersonService.view(id).subscribe((data) => {
      this.naturalperson = data;
      const datePipe = new DatePipe("en-US");
      const formattedDate = datePipe.transform(
        this.naturalperson.born_date,
        "yyyy-MM-dd"
      );
      this.theFormGroup.patchValue({
        // id: this.naturalperson.id,
        user_id: this.naturalperson.user_id,
        document_type: this.naturalperson.document_type,
        document_number: this.naturalperson.document_number,
        born_date: formattedDate, // Fecha formateada
        // company_id: this.naturalperson.company_id,
        // customer_id: this.naturalperson.customer_id,
      });
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // id: [this.naturalperson.id || ""],
      user_id: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")],
      ],
      document_type: ["", [Validators.required]],
      document_number: ["", [Validators.required]],
      born_date: ["", [Validators.required]],
      // company_id: [null, [Validators.required]],
      // customer_id: [null, [Validators.required]],
    });
  }
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}
