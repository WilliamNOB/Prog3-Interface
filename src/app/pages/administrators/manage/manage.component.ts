import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrator } from 'src/app/models/administrator.model';
import { Service } from 'src/app/models/service.model';
import { AdministratorService } from 'src/app/services/administrator.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  mode:number //mode=1 -> View, mode=2 -> create, mode=3-> update
  administrator:Administrator
//trysend:boolean
 //theFormGroup:FormGroup
  service:Service[]

  constructor(private activatedRoute:ActivatedRoute, 
    private administratorService:AdministratorService,
    private router:Router, private theFormBuilder:FormBuilder, private serviceService: ServiceService) { 
    this.mode=1;
  // this.trysend=false;
    this.service=[];
    //this.configFormGroup();

    this.administrator={ 
      id:0,
      user_id:"",
      //service_id: 0,
      email:"",
      password:"",
      name:"",
      service:{id:0, amount:0, date_service:new Date, tranch_id:0, contract_id:0}
    };
  }

  servicesList(){
    this.serviceService.list().subscribe(data =>{
      this.service=data
    })
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
      this.administrator.id = this.activatedRoute.snapshot.params.id
      this.getAdministrator(this.administrator.id)
    }
    this.servicesList();
  }


    
  
  getAdministrator(id:number){
    this.administratorService.view(id).subscribe(data=>{
      this.administrator=data //El JSON corresponde a un dato
      console.log("Conductor"+JSON.stringify(this.administrator))
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
        this.administratorService.create(this.administrator).subscribe(data =>{
          Swal.fire("guardados!", "Se ha creado correctamente", "success");
          this.router.navigate(["administrators/list"])
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
        this.administratorService.update(this.administrator).subscribe(data =>{
          Swal.fire("guardados!", "Se ha actualizado correctamente", "success");
          this.router.navigate(["administrator/list"])
        })
      } else if (result.isDenied) {
        Swal.fire("Los cambios no se guardaron", "", "info");
      }
    });
  }

}
