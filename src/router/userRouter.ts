import express from "express"
import { CourseController } from "../controller/CourseController"

export const userRouter = express.Router()

const courseController = new CourseController()

userRouter.get("/", courseController.getCourses)
userRouter.post("/", courseController.createCourse)
userRouter.delete("/:id", courseController.deleteCourseById)
userRouter.put("/:id", courseController.editCourseById)