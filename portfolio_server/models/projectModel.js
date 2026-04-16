const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true, trim: true },
        demo_link: { type: String, required: true, trim: true },
        github_link: {type:String, required:true, trim:true,default: "" },
        description: { type: String, required: true, trim: true },
        technologies: { type: String, required: true, trim: true },
        sortOrder :{ type:Number, required:true, default:0},
    },
    {
        versionKey: false,
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// One shared transform function
const transform = (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
};

// Apply it to both
projectSchema.options.toJSON.transform = transform;
projectSchema.options.toObject.transform = transform;

const projectModel = mongoose.model('project', projectSchema);

module.exports = projectModel;