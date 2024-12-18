import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  mode:number //mode=1 -> View, mode=2 -> create, mode=3-> update
  order:Order
  constructor(private activatedRoute:ActivatedRoute, 
    private orderService:OrderService,
    private router:Router) { 
    this.mode=1;
    this.order={
      id:0,
      type:"",
      date_order: new Date(),
      address_id:0,
      route_id:0
    };
  }

  ngOnInit(): void {
    const currentUrl = this.activatedRoute.snapshot.url.join('/');//Tomar una foto y separar por /
    if (currentUrl.includes('view')) { // Si en esa lista incluye la palabra view
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if(this.activatedRoute.snapshot.params.id){
      this.order.id = this.activatedRoute.snapshot.params.id
      this.getVehicle(this.order.id)
    }
  }
  getVehicle(id:number){
    this.orderService.view(id).subscribe(data=>{
      this.order=data //El JSON corresponde a un dato
      console.log("Vehiculo"+JSON.stringify(this.order))
    })
  }

  create(){
    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "guardar",
      denyButtonText: `No guardar`
    }).then((result) => {
      /*Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.orderService.create(this.order).subscribe(data =>{
          Swal.fire("guardados!", "Se ha creado correctamente", "success");
          this.router.navigate(["orders/list"])
        })
      } else if (result.isDenied) {
        Swal.fire("Los cambios no se guardaron", "", "info");
      }
    });
  }
  update(){
    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "guardar",
      denyButtonText: `No guardar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.orderService.update(this.order).subscribe(data =>{
          Swal.fire("guardados!", "Se ha actualizado correctamente", "success");
          this.router.navigate(["orders/list"])
        })
      } else if (result.isDenied) {
        Swal.fire("Los cambios no se guardaron", "", "info");
      }
    });
  }
}
