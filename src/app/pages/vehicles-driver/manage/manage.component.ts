import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesDriver } from 'src/app/models/vehicles-driver.model';
import { VehiclesDriverService } from 'src/app/services/vehicles-driver.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  mode:number //mode=1 -> View, mode=2 -> create, mode=3-> update
  vehicledriver:VehiclesDriver
  constructor(private activatedRoute:ActivatedRoute, 
    private vehicledriverService:VehiclesDriverService,
    private router:Router) { 
    this.mode=1;
    this.vehicledriver={
      id:0,
      assignment_date:new Date(),
      driver_id:0,
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
      this.vehicledriver.id = this.activatedRoute.snapshot.params.id
      this.getVehicle(this.vehicledriver.id)
    }
  }
  getVehicle(id:number){
    this.vehicledriverService.view(id).subscribe(data=>{
      this.vehicledriver=data //El JSON corresponde a un dato
      console.log("Vehiculo"+JSON.stringify(this.vehicledriver))
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
        this.vehicledriverService.create(this.vehicledriver).subscribe(data =>{
          Swal.fire("guardados!", "Se ha creado correctamente", "success");
          this.router.navigate(["VehiclesDriver/list"])
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
        this.vehicledriverService.update(this.vehicledriver).subscribe(data =>{
          Swal.fire("guardados!", "Se ha actualizado correctamente", "success");
          this.router.navigate(["Vehicles/list"])
        })
      } else if (result.isDenied) {
        Swal.fire("Los cambios no se guardaron", "", "info");
      }
    });
  }


}
