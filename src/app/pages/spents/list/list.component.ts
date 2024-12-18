import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Spent } from 'src/app/models/spent.model';
import { SpentService } from 'src/app/services/spent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  spents:Spent[]

  constructor(private spentsService:SpentService, private router:Router ) { 
    this.spents=[]
  }

  ngOnInit(): void {
  this.list()
  }
  list(){
    this.spentsService.list().subscribe(data =>{
      this.spents=data
    })
  }
  delete(id:number){
    Swal.fire({ 
      title: 'Eliminar Gasto', 
      text: "Está seguro que quiere eliminar El Gasto?", 
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#3085d6', 
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Si, eliminar',
      cancelButtonText:'No, Cancelar'
      }).then((result) => { 
      if (result.isConfirmed) { 
      this.spentsService.delete(id). 
      subscribe(data => { 
      Swal.fire( 
      'Eliminado!', 
      'El Gasto ha sido eliminada correctamente', 
      'success'
      ) 
      this.ngOnInit();
      }); 
      } 
      }) 
  }
  update(id:number){
    this.router.navigate(["spents/update/"+id])
  }
  view(id:number){
    this.router.navigate(["spents/view/"+id])
  }

  create(){
    this.router.navigate(["spents/create"])
  }
}
