const Cave = require("../database/entity/Cave");

//new cave

module.exports.newCave = async (req: any, res: any) => {
  // Stuff to be added later
  console.log(req.file);
  const { foldername, version } = req.body;
  const { originalname, size } = req.file;
  try {
    const newFile = await Cave.create({
      fileid: req.user.id, foldername,
      uploads: { originalname, version, size }
    });
    res.status(200).json({
      status: "success",
      message: "File created successfully!!",
      newFile
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

//get all files
module.exports.getCave = async (req: any, res: any) => {

  try {
    const files = await Cave.find({
      fileid: req.user.id
    });
    res.status(200).json({
      status: "success",
      files,
    });
  } catch (error) {
    res.json({
      status: "Fail",
      error,
    });
  }
}

// update Cave if a folder exists

module.exports.updateCave = async (req: any, res: any) => {
  const { foldername, version } = req.body;
  const { originalname, size } = req.file;
  Cave.find({ foldername}, async (err: any, docs: any) => {
    if (docs.length) {
      try {
        const cave = await Cave.updateOne({
          foldername
        }, {
          $push: {
            uploads: { originalname, version, size }
          }
        });
        res.status(200).json({
          status: "success",
          message: "Folder updated successfully!!",
          cave
        })
      } catch (err) {
        res.status(500).json(err);
      }
    }
  })

}