import { Component, OnInit } from '@angular/core'; 
import { Route, Router } from '@angular/router';
import { Lot } from 'src/app/models/lot.model';
import { LotService } from 'src/app/services/lot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  lots: Lot[];

  constructor(private lotsService:LotService, private router:Router) {
    this.lots = [];
  }

  ngOnInit(): void {
    this.list();
  }

  view(id: number) {
    this.router.navigate(["lots/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["lots/update/" + id]);
  }

  list(): void {
    this.lotsService.list().subscribe((data) => {
      console.log(data);
      this.lots = data
    });
  }

  create(){
    this.router.navigate(["lots/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Lote",
      text: "¿Estas seguro de eliminar el Lote?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.lotsService.delete(id).subscribe((data) => {
          Swal.fire("Eliminado!", "Lote eliminado correctamente.", "success");
          this.list();
        });
      }
    });
  }
}
