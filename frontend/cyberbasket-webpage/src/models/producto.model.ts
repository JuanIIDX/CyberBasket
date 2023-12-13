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


