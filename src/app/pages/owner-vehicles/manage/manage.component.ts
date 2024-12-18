import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  theFormGroup: FormGroup;
  trySend: boolean
  constructor(private activatedRoute:ActivatedRoute, 
    private ownerVehicleService:OwnerVehiclesService,
    private router:Router,
    private theFormBuilder: FormBuilder) { 
    this.mode=1;
    this.ownerVehicle={
      id:0,
      assignment_date:new Date(),
      owner_id:0,
      vehicle_id:0,
    };
    this.configFormGroup();
    this.trySend = false;
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
    this.trySend=true
    if (this.theFormGroup.invalid){
      Swal.fire("Error", "Por favor llenar corractemente los campos", "error")
    }else{
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
  }
  update(){
    this.trySend=true
    if (this.theFormGroup.invalid){
      Swal.fire("Error", "Por favor llenar corractemente los campos", "error")
    }else{
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
  configFormGroup(){
    this.theFormGroup = this.theFormBuilder.group({
      assignment_date: [this.ownerVehicle.assignment_date, [Validators.required]],
      owner_id: [this.ownerVehicle.owner_id, [Validators.required, Validators.min(1)]],
      vehicle_id: [this.ownerVehicle.vehicle_id, [Validators.required, Validators.min(1)]],
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  setFormMode() {
    if (this.mode === 1) {
      // Visualizar: Deshabilitar todos los campos
      this.theFormGroup.disable();
    } else if (this.mode === 2) {
      // Crear: Habilitar todos los campos, incluido el ID
      this.theFormGroup.enable();
    } else if (this.mode === 3) {
      // Actualizar: Habilitar todos los campos excepto el ID
      this.theFormGroup.enable();
      //this.theFormGroup.controls['id'].disable();
    }
  }
}
