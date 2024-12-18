import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerVehicles } from 'src/app/models/owner-vehicles.model';
import { OwnerVehiclesService } from 'src/app/services/owner-vehicles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  ownerVehicle:OwnerVehicles[]
  constructor(private ownerVehicleService:OwnerVehiclesService, private router:Router) {
    this.ownerVehicle=[]
 
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.ownerVehicleService.list().subscribe(data=>{
      this.ownerVehicle=data
      console.log(JSON.stringify(this.ownerVehicle))
    })
    //
  }
  create(){
    this.router.navigate(["ownerVehicles/create"])
  }
  view(id:number){
    this.router.navigate(["ownerVehicles/view/"+id])
  }
  update(id:number){
    this.router.navigate(["ownerVehicles/update/"+id])
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
          this.ownerVehicleService.delete(id). 
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

}
