import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  theFormGroup: FormGroup;
  trySend: boolean
  constructor(private activatedRoute:ActivatedRoute, 
    private orderService:OrderService,
    private router:Router,
    private theFormBuilder: FormBuilder) { 
    this.mode=1;
    this.order={
      id:0,
      type:"",
      date_order: new Date(),
      address_id:0,
      route_id:0
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
      this.order.id = this.activatedRoute.snapshot.params.id
      this.getOrder(this.order.id)
    }
  }
  getOrder(id:number){
    this.orderService.view(id).subscribe(data=>{
      this.order=data //El JSON corresponde a un dato
      console.log("Vehiculo"+JSON.stringify(this.order))
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
        this.orderService.create(this.order).subscribe(data =>{
          Swal.fire("guardados!", "Se ha creado correctamente", "success");
          this.router.navigate(["orders/list"])
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
  configFormGroup(){
    this.theFormGroup = this.theFormBuilder.group({
    type: ['', Validators.required, Validators.pattern(/^(Recogida|Transferencia|Entrega parcial|Entrega final)$/)], // Tipo obligatorio (Enum: ['Recogida','Transferencia','Entrega parcial', 'Entrega final'])
    date_order: ['', [Validators.required,Validators.pattern(/^\d{4}-\d{2}-\d{2}$/) ]],
    address_id: ['', [Validators.required,Validators.min(1) ]],
    route_id: ['', [Validators.required,Validators.min(1)]],
    contract_id: ['', [Validators.required, Validators.min(1) ]],
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
