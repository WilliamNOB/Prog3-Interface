import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

//Importaciones de la clase
import { NaturalPerson } from "src/app/models/natural-person.model";
import { NaturalpersonService } from "src/app/services/natural-person.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  naturalpeople: NaturalPerson[];

  constructor(private service: NaturalpersonService, private router: Router) {
    this.naturalpeople = [];
  }

  ngOnInit(): void {
    this.list();
  }

  view(id: number) {
    this.router.navigate(["naturalPeoples/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["naturalPeoples/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      console.log(data);
      this.naturalpeople = data;
    });
  }

  create() {
    this.router.navigate(["naturalPeoples/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Persona Natural",
      text: "¿Estas seguro de eliminar la Persona Natural?",
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
