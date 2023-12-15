export class ProductoModel{
    nombre: string= '';
    descripcion: string= '';
    precio: number = 0;
}


export class Producto_Insertar_Model{
    tienda_id: number = 0;  
    nombre_producto: string = "";
    descripcion_producto: string = "";
    precio_producto: number = 0;
    id_categoria: number = 0;
    stock: number = 0;
    lista_imagenes:string[] = ["","","","",""];
}

export class Producto_Carga_Model{
    stock: number = 0;
    descripcion_producto: string = "";
    id_producto: number = 0;
    nombre_producto: string = "";
    precio_producto: number = 0;

}

//Datos del get
export class Producto_Json_Solo_Model{

    cantidad: number = 0;
    descripcion: string = "";
    id_producto: number = 0;
    id_tienda: number = 0;
    nombre_producto: string = "";
    nombre_tienda: string = "";
    precio: number = 0;

}


export class Carrito_Compra_Carga_Model{

    id_producto: number = 0;
    id_user: number = 0;
    cantidad: number = 0;
    precio_unitario: number = 0;
    estado: string = "";
 
}








