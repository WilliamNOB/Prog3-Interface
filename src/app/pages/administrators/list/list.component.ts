import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Administrator } from "src/app/models/administrator.model";
import { AdministratorService } from "src/app/services/administrator.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  administrators:Administrator[]

  constructor(private adminService:AdministratorService, private router:Router ) { 
    this.administrators=[]
  }

  ngOnInit(): void {
  this.list()
  }
  list(){
    this.adminService.list().subscribe(data =>{
      this.administrators=data
    })
  }
  delete(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Está seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, bórralo!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.delete(id). 
    subscribe(data =>{
        swalWithBootstrapButtons.fire({
          title: "Eliminado!",
          text: "Su registro ha sido eliminado.",
          icon: "success"
        })})
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Tu registro está seguro :)",
          icon: "error"
        });
      }
      this.ngOnInit();//
    });  
  }
  update(id:number){
    this.router.navigate(["administrators/update/"+id])
  }
  view(id:number){
    this.router.navigate(["administrators/view/"+id])
  }

  create(){
    this.router.navigate(["administrators/create"])
  }

}
