import { BaseDatabase } from "./BaseDatabase"
import { CourseDB } from "../types"

export class CourseDatabase extends BaseDatabase {
    public static TABLE_COURSES = "courses"

    public async findCourses(q: string | undefined) {
        let coursesDB

        if (q) {
            const result: CourseDB[] = await BaseDatabase
                .connection(CourseDatabase.TABLE_COURSES)
                .where("name", "LIKE", `%${q}%`)

            coursesDB = result
        } else {
            const result: CourseDB[] = await BaseDatabase
                .connection(CourseDatabase.TABLE_COURSES)

            coursesDB = result
        }

        return coursesDB
    }

    public async findCourseById(id: string) {
        const [courseDB]: CourseDB[] | undefined[] = await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .where({ id })

        return courseDB
    }

    public async insertCourse(newCourseDB: CourseDB) {
        await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .insert(newCourseDB)
    }

    public async deleteCourseById(id: string) {
        await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .del()
            .where({ id })
    }

    public async updatedCourse(id: string, updateCourse: any) {
        console.log(updateCourse);
        await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .update(updateCourse)
            .where({ id })
    }
}
