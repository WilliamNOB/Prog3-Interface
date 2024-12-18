import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from 'src/app/models/route.model';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  route:Route[]
  constructor(private routeService:RouteService, private router:Router) {
    this.route=[]
   }

  ngOnInit(): void {
    this.list()
  }
  list(){
    this.routeService.list().subscribe(data=>{
      this.route=data
      console.log(JSON.stringify(this.route))
    })
    //
  }
  create(){
    this.router.navigate(["routes/create"])
  }
  view(id:number){
    this.router.navigate(["routes/view/"+id])
  }
  update(id:number){
    this.router.navigate(["routes/update/"+id])
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
          this.routeService.delete(id). 
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
