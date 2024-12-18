import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  restaurants:Restaurant[]

  constructor(private restaurantsService:RestaurantService, private router:Router ) { 
    this.restaurants=[]
  }

  ngOnInit(): void {
  this.list()
  }
  list(){
    this.restaurantsService.list().subscribe(data =>{
      this.restaurants=data
    })
  }
  delete(id:number){
    Swal.fire({ 
      title: 'Eliminar Restaurante', 
      text: "Está seguro que quiere eliminar el Restaurante?", 
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#3085d6', 
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Si, eliminar',
      cancelButtonText:'No, Cancelar'
      }).then((result) => { 
      if (result.isConfirmed) { 
      this.restaurantsService.delete(id). 
      subscribe(data => { 
      Swal.fire( 
      'Eliminado!', 
      'El Restaurante ha sido eliminada correctamente', 
      'success'
      ) 
      this.ngOnInit();
      }); 
      } 
      }) 
  }
  update(id:number){
    this.router.navigate(["restaurants/update/"+id])
  }
  view(id:number){
    this.router.navigate(["restaurants/view/"+id])
  }

  create(){
    this.router.navigate(["restaurants/create"])
  }
}
