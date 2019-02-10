const Team = require('../models/Team');
const User = require('../models/User');
module.exports = {
    getCreateTeam: (req, res) => {
        res.render('team/create')
    },

    postCreateTeam: async (req, res) => {
        let teamBody = req.body;

        let team = await Team.create({
            name: teamBody.name,
        });

        res.redirect('/');
    },

    getTeams: async (req, res) => {
        if (req.user.roles.indexOf('Admin') >= 0) {
            let users = await User.find();
            let teams = await Team.find();

            res.render('team/all', {
                users,
                teams,
            });
        } else {
            let teams = await Team.find().populate('projects').populate('members');

            res.render('team/all', {
                teams
            });
        }
    },

    postTeams: async (req, res) => {
        let userId = req.body.userId;
        let teamId = req.body.teamId;

        let user = await User.findById(userId);
        let team = await Team.findById(teamId);

        if (user.teams.indexOf(teamId) >= 0) {
            console.log('User is already in this team');
            res.redirect('/teams')
        } else {
            user.teams.push(teamId);
            await user.save();

            team.members.push(userId);
            await team.save();

            res.redirect('/');
        }
    },

    leaveTeam: async (req, res) => {
        let teamId = req.params.id;

        let team = await Team.findById(teamId);
        let user = await User.findById(req.user._id);

        let userIndexOfTeam = user.teams.indexOf(teamId);
        let teamIndexOfUser = team.members.indexOf(user._id);

        user.teams.splice(userIndexOfTeam, 1);
        team.members.splice(teamIndexOfUser, 1);

        await user.save();
        await team.save();

        res.redirect('/user/profile')
    },

    searchTeam: async (req, res) => {
        let teamToSearch = req.body.teamToSearch;

        let teams = await Team.find({
            name: {
                $regex: new RegExp(teamToSearch, "i")
            }
        }).populate('projects').populate('members');

        res.render('team/all', {
            teams,
        });
    },
};