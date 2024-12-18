import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from 'src/app/models/expense.model';
import { ExpenseService } from 'src/app/services/expense.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  expenses:Expense[]

  constructor(private expenseService:ExpenseService, private router:Router ) { 
    this.expenses=[]
  }

  ngOnInit(): void {
  this.list()
  }
  list(){
    this.expenseService.list().subscribe(data =>{
      this.expenses=data
    })
  }
  delete(id:number){
    Swal.fire({ 
      title: 'Eliminar Viatico', 
      text: "Está seguro que quiere eliminar el Viatico?", 
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#3085d6', 
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Si, eliminar',
      cancelButtonText:'No, Cancelar'
      }).then((result) => { 
      if (result.isConfirmed) { 
      this.expenseService.delete(id). 
      subscribe(data => { 
      Swal.fire( 
      'Eliminado!', 
      'El Viatico ha sido eliminada correctamente', 
      'success'
      ) 
      this.ngOnInit();
      }); 
      } 
      }) 
  }
  update(id:number){
    this.router.navigate(["travelExpenses/update/"+id])
  }
  view(id:number){
    this.router.navigate(["travelExpenses/view/"+id])
  }
  create(){
    this.router.navigate(["travelExpenses/create"])
  }
}
