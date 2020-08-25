//import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
/*
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
*/
//import Pedidos from "@/components/pages/pedidos/pedidos.vue";

import Login from '@/components/login/login.vue'
import Layout from '@/components/layout/layout.vue'

import DashBoard from '@/components/pages/dashboard/dashboard.vue'
import LayoutPage from '@/components/pages/layout/layoutPage.vue'
//VENTAS
import Ventas from '@/components/pages/ventas/ventas.vue'
import RegistroVentas from '@/components/pages/ventas/registroventas.vue'
import ListadoVentas from '@/components/pages/ventas/listadoventas.vue'
import ListadoVentasACuenta from '@/components/pages/ventas/listadoventasACuenta.vue'
//TRASPASO
import TraspasoTienda from '@/components/pages/traspaso/traspaso_tienda.vue'
//REPORTES X TIENDA
import GuiasXTienda from '@/components/pages/reportes_x_tienda/guias_x_tienda.vue'
import KardexTiendaPrecio from '@/components/pages/reportes_x_tienda/kardex_tienda_prec.vue'
import KardexTiendaProducto from '@/components/pages/reportes_x_tienda/kardex_tienda_prod.vue'
import MovimientoAlmacen from '@/components/pages/reportes_x_tienda/movimiento_almacen.vue'
import VentasXTiendaPrecio from '@/components/pages/reportes_x_tienda/ventas_x_tienda_prec.vue'
import VentasXTiendaProducto from '@/components/pages/reportes_x_tienda/ventas_x_tienda_prod.vue'
import VentasXTienda from '@/components/pages/reportes_x_tienda/ventas_x_tienda.vue'
//REPORTES
import KardexPrecio from '@/components/pages/reportes/kardex_precio.vue'
import KardexProducto from '@/components/pages/reportes/kardex_producto.vue'
import VentaPrecio from '@/components/pages/reportes/venta_precio.vue'
import VentaProducto from '@/components/pages/reportes/venta_producto.vue'
import VerGuias from '@/components/pages/reportes/ver_guias.vue'
//FACTURACION
import Boleta from '@/components/pages/facturacion/boleta.vue'
import ComunicacionBaja from '@/components/pages/facturacion/comunicacion_baja.vue'
import Factura from '@/components/pages/facturacion/factura.vue'
import NotaCredito from '@/components/pages/facturacion/nota_credito.vue'
import NotaDebito from '@/components/pages/facturacion/nota_debito.vue'
import ReporteBoletaFactura from '@/components/pages/facturacion/reporte_boletafactura.vue'
import ResumenDiario from '@/components/pages/facturacion/resumen_diario.vue'
//ETIQUETAS
//-- import CodigoBarras from '@/components/pages/etiquetas/codigo_barras.vue'
//CAJA
import ControlCaja from '@/components/pages/caja/control_caja.vue'
//DEVOLUCIONES
import DevolverAlmacen from '@/components/pages/devoluciones/devolver_almacen.vue'
//AUTORIZACION
import AceptarSalida from '@/components/pages/autorizacion/aceptar_salida.vue'
//ALMACENES
import AdministrarProducto from '@/components/pages/almacenes/administrar_producto.vue'
import AsignacionAlmacen from '@/components/pages/almacenes/asignacion_almacen.vue'
import CodigoBarras from '@/components/pages/almacenes/codigo_barras.vue'
import ControlStock from '@/components/pages/almacenes/control_stock.vue'
//AJUSTES
import Almacenes from '@/components/pages/ajustes/almacenes.vue'
import AlmacenesxTienda from '@/components/pages/ajustes/almacenxtienda.vue'
import Comprobantes from '@/components/pages/ajustes/comprobantes.vue'
import ComprobantesxCliente from '@/components/pages/ajustes/comprobantesxcliente.vue'
import ComprobantesxTienda from '@/components/pages/ajustes/comprobantextienda.vue'
import Emisor from '@/components/pages/ajustes/emisor.vue'
import Perfil from '@/components/pages/ajustes/perfil.vue'
import Tienda from '@/components/pages/ajustes/tienda.vue'
import Usuario from '@/components/pages/ajustes/usuario.vue'
import ModuloXCliente from '@/components/pages/ajustes/moduloxCliente.vue'
import Cliente from '@/components/pages/ajustes/cliente.vue'
import Color from '@/components/pages/ajustes/color.vue'
import Talla from '@/components/pages/ajustes/talla.vue'
import ProdGrupoMedico from '@/components/pages/ajustes/productoGrupoMedico.vue'
import ProdLaboratorio from '@/components/pages/ajustes/productoLaboratorio.vue'
import ProdTipoPresentacion from '@/components/pages/ajustes/productoTipoPresentacion.vue'

const routes = [
  {
    path: "/",
    component: Login,
    name: "login"
  },
  {
    path: "/inicio",
    component: Layout,
    redirect: "/",
    children: [
      {
        path: "",
        name: "DashBoard",
        component: DashBoard
      },
      {
        path: "ventas",
        component: LayoutPage,
        children: [
          {
            path: "venta",
            name: "ventas/venta",
            component: Ventas
          },
          {
            path: "reg_venta",
            name: "ventas/reg_venta",
            component: RegistroVentas
          },
          {
            path: "list_venta",
            name: "ventas/list_venta",
            component: ListadoVentas
          },
          {
            path: "list_venta_acuenta",
            name: "ventas/list_venta_acuenta",
            component: ListadoVentasACuenta
          }
        ]
      },
      {
        path: "almacenes",
        component: LayoutPage,
        children: [
          {
            path: "adm_producto",
            name: "almacenes/adm_producto",
            component: AdministrarProducto
          },
          {
            path: "asig_almacen",
            name: "almacenes/asig_almacen",
            component: AsignacionAlmacen
          },
          {
            path: "cod_barras",
            name: "almacenes/cod_barras",
            component: CodigoBarras
          },
          {
            path: "control_stock",
            name: "almacenes/control_stock",
            component: ControlStock
          }
        ]
      },
      {
        path: "devoluciones",
        component: LayoutPage,
        children: [
          {
            path: "dev_almacen",
            name: "devoluciones/dev_almacen",
            component: DevolverAlmacen
          }
        ]
      },
      {
        path: "caja",
        component: LayoutPage,
        children: [
          {
            path: "control_caja",
            name: "caja/control_caja",
            component: ControlCaja
          }
        ]
      },
      {
        path: "reportes",
        component: LayoutPage,
        children: [
          {
            path: "ver_guia",
            name: "reportes/ver_guia",
            component: VerGuias
          },
          {
            path: "venta_producto",
            name: "reportes/venta_producto",
            component: VentaProducto
          },
          {
            path: "venta_precio",
            name: "reportes/venta_precio",
            component: VentaPrecio
          },
          {
            path: "kard_producto",
            name: "reportes/kard_producto",
            component: KardexProducto
          },
          {
            path: "kard_precio",
            name: "reportes/kard_precio",
            component: KardexPrecio
          }
        ]
      },
      {
        path: "traspaso",
        component: LayoutPage,
        children: [
          {
            path: "tras_tienda",
            name: "traspaso/tras_tienda",
            component: TraspasoTienda
          }
        ]
      },
      {
        path: "autorizacion",
        component: LayoutPage,
        children: [
          {
            path: "acep_salida",
            name: "autorizacion/acep_salida",
            component: AceptarSalida
          }
        ]
      },
      {
        path: "facturacion",
        component: LayoutPage,
        children: [
          {
            path: "rep_bolfac",
            name: "facturacion/rep_bolfac",
            component: ReporteBoletaFactura
          },
          {
            path: "res_diario",
            name: "facturacion/res_diario",
            component: ResumenDiario
          },
          {
            path: "boleta",
            name: "facturacion/boleta",
            component: Boleta
          },
          {
            path: "factura",
            name: "facturacion/factura",
            component: Factura
          },
          {
            path: "notacredito",
            name: "facturacion/notacredito",
            component: NotaCredito
          },
          {
            path: "notadebito",
            name: "facturacion/notadebito",
            component: NotaDebito
          },
          {
            path: "comubaja",
            name: "facturacion/comubaja",
            component: ComunicacionBaja
          }
        ]
      },
      {
        path: "ajustes",
        component: LayoutPage,
        children: [
          {
            path: "tienda",
            name: "ajustes/tienda",
            component: Tienda
          },
          {
            path: "emisor",
            name: "ajustes/emisor",
            component: Emisor
          },
          {
            path: "almacenes",
            name: "ajustes/almacenes",
            component: Almacenes
          },
          {
            path: "almacenxtienda",
            name: "ajustes/almacenxtienda",
            component: AlmacenesxTienda
          },
          {
            path: "comprobantes",
            name: "ajustes/comprobantes",
            component: Comprobantes
          },
          {
            path: "comprobantesxcliente",
            name: "ajustes/comprobantesxcliente",
            component: ComprobantesxCliente
          },
          {
            path: "comprobantextienda",
            name: "ajustes/comprobantextienda",
            component: ComprobantesxTienda
          },
          {
            path: "usuario",
            name: "ajustes/usuario",
            component: Usuario
          },
          {
            path: "perfil",
            name: "ajustes/perfil",
            component: Perfil
          },
          {
            path: "modulosxcliente",
            name: "ajustes/modulosxcliente",
            component: ModuloXCliente
          },
          {
            path: "cliente",
            name: "ajustes/cliente",
            component: Cliente
          },
          {
            path: "color",
            name: "ajustes/color",
            component: Color
          },
          {
            path: "talla",
            name: "ajustes/talla",
            component: Talla
          },
          {
            path: "prod_grupomedico",
            name: "ajustes/prod_grupomedico",
            component: ProdGrupoMedico
          },
          {
            path: "prod_laboratorio",
            name: "ajustes/prod_laboratorio",
            component: ProdLaboratorio
          },
          {
            path: "prod_presentacion",
            name: "ajustes/prod_presentacion",
            component: ProdTipoPresentacion
          }
        ]
      },
      {
        path: "reportes2",
        component: LayoutPage,
        children: [
          {
            path: "guias_tienda",
            name: "reportes2/guias_tienda",
            component: GuiasXTienda
          },
          {
            path: "venta_tienda",
            name: "reportes2/venta_tienda",
            component: VentasXTienda
          },
          {
            path: "venta_tienda_prod",
            name: "reportes2/venta_tienda_prod",
            component: VentasXTiendaProducto
          },
          {
            path: "venta_tienda_precio",
            name: "reportes2/venta_tienda_precio",
            component: VentasXTiendaPrecio
          },
          {
            path: "kard_tienda_prod",
            name: "reportes2/kard_tienda_prod",
            component: KardexTiendaProducto
          },
          {
            path: "kard_tienda_prec",
            name: "reportes2/kard_tienda_prec",
            component: KardexTiendaPrecio
          },
          {
            path: "mov_almacen",
            name: "reportes2/mov_almacen",
            component: MovimientoAlmacen
          }
        ]
      }/*,
      {
        path: "etiquetas",
        component: LayoutPage,
        children: [
          {
            path: "cod_barras",
            name: "etiquetas/cod_barras",
            component: CodigoBarras
          }
        ]
      }*/



    ]
  }
];

export default routes;
