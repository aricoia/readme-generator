const inquirer = require("inquirer");
const fs = require("fs");
const { renderLicenseBadge, renderLicenseLink } = require("./utils/generateMarkdown");
const questions = ({title, description, installation, usage, license, licenceText, contributors, test, git, email, badge }) =>

`# ${title}
${badge}
## Description
${description}
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)
## Installation
${installation}
## Usage
${usage}
## Contributing
${contributors}
## Tests
${test}
## License
${license}
${licenceText}
## Questions
For any additional questions please feel free to contact me at one of the following links below.
-   https://github.com/${git}
-   ${email}
`

inquirer.prompt(
    [
        {
            type: "input",
            message: "Project Title",
            name: "title",
        },
        {
            type: "input",
            message: "Description",
            name: "description",
        },
        {
            type: "input",
            message: "Installation",
            name: "installation",
        },
        {
            type: "input",
            message: "Usage",
            name: "usage",
        },
        {
            type: "list",
            message: "Choose your license",
            name: "license",
            choices: ["MIT","IBM", "ISC", "Mozilla"]
        },
        {
            type: "input",
            message: "Contributors",
            name: "contributors",
        },
        {
            type: "input",
            message: "Fill out tests",
            name: "test",
        },
        {
            type: "input",
            message: "Enter your github username",
            name: "git",
        },
        {
            type: "input",
            message: "Enter your email address",
            name: "email",
        },
    ]
) 
.then((data) => {
    data.badge = renderLicenseBadge(data.license),
    data.licenseText = renderLicenseLink(data.license),
fs.writeFile("Demo-ReadMe.md", questions(data),(err) => {
    err ? console.log(err) : console.log("Readme created successfully")
})
})

