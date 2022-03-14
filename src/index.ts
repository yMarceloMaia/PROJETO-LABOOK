import app from "./app";
import { PostController } from "./controller/PostController";
import { UserController } from "./controller/UserController";

const userController = new UserController()

app.post("/user/signup", userController.signup)
app.post("/user/login", userController.login)
app.post("/user/friend/:id", userController.insertFriend)
app.delete("/user/friend/:id", userController.deleteFriendship)

const postController = new PostController()

app.post("/post", postController.createPost)
app.get("/post/:id", postController.getPostById)