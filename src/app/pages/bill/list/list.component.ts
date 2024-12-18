import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bill } from 'src/app/models/bill.model';
import { BillService } from 'src/app/services/bill.service';
import Swal from 'sweetalert2';

@Component({ 
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  bill: Bill[];
  constructor(private billsService: BillService, private router: Router) {
    this.bill = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    console.log("aqui estoy en view");

    this.router.navigate(["bills/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["bills/update/" + id]);
  }

  list(): void {
    this.billsService.list().subscribe((data) => {
      this.bill = data;
      console.log(data);

      //console.log(JSON.stringify(data["data"]));
    });
  }

  create() {
    this.router.navigate(["bills/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar factura?",
      text: "¿Estas seguro de eliminar la factura?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.billsService.delete(id).subscribe((data) => {
          Swal.fire("Eliminada!", "La factura ha sido eliminada.", "success");

          this.ngOnInit();
        });
      }
    });
  }
}
