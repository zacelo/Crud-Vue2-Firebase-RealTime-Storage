<template>
    <div class="container my-3">
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true" color="rgb(240, 132, 16)"
            backgroundColor='rgb(243, 233, 222)' :width=125 :height=125 loader='bars'>
        </loading>
        <h1 class="text-center pb-4">Crud con Real Time</h1>
        <div class="row">
            <div class="col-4 border pb-5 pt-3 bgcolor">
                <h1 class="text-center" v-if="!formModificar">Agregar Producto</h1>
                <h1 class="text-center" v-if="formModificar">Modificar Producto</h1>

                <div class="mb-2">
                    <label for="nombreProducto" class="form-label pt-2">Nombre:</label>

                    <!-- Validacion Nombre -->
                    <p class="text-success d-inline ms-1"
                        v-if="$v.producto.nombre.minLength && $v.producto.nombre.required">
                        <i class="bi bi-check-circle-fill fs-5 ms-2"></i>
                    </p>
                    <!-- Fin Validacion -->

                    <input type="text" class="form-control w-100" id="nombreProducto"
                        placeholder="Ingrese nombre producto ...." v-model="producto.nombre" autocomplete="off" />
                </div>

                <div class="mb-2">
                    <label for="precioProducto" class="form-label pt-2">Precio:</label>

                    <!-- Validacion Precio -->
                    <p class="text-success d-inline ms-1"
                        v-if="$v.producto.precio.minLength && $v.producto.precio.required">
                        <i class="bi bi-check-circle-fill fs-5 ms-2"></i>
                    </p>
                    <!-- Fin Validacion -->

                    <input type="number" class="form-control" id="precioProducto"
                        placeholder="Ingrese precio producto ...." v-model="producto.precio" />
                </div>

                <div class="mb-2">
                    <label for="descripcionProducto" class="form-label pt-2">Descripción</label>

                    <!-- Validacion Descripcion -->
                    <p class="text-success d-inline ms-1"
                        v-if="$v.producto.descripcion.minLength && $v.producto.descripcion.required">
                        <i class="bi bi-check-circle-fill fs-5 ms-2"></i>
                    </p>
                    <!-- Fin Validacion -->

                    <textarea name="textarea" rows="3" id="descripcionProducto"
                        placeholder="Descripcion del producto...." class="w-100 form-control"
                        v-model="producto.descripcion">
            </textarea>
                </div>

                <div class="mb-2">
                    <label for="categoriaProducto" class="form-label pt-2">Categoría</label> <select class="form-select"
                        aria-label="Default select example" v-model="producto.categoria">
                        <option class="form-select" value="Pizza">Pizza</option>
                        <option value="Hamburguesa">Hamburguesa</option>
                        <option value="Milanesa">Milanesa</option>
                    </select>
                </div>



                <div class="mb-2" v-show="!formModificar">

                    <label for="selectImage" class="form-label pt-2">Seleccionar Imagen</label>

                    <!-- Validacion Imagen -->
                    <p class="text-success d-inline ms-1" v-if="$v.producto.imagenFile.required">
                        <i class="bi bi-check-circle-fill fs-5 ms-2"></i>
                    </p>
                    <!-- Fin Validacion -->

                    <input class="form-control " id="selectImage" type="file" @change="cargarImagen($event)"
                        accept="image/*" />
                </div>

                <div>
                    <img :src="previsualizarImagen" alt="">
                    <button class="d-block btn btn-warning py-0 px-3 mt-2" @click="cambiarImagen()"
                        data-bs-toggle="modal" data-bs-target="#cambiarImagen" v-if="formModificar">Cambiar
                        Imagen</button>
                </div>



                <div class="text-end mt-4">
                    <button type="submit" class="btn btn-success" @click="Agregar()"
                        v-if="$v.producto.nombre.required && $v.producto.nombre.minLength && $v.producto.precio.minLength && $v.producto.precio.required && $v.producto.descripcion.minLength && $v.producto.descripcion.required && $v.producto.imagenFile.required && !formModificar">
                        Agregar
                    </button>
                    <button type="submit" class="btn btn-primary" @click="Modificar()"
                        v-if="$v.producto.nombre.required && $v.producto.nombre.minLength && $v.producto.precio.minLength && $v.producto.precio.required && $v.producto.descripcion.minLength && $v.producto.descripcion.required && formModificar">
                        Modificar
                    </button>


                    <button type="button" class="btn btn-danger ms-2" @click="resetearForm()">
                        Cancelar
                    </button>
                </div>

            </div>







            <div class="col-8">
                <table class="table">
                    <thead>
                        <tr class="text-center bgcolor">
                            <th scope="col">Imagen</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in productos" :key="index" class="text-center align-middle">
                            <td class="w-25">
                                <img :src="item.url" class="card-img-top w-25" alt="..." />
                            </td>
                            <td>{{ item.nombre }}</td>
                            <td>{{ item.precio }}</td>
                            <td>{{ item.descripcion }}</td>
                            <td>
                                <i class="bi bi-pencil-square text-primary fs-4 btn p-0"
                                    @click="cargarDatosParaModificar(item)"></i>
                            </td>
                            <td>
                                <i class="bi bi-trash text-danger fs-4 btn p-0" title="eliminar"
                                    @click="eliminarProducto(item.id, item.nombreImagen)"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
        <!-- Modal -->
        <div class="modal fade" id="cambiarImagen" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Cambiar Imagen</h5>
                    </div>
                    <div class="modal-body">
                        <div class="mb-2">

                            <label for="selectImage" class="form-label pt-2">Seleccionar Imagen</label>



                            <input class="form-control " id="selectImageModal" type="file"
                                @change="imagenParaModificar($event)" accept="image/*" data-bs-dismiss="modal" />


                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import axios from "axios";

import app from "../firebase.js";
import { getStorage, ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
const storage = getStorage(app)

const generadorId = require("shortid");
const UrlFirebase = "https://pizza-ya-72aae-default-rtdb.firebaseio.com"


export default {
    mounted() {
        this.cargaProductos();

    },
    components: {
        Loading
    },
    data() {
        return {
            producto: {
                nombre: "",
                precio: "",
                descripcion: "",
                categoria: "Pizza",
                imagenFile: "",
                nombreImagen: "",
                url: "",
                cantidad: 1,
            },
            productos: [],
            previsualizarImagen: "",
            imagenNueva: '',
            isLoading: true,
            formModificar: false,
            mostrarSelectorImagen: false,
            enviado: false,
        };
    },
    validations: {
        producto: {
            nombre: {
                required,
                minLength: minLength(4),
            },
            precio: {
                required,
                minLength: minLength(1),
            },
            descripcion: {
                required,
                minLength: minLength(10),
            },
            imagenFile: {
                required
            },
        },
    },
    methods: {

        async cargaProductos() {
            await axios.get(UrlFirebase + '/productos.json')
                .then(respuesta => {
                    this.productos = respuesta.data
                })
                .catch(error => { console.log(error.message) })
            this.isLoading = false
        },
        async Agregar() {
            this.enviado = true;
            if (this.$v.$invalid) {

                return false;
            }
            this.isLoading = true
            await this.subirImagenFirebaseStorage();
            const id = generadorId.generate();

            let producto = {
                id: id,
                nombre: this.producto.nombre,
                precio: this.producto.precio,
                descripcion: this.producto.descripcion,
                categoria: this.producto.categoria,
                url: this.producto.url,
                nombreImagen: this.producto.nombreImagen,
                cantidad: this.producto.cantidad,
            }

            await axios.put(UrlFirebase + '/productos/' + id + '.json', producto)
                .then(respuesta => {
                    console.log(respuesta.data)
                })
                .catch(error => { console.log(error.message) })
            this.resetearForm()
            this.cargaProductos();
            this.isLoading = false
            //Mensaje de agregado
            this.$swal.fire({
                icon: "success",
                title: "Producto agregado",
                showConfirmButton: false,
                timer: 1500,
            });
        },
        resetearForm() {
            this.producto.nombre = "";
            this.producto.precio = "";
            this.producto.descripcion = "";
            this.producto.categoria = "Pizza";
            this.producto.nombreImagen = ''
            this.producto.imagenFile = ''
            document.querySelector("#selectImage").value = "";

            this.formModificar = false
            this.previsualizarImagen = ""


        },
        resetInputFile() {

            document.querySelector("#selectImageModal").value = "";

        },
        cargarImagen(e) {
            this.producto.imagenFile = e.target.files[0];
            this.producto.nombreImagen = this.producto.imagenFile.name;
            this.previsualizarImagen = URL.createObjectURL(this.producto.imagenFile);
           
        },
        imagenParaModificar(e) {

            this.producto.imagenFile = e.target.files[0];
            this.imagenNueva = this.producto.imagenFile.name;
            this.previsualizarImagen = URL.createObjectURL(this.producto.imagenFile);
            this.resetInputFile()

        },
        async subirImagenFirebaseStorage() {
            const referenciaImagenStorage = ref(storage, "productosRealTime/" + this.producto.imagenFile.name);

            await uploadBytes(referenciaImagenStorage, this.producto.imagenFile)
                .then((snapshot) => {
                    console.log(snapshot);
                })
                .catch((error) => {
                    console.log(error);
                });
            await getDownloadURL(
                ref(storage, "productosRealTime/" + this.producto.imagenFile.name)
            )
                .then((url) => {
                    this.producto.url = url;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async borrarImagenDelStorage(nombreImagen) {
            const desertRef = ref(storage, "productosRealTime/" + nombreImagen);
            await deleteObject(desertRef)
                .then(() => {
                    console.log("Fue eliminado exitosamente del storage");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        cargarDatosParaModificar(item) {
         
            this.formModificar = true

            this.producto.id = item.id
            this.producto.nombre = item.nombre
            this.producto.precio = item.precio
            this.producto.descripcion = item.descripcion
            this.producto.categoria = item.categoria
            this.producto.cantidad = item.cantidad
            this.previsualizarImagen = item.url

            this.producto.nombreImagen = item.nombreImagen


        },
        async Modificar() {          
            this.isLoading = true
            let url = ''
            let imagen = ''
            if (this.imagenNueva != '') {

                this.borrarImagenDelStorage(this.producto.nombreImagen)
                await this.subirImagenFirebaseStorage()
                url = this.producto.url
                imagen =this.imagenNueva
                this.imagenNueva = ''
            }else{
                url=  this.previsualizarImagen
                imagen = this.producto.nombreImagen
            }

            const producto = {
                nombre: this.producto.nombre,
                precio: this.producto.precio,
                descripcion: this.producto.descripcion,
                categoria: this.producto.categoria,
                nombreImagen:imagen,
                url: url
            }
            await axios.patch(UrlFirebase + '/productos/' + this.producto.id + '.json', producto)
                .then(() => {

                })
                .catch(error => { console.log(error.message) })
            this.resetearForm()
            this.cargaProductos();
            this.isLoading = false
        },
        cambiarImagen() {

        },
        async eliminarProducto(id, nombreImagen) {
            this.isLoading = true
            await axios.delete(UrlFirebase + '/productos/' + id + '.json')
                .then(() => {
                    console.log("Fue eliminado exitosamente del RealTime")
                })
                .catch(error => { console.log(error.message) })
            this.borrarImagenDelStorage(nombreImagen)
            this.cargaProductos()
            this.isLoading = false

            //Mensaje eliminar producto
            this.$swal.fire({
                icon: "error",
                title: "Producto eliminado",
                showConfirmButton: false,
                timer: 1500,
            });
        },

    },
};
</script>

<style lang="css" scoped>
.bgcolor {
    background-color: rgba(253, 216, 94, 0.658);

}
</style>