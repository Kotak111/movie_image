const MovieModel = require("../models/MovieModel");
exports.create = async (req, res) => {
    const { Moviename, MovieDirector, MovieRelese } = req.body;

    const images = []
    const Moviepic = images
    // const MoviePic = req.files
    try {
        if (Moviename === "" || MovieDirector === "" || MovieRelese === "") {
            res.json({ success: true, message: "field is required" })
        }
        const name = await MovieModel.findOne({ Moviename: Moviename });
        if (name) {
            res.json({ success: false, message: "name is already exists" })
        }
        else {
            const Moviepic2 = req?.files
            console.log(Moviepic2)

            if (req?.files?.Moviepic) {
                req?.files?.Moviepic?.forEach((img) => {
                    images.push(img.filename)
                })
            }
            var singleImg = ""
            if (req?.files?.MoviePoster !== undefined) {
                singleImg = req?.files?.MoviePoster[0]?.filename
            }
            // singleImg=MoviePoster;
            const user = await MovieModel.create({
                Moviename, MovieDirector, MovieRelese, MoviePoster: singleImg, Moviepic
            })
            // .then(() => {
            //     res.json({ success: true, message: "data inserted" })
            // }).catch((err) => {
            //     res.json({ success: false, message: "something went wrong data not inserted" })
            //     console.log(err);
            // })
            if (user) {
                res.json({ success: "true", message: "data inserted" })
            }
            else {

                res.json("data not apply")
            }

        }
    }
    catch (err) {
        console.log(err);
    }
}
exports.index = async (req, res) => {

    try {
        const user = await MovieModel.find();
        if (user) {
            res.json({ user })
        }
        else {
            res.json({ message: "data not found" })
        }
    }
    catch (err) {
        console.log(err);
    }
}
exports.trash = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await MovieModel.findByIdAndDelete({ _id: id });
        if (data) {
            res.json({ success: true, message: "data deleted" })
        }
        else {
            res.json({ success: false, message: "no id found" })
        }

    }
    catch (err) {
        console.log(err);
    }
}
exports.update = async (req, res) => {
    const images = []
    const Moviepic = images
    try {

        const id = req.params.id;
        console.log(req.body)
        if (req.files.Moviepic) {
            req.files.Moviepic.forEach((img) => {
                images.push(img.filename)
            })
        }
        var singleImg = "";
        console.log(req?.files?.profile2)
        if (req?.files?.MoviePoster !== undefined) {
            singleImg = req?.files?.MoviePoster[0]?.filename
        }

        console.log(singleImg)
        console.log(images)

        const dataupdate = await MovieModel.findByIdAndUpdate(
            { _id: id },
            {
                Moviename: req.body.Moviename,
                MovieDirector: req.body.MovieDirector,
                MovieRelese: req.body.MovieRelese,
                MoviePoster: singleImg,
                Moviepic: images
            })
        if (dataupdate) {
            res.json({ success: true, message: "data has been updated" })
        }
        else {
            res.json({ success: false, message: "sorry id not found" })
        }
    }
    catch (err) {
        console.log(err);
    }
}
exports.single = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await MovieModel.findById(id)
        if (user) {
            res.json({
                success: true,
                user:user
            })
        } else {
            res.json({
                success: false,
                message: "Movie Record not found"
            })
        }
    } catch (error) {
        res.json(error.message)
    }
}