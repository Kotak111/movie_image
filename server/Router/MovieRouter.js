const express=require("express")
const app=express();
const MovieController=require("../controller/MovieController")
const router=express.Router();
const upload=require("../utils/MoviePic")

const imgArr=[{name:"MoviePoster",maxCount:1},{name:"Moviepic",maxCount:"5"}]
router.post("/",upload.fields(imgArr),MovieController.create)
router.get("/",MovieController.index)
router.delete("/:id",MovieController.trash)
router.put("/:id",upload.fields(imgArr),MovieController.update)
router.get("/:id",MovieController.single)
module.exports=router;