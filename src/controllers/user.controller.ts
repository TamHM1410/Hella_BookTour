import { userService } from "../services/userService/user.service";
import { Request, Response } from "express";
class UserController {
  private errorMessage = {
    status: "Internal server",
    statusCode: 501,
  };
  constructor() {
    this.errorMessage = {
      status: "Internal server",
      statusCode: 501,
    };
  }
  updateUser = async (req: Request, res: Response) => {
    try {
      const currentData = req.body;
      const id = req.params.id;
      const pass = req.query.pass;

      if (pass) {
        const currentData = req.body;
        const result = await userService.updatePassword(currentData, id);
        return result
          ? res.status(result.statusCode).json(result)
          : this.errorMessage;
      }
      const result = await userService.updateUser(currentData);
      return result
        ? res.status(result.statusCode).json(result)
        : this.errorMessage;
    } catch (error) {
      return this.errorMessage;
    }
  };
  getUserById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const result = await userService.getUserById(id);
      return result
        ? res.status(result.statusCode).json(result)
        : this.errorMessage;
    } catch (error) {
      return this.errorMessage;
    }
  };
  getAllUser = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 5;
      const result = await userService.getAllUser(page, pageSize);
      return result
        ? res.status(result.statusCode).json(result)
        : this.errorMessage;
    } catch (error) {
      return this.errorMessage;
    }
  };
  deleteUserById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const result = await userService.deleteUserById(id);
      return result
        ? res.status(result.statusCode).json(result)
        : this.errorMessage;
    } catch (error) {
      return this.errorMessage;
    }
  };
}
export const userController = new UserController();
