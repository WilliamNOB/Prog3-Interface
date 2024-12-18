import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehiclesDriver } from 'src/app/models/vehicles-driver.model';
import { VehiclesDriverService } from 'src/app/services/vehicles-driver.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  vehicledriver:VehiclesDriver[]
  constructor(private vehicledriverService:VehiclesDriverService, private router:Router) {
    this.vehicledriver=[]
 
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.vehicledriverService.list().subscribe(data=>{
      this.vehicledriver=data
      console.log(JSON.stringify(this.vehicledriver))
    })
    //
  }
  create(){
    this.router.navigate(["VehiclesDriver/create"])
  }
  view(id:number){
    this.router.navigate(["VehiclesDriver/view/"+id])
  }
  update(id:number){
    this.router.navigate(["VehiclesDriver/update/"+id])
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
          this.vehicledriverService.delete(id). 
      subscribe(data =>{
          swalWithBootstrapButtons.fire({
            title: "Eliminado!",
            text: "Su registro ha sido eliminado.",
            icon: "success",
            
          })
          this.ngOnInit()
        })
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
