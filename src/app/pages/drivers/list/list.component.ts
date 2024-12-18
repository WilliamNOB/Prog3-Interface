import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { DriverService } from 'src/app/services/driver.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  driver:Driver[]

  constructor(private driverService:DriverService, private router:Router ) { 
    this.driver=[]
  }

  ngOnInit(): void {
  this.list()
  }
  list(){
    this.driverService.list().subscribe(data =>{
      this.driver=data
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
        this.driverService.delete(id). 
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
    this.router.navigate(["drivers/update/"+id])
  }
  view(id:number){
    this.router.navigate(["drivers/view/"+id])
  }

  create(){
    this.router.navigate(["drivers/create"])
  }

}
