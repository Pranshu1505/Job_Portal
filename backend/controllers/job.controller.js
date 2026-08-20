import {Job} from "../models/job.model.js"

export const postJob = async (req, res) => {
    try {
        const {title, description, requirements, salary, location, jobType, experience, position, companyId} = req.body;
        const userId = req.id;

        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message:"Something is mising",
                success:false
            })
        };
        const job = await Job.create({
            title,
            descriptions:[description],
            requirements:requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
            experience:experience,
            position,
            company:companyId,
            created_by:userId
        })
        return res.status(201).json({
            message:"New job created successfully",
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title:{$regex:keyword, $options:"i"}},
                {descriptions:{$regex:keyword, $options:"i"}}
            ]
        };
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        if(!jobs) {
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};

export const getJobById = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        })
        if(!job){
            return res.status(404).json({
                message:"job not found",
                success:false
            })
        };
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};

export const getAdminJobs = async (req, res)=> {
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId}).populate("company");
        if(!jobs){
            return res.status(404).json({
                message:"job not found",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateJob = async (req, res) => {
    try {
        const {title, description, requirements, salary, location, jobType, experience, position} = req.body;

        const updateData = {
            title,
            descriptions:[description],
            requirements: requirements?.split(","),
            salary: Number(salary),
            location,
            jobType,
            experience: experience,
            position
        };

        const job = await Job.findByIdAndUpdate(req.params.id, updateData, {new:true});

        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Job information updated.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}