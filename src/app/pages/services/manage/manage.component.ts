import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  mode:number //mode=1 -> View, mode=2 -> create, mode=3-> update
  service:Service
  constructor(private activatedRoute:ActivatedRoute, 
    private serviceServices:ServiceService,
    private router:Router) { 
    this.mode=1;
    this.service={
      id:0,
      amount:0,
      date_service:new Date(),
     // administrator_id:null,
      tranch_id:0,
      contract_id:0,
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
      this.service.id = this.activatedRoute.snapshot.params.id
      this.getVehicle(this.service.id)
    }
  }
  getVehicle(id:number){
    this.serviceServices.view(id).subscribe(data=>{
      this.service=data //El JSON corresponde a un dato
      console.log("Servicio"+JSON.stringify(this.service))
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
        this.serviceServices.create(this.service).subscribe(data =>{
          Swal.fire("guardados!", "Se ha creado correctamente", "success");
          this.router.navigate(["services/list"])
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
        this.serviceServices.update(this.service).subscribe(data =>{
          Swal.fire("guardados!", "Se ha actualizado correctamente", "success");
          this.router.navigate(["services/list"])
        })
      } else if (result.isDenied) {
        Swal.fire("Los cambios no se guardaron", "", "info");
      }
    });
  }

}
