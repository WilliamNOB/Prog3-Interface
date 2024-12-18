import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehiclesService } from 'src/app/services/vehicles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  vehicles:Vehicle[]
  constructor(private vehicleService:VehiclesService, private router:Router) {
    this.vehicles=[]
 
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.vehicleService.list().subscribe(data=>{
      this.vehicles=data
      console.log(JSON.stringify(this.vehicles))
    })
    //
  }
  create(){
    this.router.navigate(["Vehicles/create"])
  }
  view(id:number){
    this.router.navigate(["Vehicles/view/"+id])
  }
  update(id:number){
    this.router.navigate(["Vehicles/update/"+id])
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
          this.vehicleService.delete(id). 
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
