import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from 'src/app/models/route.model';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  mode:number //mode=1 -> View, mode=2 -> create, mode=3-> update
  route:Route
  constructor(private activatedRoute:ActivatedRoute, 
    private routeService:RouteService,
    private router:Router) { 
    this.mode=1;
    this.route={
      id:0,
      contract_id:0,
      vehicle_id:0
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
      this.route.id = this.activatedRoute.snapshot.params.id
      this.getVehicle(this.route.id)
    }
  }
  getVehicle(id:number){
    this.routeService.view(id).subscribe(data=>{
      this.route=data //El JSON corresponde a un dato
      console.log("Vehiculo"+JSON.stringify(this.route))
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
        this.routeService.create(this.route).subscribe(data =>{
          Swal.fire("guardados!", "Se ha creado correctamente", "success");
          this.router.navigate(["routes/list"])
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
        this.routeService.update(this.route).subscribe(data =>{
          Swal.fire("guardados!", "Se ha actualizado correctamente", "success");
          this.router.navigate(["routes/list"])
        })
      } else if (result.isDenied) {
        Swal.fire("Los cambios no se guardaron", "", "info");
      }
    });
  }

}
