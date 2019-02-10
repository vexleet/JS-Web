const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        unique: true,
        required: true
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true,
        maxlength: 50
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;