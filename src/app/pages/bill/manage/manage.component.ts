import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from 'src/app/models/bill.model';
import { Quota } from 'src/app/models/quota.model';
import { Spent } from 'src/app/models/spent.model';
import { BillService } from 'src/app/services/bill.service';
import { QuotaService } from 'src/app/services/quota.service';
import { SpentService } from 'src/app/services/spent.service';
import Swal from 'sweetalert2';

@Component({ 
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  mode: number; //1->view, 2->Create, 3-> Update
  bill: Bill;
  theFormGroup: FormGroup; //! EL POLICIA QUIEN HACE CUMPIR LAS REGLAS
  trySend: boolean;
  spent:Spent[];
  quotas:Quota[];

  constructor(
    private billsService: BillService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
    private quotaService: QuotaService, 
    private spentService: SpentService
  ) {
    this.mode = 0;
    this.configFormGroup();
    this.trySend = false;
    this.quotas = [];
    this.spent = [];

    this.bill = { 
      id: 0, 
      date_bill: new Date(), 
      total_amount: 0, state: " ", 
      quota:0,
      quotas:{payment_date: new Date(),  contract_id:0},
      spents:{travel_expense_id:0,  service_id:0}
    };
  }


  quotasList(){
    this.quotaService.list().subscribe(data =>{
      this.quotas=data
  })
}
spentsList(){
  this.spentService.list().subscribe(data =>{
    this.spent=data
})
}

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("date_bill").disable();
      this.theFormGroup.get("total_amount").disable();
      this.theFormGroup.get("state").disable();
      this.theFormGroup.get("payment_id").disable();
      this.theFormGroup.get("spent_id").disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.bill.id = this.activateRoute.snapshot.params.id;
      this.getBill(this.bill.id);
    }
    this.quotasList();
    this.spentsList();
   // this.setFormMode();
  }

  configFormGroup() {
  this.theFormGroup = this.theFormBuilder.group({
    date_bill: ["", [Validators.required]],
    total_amount: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
    state:["", [Validators.required]],
    quotas: [0, [Validators.required,Validators.min(1),Validators.max(36)]],
   /* payment_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
    spent_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],*/
  });
  }
get getTheFormGroup() {
  //* para que devulva una variable
  return this.theFormGroup.controls; //DEVUELVE LOS CONTROLES
}
  getBill(id: number) {
    this.billsService.view(id).subscribe((data) => {
      this.bill = data;
    });
  }
  create() {
    this.billsService.create(this.bill).subscribe(() => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      this.router.navigate(["bills/list"]);
    });
  }

  update() {
    this.billsService.update(this.bill).subscribe(() => {
      Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
      this.router.navigate(["bills/list"]);
    });
  }

}
