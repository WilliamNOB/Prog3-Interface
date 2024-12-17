import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  {
    path: "hotels", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/hotels/hotels.module").then((m) => m.HotelsModule),
  },
  {
    path: "restaurants", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/restaurants/restaurants.module").then(
        (m) => m.RestaurantsModule
      ),
  },
  {
    path: "Vehicles", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/vehicles/vehicles.module").then(
        (m) => m.VehiclesModule
      ),
  },
  {
    path: "contracts", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/contracts/contracts.module").then(
        (m) => m.ContractsModule
      ),
  },
  {
    path: "routes", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/routes/routes.module").then((m) => m.RoutesModule),
  },
  {
    path: "orders", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/orders/orders.module").then((m) => m.OrdersModule),
  },
  {
    path: "tranches", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/tranches/tranches.module").then(
        (m) => m.TranchesModule
      ),
  },
  {
    path: "services", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/services/services.module").then(
        (m) => m.ServicesModule
      ),
  },
  {
    path: "owners", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/owners/owners.module").then((m) => m.OwnersModule),
  },
  {
    path: "drivers", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/drivers/drivers.module").then(
        (m) => m.DriversModule
      ),
  },
  {
    path: "VehiclesDriver", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/vehicles-driver/vehicles-driver.module").then(
        (m) => m.VehiclesDriverModule
      ),
  },
  {
    path: "travelExpenses", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/expenses/expenses.module").then(
        (m) => m.ExpensesModule
      ),
  },
  {
    path: "addresses", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/addresses/addresses.module").then(
        (m) => m.AddressesModule
      ),
  },
  {
    path: "administrators", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/administrators/administrators.module").then(
        (m) => m.AdministratorsModule
      ),
  },
  {
    path: "operations", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/operations/operations.module").then(
        (m) => m.OperationsModule
      ),
  },
  {
    path: "spents", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/spents/spents.module").then((m) => m.SpentsModule),
  },
  {
    path: "customers", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/customer/customer.module").then(
        (m) => m.CustomerModule
      ),
  },
  {
    path: "products", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/products/products.module").then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: "lots", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/lot/lot.module").then((m) => m.LotModule),
  },
  {
    path: "bills", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/bill/bill.module").then((m) => m.BillModule),
  },
  {
    path: "quotas", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/quota/quota.module").then((m) => m.QuotaModule),
  },
  {
    path: "naturalPeoples", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/natural-person/natural-person.module").then(
        (m) => m.NaturalPersonModule
      ),
  },
  {
    path: "ownerVehicles", //Path que carga la pagina
    loadChildren: () =>
      import("src/app/pages/owner-vehicles/owner-vehicles.module").then(
        (m) => m.OwnerVehiclesModule
      ),
  },
];
