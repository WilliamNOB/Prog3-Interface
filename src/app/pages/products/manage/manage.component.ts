import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "src/app/models/product.model";
import { ProductService } from "src/app/services/product.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->view, 2->Create, 3-> Update
  products: Product;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private productsService: ProductService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 0;
    this.products = {
      id: 0,
      name: "",
      description: "",
      price: 0,
      cuantity: 0,
      lot_id: null,
      customer_id: null,
    };
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("name").disable();
      this.theFormGroup.get("description").disable();
      this.theFormGroup.get("price").disable();
      this.theFormGroup.get("cuantity").disable();
      this.theFormGroup.get("lot_id").disable();
      // this.theFormGroup.get("customer_id").disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.products.id = this.activateRoute.snapshot.params.id;
      this.getProduct(this.products.id);
    }
  }
  getProduct(id: number) {
    this.productsService.view(id).subscribe((data) => {
      this.products = data;
      this.theFormGroup.patchValue({
        name: this.products.name,
        description: this.products.description,
        price: this.products.price,
        cuantity: this.products.cuantity,
        lot_id: this.products.lot_id,
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
      this.productsService.create(this.products).subscribe(() => {
        Swal.fire("Creado", "Se ha creado exitosamente", "success");
        this.router.navigate(["products/list"]);
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
      this.productsService.update(this.products).subscribe(() => {
        Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
        this.router.navigate(["products/list"]);
      });
    }
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [this.products.id || ""], // Siempre deshabilitado
      name: ["", [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      description: ["", [Validators.required]],
      price: [
        0,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(1000000000000000),
        ],
      ],
      cuantity: [
        0,
        [Validators.required, Validators.min(1), Validators.max(10000)],
      ],
      lot_id: [0, [Validators.pattern("^[0-9]+$")]],
      // customer_id: [0, [Validators.pattern("^[0-9]+$")]],
    });
  }

  //aqui nos indica que regla molesto
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}
