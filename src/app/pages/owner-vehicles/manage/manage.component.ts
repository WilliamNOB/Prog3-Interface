import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerVehicles } from 'src/app/models/owner-vehicles.model';
import { OwnerVehiclesService } from 'src/app/services/owner-vehicles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  mode:number //mode=1 -> View, mode=2 -> create, mode=3-> update
  ownerVehicle:OwnerVehicles
  constructor(private activatedRoute:ActivatedRoute, 
    private ownerVehicleService:OwnerVehiclesService,
    private router:Router) { 
    this.mode=1;
    this.ownerVehicle={
      id:0,
      assignment_date:new Date(),
      owner_id:0,
      vehicle_id:0,
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
      this.ownerVehicle.id = this.activatedRoute.snapshot.params.id
      this.getownerVehicle(this.ownerVehicle.id)
    }
  }
  getownerVehicle(id:number){
    this.ownerVehicleService.view(id).subscribe(data=>{
      this.ownerVehicle=data //El JSON corresponde a un dato
      console.log("Vehiculo"+JSON.stringify(this.ownerVehicle))
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
        this.ownerVehicleService.create(this.ownerVehicle).subscribe(data =>{
          Swal.fire("guardados!", "Se ha creado correctamente", "success");
          this.router.navigate(["ownerVehicles/list"])
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
        this.ownerVehicleService.update(this.ownerVehicle).subscribe(data =>{
          Swal.fire("guardados!", "Se ha actualizado correctamente", "success");
          this.router.navigate(["Vehicles/list"])
        })
      } else if (result.isDenied) {
        Swal.fire("Los cambios no se guardaron", "", "info");
      }
    });
  }
}
