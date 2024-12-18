import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  service:Service[]
  constructor(private serviceServices:ServiceService, private router:Router) {
    this.service=[]
 
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.serviceServices.list().subscribe(data=>{
      this.service=data
      console.log(JSON.stringify(this.service))
    })
    //
  }
  create(){
    this.router.navigate(["services/create"])
  }
  view(id:number){
    this.router.navigate(["services/view/"+id])
  }
  update(id:number){
    this.router.navigate(["services/update/"+id])
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
          this.serviceServices.delete(id). 
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
