import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Quota } from "src/app/models/quota.model";
import { QuotaService } from "src/app/services/quota.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  quotas: Quota[];
  constructor(private service: QuotaService, private router: Router) {
    this.quotas = [];
  }

  ngOnInit(): void {
    this.list();
  }

  view(id: number) {
    this.router.navigate(["quotas/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["quotas/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      console.log(data);
      this.quotas = data;
    });
  }

  create() {
    this.router.navigate(["quotas/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar quota",
      text: "¿Estas seguro de eliminar la quota?",
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
            "Persona Natural eliminada correctamente.",
            "success"
          );
          this.list();
        });
      }
    });
  }
}
