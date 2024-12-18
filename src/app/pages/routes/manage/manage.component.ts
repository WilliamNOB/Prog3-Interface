import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  theFormGroup: FormGroup;
  trySend: boolean
  constructor(private activatedRoute:ActivatedRoute, 
    private routeService:RouteService,
    private router:Router,
    private theFormBuilder: FormBuilder) { 
    this.mode=1;
    this.route={
      id:0,
      contract_id:0,
      vehicle_id:0
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
      this.route.id = this.activatedRoute.snapshot.params.id
      this.getRoute(this.route.id)
    }
  }
  getRoute(id:number){
    this.routeService.view(id).subscribe(data=>{
      this.route=data //El JSON corresponde a un dato
      console.log("Vehiculo"+JSON.stringify(this.route))
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
        this.routeService.create(this.route).subscribe(data =>{
          Swal.fire("guardados!", "Se ha creado correctamente", "success");
          this.router.navigate(["routes/list"])
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

  configFormGroup(){
    this.theFormGroup = this.theFormBuilder.group({
      contract_id: [this.route.contract_id,[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1),],],
      vehicle_id: [this.route.vehicle_id,[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1), ],],
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
