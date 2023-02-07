import { CourseDatabase } from "../database/CourseDatabase"
import { BadRequestError } from "../errors/BadRequestError"
import { Course } from "../models/Course"
import { CourseDB } from "../types"


export class CourseBusiness {
    public getCourses = async (q: string | undefined) => {

        const courseDatabase = new CourseDatabase()
        const courseDB = await courseDatabase.findCourses(q)

        const courses: Course[] = courseDB.map((courseDB) => new Course(
            courseDB.id,
            courseDB.name,
            courseDB.lessons
        ))

        return courses
    }

    public createCourse = async (input: any) => {
        const { id, name, lessons } = input

        if (typeof id !== "string") {
            throw new BadRequestError("'id' must be a string")
        }

        if (typeof name !== "string") {
            throw new BadRequestError("'name' must be a string")
        }

        if (typeof lessons !== "number") {
            throw new BadRequestError("'lessons' must be a number")
        }

        const courseDatabase = new CourseDatabase()
        const courseDBExists = await courseDatabase.findCourseById(id)

        if (courseDBExists) {
            throw new BadRequestError("'id' already exists")
        }

        const newCourse = new Course(
            id,
            name,
            lessons
        )

        const newCourseDB: CourseDB = {
            id: newCourse.getId(),
            name: newCourse.getName(),
            lessons: newCourse.getLessons()
        }

        await courseDatabase.insertCourse(newCourseDB)

        const output = {
            message: "Cadastro realizado com sucesso",
            user: newCourse
        }

        return output
    }

    public async deleteCourseById(id: string) {
        if (typeof id !== "string") {
            throw new BadRequestError("'id' must be a string");
        }

        const courseDatabase = new CourseDatabase()
        const course = await courseDatabase.deleteCourseById(id)

        return course
    }

    public editCourseById = async (input: any) => {
        const { id, newName, newLessons } = input

        if (!newName) {
            throw new BadRequestError("'name' deve ser string")
        }

        if (!newLessons) {
            throw new BadRequestError("lessons' deve ser number")
        }

        if (id !== undefined) {
            if (typeof id !== "string") {
                throw new BadRequestError("'id' deve ser string")
            }
        }

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                throw new BadRequestError("'name' deve ser string")
            }
        }

        if (typeof id !== "string") {
            throw new BadRequestError("'string' must be a number")
        }

        const courseDatabase = new CourseDatabase()
        const courseDB = await courseDatabase.findCourseById(id)

        if (!courseDB) {
            throw new BadRequestError("'id' not found")
        }

        const updatedCourse = new Course(
            courseDB.id,
            courseDB.name,
            courseDB.lessons
        )
        
        id && updatedCourse.setId(id)
        newName && updatedCourse.setName(newName)
        newLessons && updatedCourse.setLessons(newLessons)

        await courseDatabase.updatedCourse(id, updatedCourse)

        const output = {
            message: "Curso atualizado com sucesso",
            updatedCourse
        }

        return output
    }
}