const Project = require('../models/Project');
const Team = require('../models/Team');

module.exports = {
    getCreateProjects: (req, res) => {
        res.render('project/create');
    },

    postCreateProject: async (req, res) => {
        let projectBody = req.body;

        let project = await Project.create({
            name: projectBody.name,
            description: projectBody.description
        });

        res.redirect('/');
    },

    getProjects: async (req, res) => {
        if (req.user.roles.indexOf('Admin') >= 0) {
            let teams = await Team.find();
            let projects = await Project.find();;
            projects = projects.filter(project => project.team === undefined)

            res.render('project/all', {
                teams: teams,
                projects: projects,
            });
        } else {
            let projects = await Project.find().populate('team');

            res.render('project/all', {
                projects
            });
        }
    },

    postProjects: async (req, res) => {
        let teamId = req.body.teamId;
        let projectId = req.body.projectId;

        let team = await Team.findById(teamId);
        let project = await Project.findById(projectId);

        project.team = teamId;
        await project.save();

        team.projects.push(projectId);
        await team.save();

        res.redirect('/');
    },

    searchProject: async (req, res) => {
        let projectToSearch = req.body.projectToSearch;

        let projects = await Project.find({
            name: {
                $regex: new RegExp(projectToSearch, "i")
            }
        }).populate('team');

        res.render('project/all', {
            projects,
        });
    },
}