const frontController = {};

frontController.buildFrontend = async function (req, res) {
    res.render("index", {});
}

module.exports = frontController;