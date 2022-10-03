const Project = require("../models/ProjectModel");

const ProjectList = async (req, res) => {
    try {
      const proje = await Project.find()
        .sort({ date: -1 })
        .populate("category", ["categoryName", "isActive"])
        .populate("subCategory", ["subCategoryName", "isActive"]);
  
      if (!proje) {
        return res.json({ msg: "Proje Kaydi Bulunumadi" });
      }
     
      res.json(proje);
    } catch (err) {
      console.error(err.message);
    }
  }
  const ProjectDetail = async (req, res) => {
    try {
      const proje = await Project.findById(req.params.detail);
      if (!proje) {
        return res.json({ msg: "Proje Kaydi Bulunumadi" });
      }
      res.json(proje);
    } catch (err) {
      console.error(err.messgae);
    }
  }
  const ProjectAdd = async (req, res) => {
    const reqFiles = [];
    try {
      const {
        projectName,
        address,
        squareMeters,
        category,
        subCategory,
        description,
      } = req.body;
  
      try {
        const url = req.protocol + "://" + req.get("host");
        
        for (var i = 0; i < req.files.length; i++) {
          reqFiles.push(url + "/" + req.files[i].filename);
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
      
      const yeniProje =  new Project({
        projectName,
        address,
        squareMeters,
        category,
        subCategory,
        description,
        image: reqFiles,
      });
      await yeniProje.save();
  
      res.json(yeniProje);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
  const ProjectUpdate = async (req, res) => {
    try {
      const reqFiles = [];
      const {
        projectName,
        address,
        squareMeters,
        category,
        subCategory,
        description,
      } = req.body;

      try {
        const url = req.protocol + "://" + req.get("host");
       
        for (var i = 0; i < req.files.length; i++) {
          reqFiles.push(url + "/" + req.files[i].filename);
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }

     
      if (reqFiles.length === 0) {
     
        let proje;
        if (!subCategory) {
          proje = await Project.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                projectName,
                address,
                squareMeters,
                category,
                subCategory,
                description,
                image: req.body.image,
              },
            },
            { new: true }
          );
        } else {
          proje = await Project.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                projectName,
                address,
                squareMeters,
                category,
                description,
                image: req.body.image,
              },
            },
            { new: true }
          );
        }
        return res.json(proje);
      } else {
        let proje;
        if (!subCategory) {
          proje = await Project.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                projectName,
                address,
                squareMeters,
                category,
                subCategory ,
                description,
                image:
                  typeof req.body.image !== "undefined"
                    ? reqFiles.concat(req.body.image)
                    : reqFiles,
              },
            },
            { new: true }
          );
        }
        else  {
          proje = await Project.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                projectName,
                address,
                squareMeters,
                category,                
                description,
                image:
                  typeof req.body.image !== "undefined"
                    ? reqFiles.concat(req.body.image)
                    : reqFiles,
              },
            },
            { new: true }
          );
        }
        await proje.image.push(req.body.image);
        await proje.save;
        return res.json(proje);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
  const ProjectDelete =  async (req, res) => {
    try {
      const { isActive } = req.body;
  
      let proje = await Project.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            isActive,
          },
        },
        { new: true }
      );
      return res.json(proje);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
module.exports = {
    ProjectList,
    ProjectDetail,
    ProjectAdd,
    ProjectUpdate,
    ProjectDelete
}