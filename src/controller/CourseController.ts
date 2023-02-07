import { Request, Response } from "express"
import { CourseBusiness } from "../business/CourseBusiness"
import { CourseDatabase } from "../database/CourseDatabase"
import { BaseError } from "../errors/BaseError"

export class CourseController {
    public getCourses = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined

            const courseBusiness = new CourseBusiness()
            const output = await courseBusiness.getCourses(q)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createCourse = async (req: Request, res: Response) => {
        try {
            const input = {
                id: req.body.id,
                name: req.body.name,
                lessons: req.body.lessons
            }

            const courseBusiness = new CourseBusiness()
            const output = await courseBusiness.createCourse(input)

            res.status(201).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deleteCourseById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            const courseBusiness = new CourseBusiness()
            courseBusiness.deleteCourseById(id)

            res.status(201).send("Curso deletado com sucesso!");
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editCourseById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const newName = req.body.name
            const newLessons = req.body.lessons

            const input = {
                id,
                newName,
                newLessons
            }

            const courseBusiness = new CourseBusiness()
            const course = await courseBusiness.editCourseById(input)

            res.status(200).send({
                message: "Dados do curso atualizados com sucesso!",
                course
            })
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}