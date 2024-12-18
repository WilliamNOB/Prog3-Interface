import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

//Importaciones de la clase
import { Customer } from "src/app/models/customer.model";
import { customerService } from "src/app/services/customer.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  customers: Customer[];

  constructor(private service: customerService, private router: Router) {
    this.customers = [];
  }

  ngOnInit(): void {
    this.list();
  }

  view(id: number) {
    this.router.navigate(["customers/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["customers/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      console.log(data);
      this.customers = data;
    });
  }

  create() {
    this.router.navigate(["customers/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar customere",
      text: "¿Estas seguro de eliminar el customere?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((data) => {
          Swal.fire(
            "Eliminado!",
            "customere eliminado correctamente.",
            "success"
          );
          this.list();
        });
      }
    });
  }
}
