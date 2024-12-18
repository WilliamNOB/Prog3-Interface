import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehiclesService } from 'src/app/services/vehicles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  mode:number //mode=1 -> View, mode=2 -> create, mode=3-> update
  vehicle:Vehicle
  constructor(private activatedRoute:ActivatedRoute, 
    private vehicleService:VehiclesService,
    private router:Router) { 
    this.mode=1;
    this.vehicle={
      id:0,
      plate:"",
      type:"",
      capacitity_kg:0,
      state:"",
      transit_license:0,
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
      this.vehicle.id = this.activatedRoute.snapshot.params.id
      this.getVehicle(this.vehicle.id)
    }
  }
  getVehicle(id:number){
    this.vehicleService.view(id).subscribe(data=>{
      this.vehicle=data //El JSON corresponde a un dato
      console.log("Vehiculo"+JSON.stringify(this.vehicle))
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
        this.vehicleService.create(this.vehicle).subscribe(data =>{
          Swal.fire("guardados!", "Se ha creado correctamente", "success");
          this.router.navigate(["Vehicles/list"])
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
        this.vehicleService.update(this.vehicle).subscribe(data =>{
          Swal.fire("guardados!", "Se ha actualizado correctamente", "success");
          this.router.navigate(["Vehicles/list"])
        })
      } else if (result.isDenied) {
        Swal.fire("Los cambios no se guardaron", "", "info");
      }
    });
  }

}
/*
    */
