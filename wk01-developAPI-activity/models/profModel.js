const dbClient = require("../database");
const model = {};

model.getProfData = function() {
    const testobj = {
        professionalName: "professionalName",
        base64Image: "base64Image",
        nameLink: {
            firstName: "firstName",
            url: "url"
        },
        primaryDescription: "primaryDescription",
        workDescription1: "workDescription1",
        workDescription2: "workDescription2",
        linkTitleText: "linkTitleText",
        linkedInLink: {
            text: "text",
            link: "link"
        },
        githubLink: {
            text: "text",
            link: "link"
        }
    };
    return testobj;
}

module.exports = model;