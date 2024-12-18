import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  address:Address[]

  constructor(private addressesService:AddressService, private router:Router ) { 
    this.address=[]
  }

  ngOnInit(): void {
  this.list()
  }
  list(){
    this.addressesService.list().subscribe(data =>{
      this.address=data
    })
  }
  delete(id:number){
    Swal.fire({ 
      title: 'Eliminar Dirrección', 
      text: "Está seguro que quiere eliminar el Dirrección?", 
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#3085d6', 
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Si, eliminar',
      cancelButtonText:'No, Cancelar'
      }).then((result) => { 
      if (result.isConfirmed) { 
      this.addressesService.delete(id). 
      subscribe(data => { 
      Swal.fire( 
      'Eliminado!', 
      'La Dirección ha sido eliminada correctamente', 
      'success'
      ) 
      this.ngOnInit();
      }); 
      } 
      }) 
  }
  update(id:number){
    this.router.navigate(["addresses/update/"+id])
  }
  view(id:number){
    this.router.navigate(["addresses/view/"+id])
  }

  create(){
    this.router.navigate(["addresses/create"])
  }
}
