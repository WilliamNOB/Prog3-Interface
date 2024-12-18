import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/models/owner.model';
import { OwnerService } from 'src/app/services/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  mode:number //mode=1 -> View, mode=2 -> create, mode=3-> update
  owners:Owner
  constructor(private activatedRoute:ActivatedRoute, 
    private ownerservice:OwnerService,
    private router:Router) { 
    this.mode=1;
    this.owners={
      id:0,
      user_id:"",
      email:"",
      password:"",
      name:""
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
      this.owners.id = this.activatedRoute.snapshot.params.id
      this.getOwner(this.owners.id)
    }
  }
  getOwner(id:number){
    this.ownerservice.view(id).subscribe(data=>{
      this.owners=data //El JSON corresponde a un dato
      console.log("Conductor"+JSON.stringify(this.owners))
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
        this.ownerservice.create(this.owners).subscribe(data =>{
          Swal.fire("guardados!", "Se ha creado correctamente", "success");
          this.router.navigate(["owners/list"])
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
        this.ownerservice.update(this.owners).subscribe(data =>{
          Swal.fire("guardados!", "Se ha actualizado correctamente", "success");
          this.router.navigate(["owners/list"])
        })
      } else if (result.isDenied) {
        Swal.fire("Los cambios no se guardaron", "", "info");
      }
    });
  }

}
