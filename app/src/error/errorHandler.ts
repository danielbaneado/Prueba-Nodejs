export default class errorHandler extends Error {
    estado: number
    constructor (estado: number, mensaje: string) {
    super (mensaje)
        this.estado = estado
    }
}