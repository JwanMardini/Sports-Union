import Activity from "../models/activity.model.js";

/**
 * Retrieves all activities from the database.
 * 
 * @async
 * @function getAllActivities
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with a list of activities or an error message.
 */
export const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Retrieves a single activity by ID.
 * 
 * @async
 * @function getActivityById
 * @param {object} req - Express request object containing activity ID in params.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the activity details or an error message.
 */
export const getActivityById = async (req, res) => {
    const id = req.params.id;
    try {
        const activity = await Activity.findById(id);
        res.json(activity);
    } catch (error) {
        console.error('Error getting Event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Creates a new activity in the database.
 * 
 * @async
 * @function createActivity
 * @param {object} req - Express request object containing activity data in the body.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the created activity or an error message.
 */
export const createActivity = async (req, res) => {
    try {
        const newActivity = await Activity.create(req.body);
        res.status(201).json(newActivity);
    } catch (error) {
        console.error('Failed to create activity:', error);
        res.status(500).json({ error: 'Failed to create activity' });
    }
};

/**
 * Updates an existing activity in the database.
 * 
 * @async
 * @function updateActivity
 * @param {object} req - Express request object containing activity ID in params and update data in the body.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with the updated activity or an error message.
 */
export const updateActivity = async (req, res) => {
    const id = req.params.id;
    const { activityName, date, location, description, time, maxParticipants } = req.body;
    console.log(req.body);
    try {
        const updatedActivity = await Activity.findOneAndUpdate(
            { _id: id },
            { activityName, date, location, description, time, maxParticipants },
            { new: true, runValidators: true }
        );
        console.log(updatedActivity);
        res.json(updatedActivity);
    } catch (error) {
        console.error('Error updating Activity:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Deletes an activity from the database.
 * 
 * @async
 * @function deleteActivity
 * @param {object} req - Express request object containing activity ID in params.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Responds with a success message or an error message.
 */
export const deleteActivity = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedActivity = await Activity.findByIdAndDelete(id);
        if (!deletedActivity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ message: 'Activity deleted successfully' });
    } catch (error) {
        console.error('Failed to delete activity:', error);
        res.status(500).json({ error: 'Failed to delete activity' });
    }
};
