//SON VALIDACIONES DE COMO VA A VENIR LA DATA DEL BODY
//SE PUEDE HACER DE ESTA FORMA O CON PAQUETES DE TERCEROS => https://express-validator.github.io/docs/

export class CreateTodoDto {
    private constructor(
        public readonly nombre: string,
        public readonly terminado: Boolean,
        public readonly createdAt?: Date
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {

        const { nombre, terminado, createdAt } = props

        if (!nombre) return ['Name is requerid', undefined]

        //Porque si es undefined el valor por defecto que le puse es false
        if (terminado !== undefined && typeof terminado !== 'boolean') {
            return ['Terminado debe ser un valor booleano', undefined];
        }

        if (createdAt && isNaN(Date.parse(createdAt))) {
            return ['Fecha no válida para createdAt', undefined];
        }


        return [undefined, new CreateTodoDto(nombre, terminado, createdAt ? new Date(createdAt) : undefined)];
    }
}