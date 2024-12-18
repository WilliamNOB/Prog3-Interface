import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService} from 'src/app/services/hotel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  hotels:Hotel[]

  constructor(private hotelsService:HotelService, private router:Router ) { 
    this.hotels=[]
  }

  ngOnInit(): void {
  this.list()
  }
  list(){
    this.hotelsService.list().subscribe(data =>{
      this.hotels=data
    })
  }
  delete(id:number){
    Swal.fire({ 
      title: 'Eliminar Hotel', 
      text: "Está seguro que quiere eliminar el Hotel?", 
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#3085d6', 
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Si, eliminar',
      cancelButtonText:'No, Cancelar'
      }).then((result) => { 
      if (result.isConfirmed) { 
      this.hotelsService.delete(id). 
      subscribe(data => { 
      Swal.fire( 
      'Eliminado!', 
      'El Hotel ha sido eliminada correctamente', 
      'success'
      ) 
      this.ngOnInit();
      }); 
      } 
      }) 
  }
  update(id:number){
    this.router.navigate(["hotels/update/"+id])
  }
  view(id:number){
    this.router.navigate(["hotels/view/"+id])
  }

  create(){
    this.router.navigate(["hotels/create"])
  }
}
