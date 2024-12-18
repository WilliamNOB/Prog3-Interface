import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Operation } from 'src/app/models/operation';
import { OperationService } from 'src/app/services/operation.service';;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  operations:Operation[]

  constructor(private operationsService:OperationService, private router:Router ) { 
    this.operations=[]
  }

  ngOnInit(): void {
  this.list()
  }
  list(){
    this.operationsService.list().subscribe(data =>{
      this.operations=data
    })
  }
  delete(id:number){
    Swal.fire({ 
      title: 'Eliminar Operación', 
      text: "Está seguro que quiere eliminar la Operación?", 
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#3085d6', 
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Si, eliminar',
      cancelButtonText:'No, Cancelar'
      }).then((result) => { 
      if (result.isConfirmed) { 
      this.operationsService.delete(id). 
      subscribe(data => { 
      Swal.fire( 
      'Eliminado!', 
      'La Operación ha sido eliminada correctamente', 
      'success'
      ) 
      this.ngOnInit();
      }); 
      } 
      }) 
  }
  update(id:number){
    this.router.navigate(["operations/update/"+id])
  }
  view(id:number){
    this.router.navigate(["operations/view/"+id])
  }

  create(){
    this.router.navigate(["operations/create"])
  }
}
