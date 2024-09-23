import { Request, Response } from "express";
import { TodoModel } from "../../models/todo.model";
import { CreateTodoDto } from "../../../domain/dtos/todos/create-todo.dto";
export class TodoController {
    constructor() { }

    //PRUEBA DE QUE LEVANTO EL SERVIDOR
    public pruebaTodos = async (req: Request, res: Response) => {
        return res.json({ msg: 'Hola' })
    }

    //CREAR UN TODO
    public createTodo = async (req: Request, res: Response) => {
        // FORMA TRADICIONAL

        // const { nombre, createdAt } = req.body
        // const nuevoTodo = await TodoModel.create({
        //     nombre: nombre,
        //     createdAt: createdAt
        // })
        // await nuevoTodo.save()
        // return res.json({
        //     msg: 'Nuevo todo creado',
        //     nuevoTodo
        // })

        //FORMA PARA HACER LAS VALIDACIONES CON DTO
        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        if (error) return res.status(400).json({ error })

        const newTodo = new TodoModel({
            nombre: createTodoDto!.nombre,
            terminado: createTodoDto!.terminado,
            createdAt: createTodoDto!.createdAt ? new Date(createTodoDto!.createdAt) : undefined,  // Usar la fecha proporcionada o dejar que se use la predeterminada
        });

        await newTodo.save()
        console.log(newTodo)

        return res.json({
            msg: 'Nuevo todo creado',
            newTodo
        })


    }

    //GET ALL TODO
    public verTodos = async (req: Request, res: Response) => {
        const allTodos = await TodoModel.find()
        res.json({
            msg: 'Nuevo todo creado',
            allTodos
        })


    }
}